import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, GizmoHelper, GizmoViewcube, Grid } from '@react-three/drei';
import { Leva } from 'leva';
import { useControls } from 'leva';

function AnimatedBox() {
  const boxRef = useRef();

  const { color, speed } = useControls({
    color : '#00bfff',
    speed : {
      value: 0.005,
      min: 0.00,
      max: 0.03,
      step: 0.001,
    }
  })

  useFrame(() => {

    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Leva collapsed/>
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
