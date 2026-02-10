import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AuroraPlane = ({ colorStops }) => {
  const materialRef = useRef();
  // Removed 'useEffect' from imports as we don't need the manual loop anymore

  // We use useMemo for the uniforms so they don't get re-created every frame
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(colorStops[0]) },
    uColor2: { value: new THREE.Color(colorStops[1]) },
    uColor3: { value: new THREE.Color(colorStops[2]) },
  }), [colorStops]);

  useFrame((state) => {
    if (materialRef.current) {
      // Use the clock's elapsed time directly for smooth, continuous animation
      // irrespective of scroll or frame drops
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;

          float noise(vec2 p) {
            return sin(p.x * 1.2 + uTime * 0.5) * cos(p.y * 1.5 + uTime * 0.3);
          }

          void main() {
            vec2 p = vUv;
            float n1 = noise(p * 2.5 + uTime * 0.1);
            float n2 = noise(p * 3.0 - uTime * 0.2);
            float finalNoise = (n1 + n2) * 0.5;

            // Blend colors across the screen
            vec3 c1 = mix(uColor1, uColor2, p.x + (finalNoise * 0.3));
            vec3 finalColor = mix(c1, uColor3, p.y + (finalNoise * 0.3));
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// We use 'memo' here to prevent re-renders when the parent scrolls.
// The second argument compares the props to ensure we don't re-render 
// just because the array reference changed.
const Aurora = memo(({ colorStops = ["#8d0a0a", "#162396", "#36148a"] }) => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <AuroraPlane colorStops={colorStops} />
      </Canvas>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: Only re-render if the actual color strings change.
  // This fixes the issue where passing inline arrays caused freezing.
  return JSON.stringify(prevProps.colorStops) === JSON.stringify(nextProps.colorStops);
});

export default Aurora;