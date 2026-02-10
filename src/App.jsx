import Aurora from '/Users/raiyaansyed/web/components/Aurora.jsx';
import { useState, useEffect, useRef } from 'react';

// Define Aurora colors outside to prevent re-renders
const AURORA_COLORS = ["#951515", "#131d7c", "#1b0553"];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const accentColor = '#244588';
  const accentColorLight = '#6092EB';
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

      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "Hospital Management System",
      description: "GUI-based hospital management application with patient/doctor registration, prescription tracking, and real-time search features. MySQL backend supporting concurrent data access for thousands of patient records with CRUD operations.",
      technologies: ["Python", "Tkinter", "MySQL"],
      github: "https://github.com/raiyaansyed"
    },
    {
      title: "Task Manager Application",
      description: "Student-focused productivity application built using Clean Architecture principles with 5 core use cases including User Authentication, Dashboard Management, Task Management, Calendar Synchronization, and API-driven Quote Generator. Achieved 100% line and branch coverage with JUnit testing.",
      technologies: ["Java", "Swing", "JUnit", "Git"],
      github: "https://github.com/raiyaansyed"
    },
    {
      title: "Employee Exit Clearance Workflow",
      description: "Collaborated with HR department to create a workflow system that reduced redundant manual work hours by over 30%. Led a team of interns and coordinated communication across the organization.",
      technologies: ["Web Development", "Workflow Automation"],
      github: "https://github.com/raiyaansyed"
    }
  ];

  const experiences = [
    {
      role: "Web Development Intern",
      company: "BPL Medical Technologies Pvt. Ltd.",
      period: "April 2023 - June 2023",
      description: [
        "Collaborated with the HR department to create an Employee Exit Clearance Workflow system, reducing redundant manual work hours by over 30%",
        "Served as team lead for a small team of interns and coordinated communication within the group and with the organization",
        "Developed workflow automation solutions to streamline HR processes"
      ]
    },
    {
      role: "Artificial Intelligence/Machine Learning Student Intern",
      company: "ILM Internship Program",
      period: "April 2022 - May 2022",
      description: [
        "Gained foundational knowledge of AI model workings while collaborating with an independent entrepreneur",
        "Designed and implemented an AI model using Pandas and NumPy, processing diverse demographic datasets",
        "Achieved over 85% accuracy in model predictions, providing actionable and reliable data insights"
      ]
    }
  ];

  const skills = {
    "Programming Languages": ["Java", "Python", "C/C++", "JavaScript", "SQL", "HTML/CSS", "R"],
    "Web & Backend": ["React", "Node.js", "MongoDB", "PostgreSQL", "REST APIs", "CRUD Operations"],
    "Tools & DevOps": ["AWS", "Git", "GitHub", "Docker", "VS Code", "JUnit", "Figma", "Unix Shell"],
    "Soft Skills": ["Leadership", "Communication", "Analytical Thinking", "Teamwork", "Problem Solving"]
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

      {/* Navigation - Apple Style */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0.75rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(40px) saturate(180%)',
        backgroundColor: 'rgba(10, 10, 15, 0.72)',
        borderBottom: '0.5px solid rgba(255, 255, 255, 0.08)',
        transform: isNavVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.5s cubic-bezier(0.28, 0.11, 0.32, 1)'
      }}>
        <div style={{
          maxWidth: '980px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 2rem',
          position: 'relative'
        }}>
          {/* Desktop Menu */}
          <div style={{
            display: window.innerWidth > 768 ? 'flex' : 'none',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  transition: 'opacity 0.3s ease',
                  opacity: activeSection === item.toLowerCase() ? 1 : 0.65,
                  letterSpacing: '0.3px',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = activeSection === item.toLowerCase() ? '1' : '0.65'}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? 'block' : 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              position: 'absolute',
              right: '2rem'
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '3.5rem',
          left: 0,
          right: 0,
          zIndex: 99,
          backdropFilter: 'blur(40px) saturate(180%)',
          backgroundColor: 'rgba(10, 10, 15, 0.95)',
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.08)',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '400',
                cursor: 'pointer',
                padding: '1rem 2rem',
                textAlign: 'left',
                transition: 'background 0.2s ease',
                borderBottom: '0.5px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {item}
            </button>
          ))}
        </div>
      )}

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
                color: '#fff',
                margin: '0 0 1rem 0',
                lineHeight: '1.1',
                letterSpacing: '-0.03em'
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
                Building elegant solutions to complex problems. 
                Passionate about software engineering and creating impactful digital experiences.
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
                fontSize: '0.875rem',
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
                color: '#fff',
                marginBottom: '2.5rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                Crafting the future, one line at a time
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
              }}>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  I'm a third-year Computer Science student at the University of Toronto, specializing in 
                  Software Engineering. My passion lies in building scalable, user-centric applications 
                  that solve real-world problems.
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  With experience in full-stack development and a strong foundation in software architecture, 
                  I thrive in environments that challenge me to learn and innovate. I'm particularly interested 
                  in backend systems, API design, and creating seamless user experiences.
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or working on personal projects that push my boundaries.
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
                fontSize: '0.875rem',
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
                color: '#fff',
                marginBottom: '4rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                Professional Journey
              </h2>
            </ScrollReveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experiences.map((exp, index) => (
                <ScrollReveal key={index} delay={0.1 * (index + 2)}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '0.5px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#fff',
                        margin: '0 0 0.5rem 0',
                        letterSpacing: '-0.01em'
                      }}>
                        {exp.role}
                      </h3>
                      <div style={{
                        fontSize: '1.05rem',
                        fontWeight: '500',
                        color: accentColorLight,
                        marginBottom: '0.25rem'
                      }}>
                        {exp.company}
                      </div>
                      <div style={{
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: '400'
                      }}>
                        {exp.period}
                      </div>
                    </div>
                    <ul style={{
                      margin: 0,
                      padding: '0 0 0 1.25rem',
                      listStyle: 'none'
                    }}>
                      {exp.description.map((item, i) => (
                        <li key={i} style={{
                          fontSize: '1rem',
                          lineHeight: '1.7',
                          color: 'rgba(255, 255, 255, 0.75)',
                          marginBottom: i < exp.description.length - 1 ? '0.75rem' : 0,
                          position: 'relative',
                          paddingLeft: '1.5rem',
                          fontWeight: '400'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            top: '0.6rem',
                            width: '4px',
                            height: '4px',
                            background: accentColorLight,
                            borderRadius: '50%'
                          }} />
                          {item}
                        </li>
                      ))}
                    </ul>
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
                fontSize: '0.875rem',
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
                color: '#fff',
                marginBottom: '4rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                Featured Work
              </h2>
            </ScrollReveal>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {projects.map((project, index) => (
                <ScrollReveal key={index} delay={0.1 * (index + 2)}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '0.5px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#fff',
                      margin: '0 0 1rem 0',
                      letterSpacing: '-0.01em'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '1.5rem',
                      flex: 1,
                      fontWeight: '400'
                    }}>
                      {project.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {project.technologies.map((tech, i) => (
                        <span key={i} style={{
                          fontSize: '0.8rem',
                          padding: '0.4rem 0.875rem',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '0.5px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '980px',
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontWeight: '500',
                          letterSpacing: '0.3px'
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
                        fontSize: '0.95rem',
                        color: accentColorLight,
                        textDecoration: 'none',
                        fontWeight: '500',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'opacity 0.3s ease',
                        letterSpacing: '0.3px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      View on GitHub →
                    </a>
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
                fontSize: '0.875rem',
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
                color: '#fff',
                marginBottom: '4rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                Technical Expertise
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
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
                fontSize: '0.875rem',
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
                color: '#fff',
                marginBottom: '2rem',
                lineHeight: '1.15',
                letterSpacing: '-0.02em'
              }}>
                Let's Connect
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
                I'm actively seeking internship opportunities and co-op positions for Summer 2026. 
                Whether you have an opportunity, a question, or just want to connect, feel free to reach out.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <a
                href="mailto:raiyaan.syed@mail.utoronto.ca"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '980px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginBottom: '3rem',
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
                Email Me
              </a>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2.5rem'
              }}>
                <a
                  href="https://github.com/raiyaansyed"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
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
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
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