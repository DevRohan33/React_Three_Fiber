import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, GizmoHelper, GizmoViewcube, Grid } from '@react-three/drei';

function AnimatedBox() {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.005;
    boxRef.current.rotation.z += 0.005;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00bfff" />
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, 5, 5] }}>
        <Grid args={[20, 20]} />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 1]} />
        <AnimatedBox />
        <OrbitControls />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube />
        </GizmoHelper>
      </Canvas>
    </div>
  );
}

export default App;
