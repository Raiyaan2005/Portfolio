import Aurora from './components/Aurora.jsx';
import ShinyText from './components/ShinyText.jsx';
import { useState, useEffect, useRef } from 'react';

// Define Aurora colors outside to prevent re-renders
const AURORA_COLORS = ["#0e3a88", "#0d6e75", "#5c0d0d"];

// Scroll Reveal Component
function ScrollReveal({ children, delay = 0, threshold = 0.1 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
        rootMargin: '0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const accentColor = '#244588';
  const accentColorLight = '#828D9E';
  const accentColorDim = 'rgba(36, 69, 136, 0.25)';

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "NovaCare",
      subtitle: "Hospital Management System",
      description: "Full-stack hospital management desktop application supporting patient/doctor registration, medication tracking, and real-time search across thousands of records. Designed a normalized MySQL relational schema with optimized queries and indexing, and built a multi-frame CustomTkinter UI with dynamic tables and input validation; reducing client-side data entry errors by ~40%. CRUD operations are fully decoupled from the UI via a service-oriented design.",
      technologies: ["Python", "CustomTkinter", "MySQL", "CRUD"],
      github: "https://github.com/Raiyaan2005/NovaCare"
    },
    {
      title: "LockIn",
      subtitle: "Student Productivity Application",
      description: "Collaborated in a team of 5 to deliver a student productivity application in Java, applying Clean Architecture to strictly separate Presentation, Use Case, and Entity layers. Authored technical design docs for 5 core use cases: Authentication, Dashboard, Task Management, Calendar Sync, and an API-driven Quote Generator. Achieved 100% line and branch coverage with JUnit and enforced code quality via branch protection rules and mandatory peer reviews.",
      technologies: ["Java", "Swing", "JUnit", "Git", "GitHub", "Agile"],
      github: "https://github.com/Raiyaan2005/lockin-app"
    }
  ];

  const experiences = [
    {
      role: "Web Development Intern",
      company: "BPL Medical Technologies Pvt. Ltd.",
      period: "April 2023 - June 2023",
      description: [
        "Took end-to-end ownership of an Employee Exit Clearance Workflow system in collaboration with HR stakeholders, reducing redundant manual work hours by over 30%.",
        "Led a team of 3 interns in an agile, iterative workflow, managing stakeholder communication and driving the project to completion on schedule."
      ]
    },
    {
      role: "Artificial Intelligence/Machine Learning Student Intern",
      company: "ILM Internship Program",
      period: "April 2022 - May 2022",
      description: [
        "Designed and implemented a machine learning model using Pandas and NumPy to process large-scale demographic datasets (thousands of entries), achieving over 85% prediction accuracy and delivering actionable insights to a client stakeholder."
      ]
    }
  ];

  const skills = {
    "Programming Languages": ["Python", "Pandas", "NumPy", "Java", "C/C++", "JavaScript", "SQL", "HTML/CSS", "R"],
    "Web & Backend": ["React", "AWS", "Node.js", "PostgreSQL", "MongoDB", "REST APIs", "Linux/Unix"],
    "Tools": ["Git", "GitHub", "MS Office", "VS Code", "Figma", "Vercel"],
    "Concepts": ["AI/LLM Tools", "Automated Testing (JUnit & Pytest)", "OOP", "UML", "Design Patterns", "Systems Design", "Agile"]
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'auto',
      backgroundColor: '#0a0a0f',
      margin: 0,
      padding: 0,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif"
    }}>
      
      {/* Aurora Background */}
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 0,
        filter: 'blur(140px) saturate(2)', 
        transform: 'scale(1.3) translateZ(0)', 
        backgroundColor: '#000',
        pointerEvents: 'none',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}>
        <Aurora colorStops={AURORA_COLORS} />
      </div>

      {/* Floating Navigation Buttons */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: 'flex-end'
      }}>
        {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => {
          const isActive = activeSection === item.toLowerCase();
          return (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              title={!isActive ? item : undefined}
              style={{
                padding: isActive ? '0.5rem 1rem' : '0',
                width: isActive ? 'auto' : '12px',
                height: isActive ? 'auto' : '12px',
                borderRadius: isActive ? '20px' : '50%',
                border: isActive ? 'none' : '1.5px solid rgba(255, 255, 255, 0.3)',
                background: isActive ? '#fff' : 'rgba(255, 255, 255, 0.1)',
                color: isActive ? '#0a0a0f' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
            >
              {isActive ? item : ''}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <section id="home" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem 4rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '900px' }}>
            <ScrollReveal delay={0.1}>
              <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '700',
                margin: '0 0 1rem 0',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
                backgroundImage: 'linear-gradient(90deg, #fff 35%, #828D9E 50%, #fff 65%)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                animation: 'nameShimmer 5s linear infinite'
              }}>
                Raiyaan Syed Ahmed
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.65)',
                marginBottom: '2rem',
                letterSpacing: '0.3px'
              }}>
                Computer Science at the University of Toronto
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: '0 auto 3rem',
                lineHeight: '1.6',
                maxWidth: '700px',
                fontWeight: '400'
              }}>
                I build software that's clean, well-architected, and built to last. Python, Java, React, SQL — whatever the job needs.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => scrollToSection('projects')}
                  style={{
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '980px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  style={{
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    background: 'transparent',
                    color: '#fff',
                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '980px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </ScrollReveal>

            {/* Scroll indicator */}
            <div
              onClick={() => scrollToSection('about')}
              style={{
                marginTop: '5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                opacity: 0.4,
                transition: 'opacity 0.3s ease',
                animation: 'scrollBounce 2s ease-in-out infinite'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
            >
              <div style={{
                width: '1.5px',
                height: '2.5rem',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))'
              }} />
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem'
        }}>
          <div style={{ maxWidth: '800px', width: '100%' }}>
            <ScrollReveal>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: accentColorLight,
                marginBottom: '1rem',
                letterSpacing: '0.5px',
                opacity: 0.9
              }}>
                ABOUT ME
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '1.25rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                <ShinyText 
                  text="Crafting the future, one line at a time"
                  speed={3}
                  color="#fff"
                  shineColor="#828D9E"
                />
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '0.5px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '3rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(130, 141, 158, 0.25)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 24px 60px rgba(36, 69, 136, 0.2), 0 0 0 0.5px rgba(130, 141, 158, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  I'm a third-year Computer Science student at the University of Toronto. I love building apps and getting into the details of how things actually work under the hood.
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  I've been doing full-stack development for almost 4 years now, and I'm also really into cybersecurity and AI; both feel like they're constantly evolving and there's always something new to dig into.
                  Right now I'm exploring how these areas intersect, whether that's building smarter tools or thinking more critically about how systems can be secured.
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  Outside of school and coding, I'm usually out exploring the city, travelling somewhere new, or playing soccer. Always down to chat about cool projects or ideas.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem'
        }}>
          <div style={{ maxWidth: '900px', width: '100%' }}>
            <ScrollReveal>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: accentColorLight,
                marginBottom: '1rem',
                letterSpacing: '0.5px',
                opacity: 0.9
              }}>
                EXPERIENCE
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '2rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                <ShinyText 
                  text="Professional Journey"
                  speed={3}
                  color="#fff"
                  shineColor="#828D9E"
                />
              </h2>
            </ScrollReveal>

            <div>
              {experiences.map((exp, index) => (
                <ScrollReveal key={index} delay={0.1 * (index + 2)}>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    {/* Timeline spine */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '20px' }}>
                      <div style={{
                        width: '13px',
                        height: '13px',
                        borderRadius: '50%',
                        background: accentColorLight,
                        border: '2px solid rgba(130, 141, 158, 0.3)',
                        flexShrink: 0,
                        marginTop: '0.45rem'
                      }} />
                      {index < experiences.length - 1 && (
                        <div style={{
                          width: '1px',
                          flex: 1,
                          minHeight: '3rem',
                          marginTop: '0.5rem',
                          background: 'linear-gradient(to bottom, rgba(130, 141, 158, 0.25), transparent)'
                        }} />
                      )}
                    </div>

                    {/* Card */}
                    <div style={{
                      flex: 1,
                      paddingBottom: index < experiences.length - 1 ? '2.5rem' : 0
                    }}>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '0.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '2rem 2.5rem',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(130, 141, 158, 0.25)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 24px 60px rgba(36, 69, 136, 0.2), 0 0 0 0.5px rgba(130, 141, 158, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <h3 style={{
                              fontSize: '1.25rem',
                              fontWeight: '600',
                              color: '#fff',
                              margin: '0 0 0.3rem 0',
                              letterSpacing: '-0.01em'
                            }}>
                              {exp.role}
                            </h3>
                            <div style={{
                              fontSize: '0.95rem',
                              fontWeight: '500',
                              color: accentColorLight
                            }}>
                              {exp.company}
                            </div>
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'rgba(255, 255, 255, 0.4)',
                            fontWeight: '500',
                            letterSpacing: '0.3px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '0.5px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '980px',
                            padding: '0.35rem 0.875rem',
                            whiteSpace: 'nowrap'
                          }}>
                            {exp.period}
                          </div>
                        </div>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                          {exp.description.map((item, i) => (
                            <li key={i} style={{
                              fontSize: '0.975rem',
                              lineHeight: '1.7',
                              color: 'rgba(255, 255, 255, 0.72)',
                              marginBottom: i < exp.description.length - 1 ? '0.65rem' : 0,
                              paddingLeft: '1.25rem',
                              position: 'relative',
                              fontWeight: '400'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                top: '0.62rem',
                                width: '4px',
                                height: '4px',
                                background: accentColorLight,
                                borderRadius: '50%',
                                opacity: 0.7
                              }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem'
        }}>
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <ScrollReveal>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: accentColorLight,
                marginBottom: '1rem',
                letterSpacing: '0.5px',
                opacity: 0.9
              }}>
                PROJECTS
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '2rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                <ShinyText 
                  text="Featured Work"
                  speed={3}
                  color="#fff"
                  shineColor="#828D9E"
                />
              </h2>
            </ScrollReveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {projects.map((project, index) => (
                <ScrollReveal key={index} delay={0.1 * (index + 2)}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '0.5px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: `2px solid ${accentColorLight}`,
                    borderRadius: '20px',
                    padding: '2.5rem 3rem',
                    display: 'flex',
                    gap: '3rem',
                    alignItems: 'flex-start',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderLeftColor = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(130, 141, 158, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 24px 70px rgba(36, 69, 136, 0.25), 0 0 0 0.5px rgba(130, 141, 158, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderLeftColor = accentColorLight;
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {/* Left meta column */}
                    <div style={{ width: '260px', flexShrink: 0 }}>
                      <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        letterSpacing: '3px',
                        color: 'rgba(255, 255, 255, 0.2)',
                        marginBottom: '0.75rem'
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 style={{
                        fontSize: '1.6rem',
                        fontWeight: '700',
                        color: '#fff',
                        margin: '0 0 0.25rem 0',
                        letterSpacing: '-0.02em'
                      }}>
                        <ShinyText text={project.title} speed={3} color="#fff" shineColor="#828D9E" />
                      </h3>
                      {project.subtitle && (
                        <div style={{
                          fontSize: '0.85rem',
                          color: 'rgba(255, 255, 255, 0.4)',
                          fontWeight: '400',
                          marginBottom: '1.25rem',
                          letterSpacing: '0.2px'
                        }}>
                          {project.subtitle}
                        </div>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                        {project.technologies.map((tech, i) => (
                          <span key={i} style={{
                            fontSize: '0.75rem',
                            padding: '0.3rem 0.75rem',
                            background: 'rgba(130, 141, 158, 0.1)',
                            border: '0.5px solid rgba(130, 141, 158, 0.2)',
                            borderRadius: '980px',
                            color: accentColorLight,
                            fontWeight: '500',
                            letterSpacing: '0.2px'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.875rem',
                          color: accentColorLight,
                          textDecoration: 'none',
                          fontWeight: '500',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          transition: 'all 0.3s ease',
                          letterSpacing: '0.3px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.gap = '0.65rem';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = accentColorLight;
                          e.currentTarget.style.gap = '0.4rem';
                        }}
                      >
                        View on GitHub →
                      </a>
                    </div>

                    {/* Divider */}
                    <div style={{
                      width: '1px',
                      alignSelf: 'stretch',
                      background: 'rgba(255, 255, 255, 0.06)',
                      flexShrink: 0
                    }} />

                    {/* Right description column */}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.8',
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
                        fontWeight: '400'
                      }}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem'
        }}>
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <ScrollReveal>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: accentColorLight,
                marginBottom: '1rem',
                letterSpacing: '0.5px',
                opacity: 0.9
              }}>
                SKILLS
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '2rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                <ShinyText 
                  text="Technical Expertise"
                  speed={3}
                  color="#fff"
                  shineColor="#828D9E"
                />
              </h2>
            </ScrollReveal>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {Object.entries(skills).map(([category, items], index) => (
                <ScrollReveal key={category} delay={0.1 * (index + 2)}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '0.5px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(130, 141, 158, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 24px 60px rgba(36, 69, 136, 0.2), 0 0 0 0.5px rgba(130, 141, 158, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#fff',
                      marginBottom: '1.5rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {category}
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {items.map((skill, i) => (
                        <span key={i} style={{
                          fontSize: '0.875rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '0.5px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '980px',
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontWeight: '400',
                          letterSpacing: '0.2px'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem'
        }}>
          <div style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>
            <ScrollReveal>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: accentColorLight,
                marginBottom: '1rem',
                letterSpacing: '0.5px',
                opacity: 0.9
              }}>
                GET IN TOUCH
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                <ShinyText 
                  text="Let's Connect"
                  speed={3}
                  color="#fff"
                  shineColor="#828D9E"
                />
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '3rem',
                lineHeight: '1.7',
                fontWeight: '400'
              }}>
                I'm actively seeking internship and co-op opportunities.
                Whether you have a role, a question, or just want to connect, feel free to reach out.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <a
                  href="mailto:raiyaan.syed@mail.utoronto.ca"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.875rem 2.5rem',
                    fontSize: '1rem',
                    lineHeight: '1',
                    fontWeight: '500',
                    background: '#fff',
                    color: '#000',
                    border: '1.5px solid transparent',
                    borderRadius: '980px',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.3px',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Connect via Email
                </a>
                <a
                  href="/Raiyaan-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.875rem 2.5rem',
                    fontSize: '1rem',
                    lineHeight: '1',
                    fontWeight: '500',
                    background: 'transparent',
                    color: '#fff',
                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '980px',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.3px',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Download Resume
                </a>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2.5rem'
              }}>
                <a
                  href="https://github.com/Raiyaan2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.3px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/raiyaansyed"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.3px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.4)',
          borderTop: '0.5px solid rgba(255, 255, 255, 0.05)'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
            © 2026 Raiyaan Syed Ahmed. All rights reserved.
          </p>
        </footer>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes nameShimmer {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(10, 10, 15, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}

export default App;