import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, GizmoHelper, GizmoViewcube, Grid, useHelper } from '@react-three/drei';
import { Leva } from 'leva';
import { useControls } from 'leva';
import { SpotLightHelper } from 'three';

function LightWithHelper() {
  const light = useRef();
  const {angle, penumbra} = useControls({
    angle : Math.PI/8,
    penumbra:{
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.1
    }
  })
  useHelper(light, SpotLightHelper, 'orange')
  return(
  <spotLight                                        
    ref={light}
    penumbra={penumbra}
    angle={angle}
    intensity={80}
    color={0xffea00}
    position={[2,5,1]}
    castShadow/>
  )
}

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
    <mesh ref={boxRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Leva collapsed/>
      <Canvas shadows camera={{ position: [5, 5, 5] }} style={{ background: "white" }}>
        <Grid args={[20, 20]} />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} color={0xfcfcfc}/>
        {/* <directionalLight intensity= {0.8} color= {0xffea00} position={[2, 5, 1]} />  */}
        <AnimatedBox />
        <OrbitControls />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube />
        </GizmoHelper>
        <LightWithHelper/>
        <mesh position={[0,-1.5,0]} rotation={[-Math.PI / 2,0,0]} receiveShadow>
          <planeGeometry args={[20,20]}/>
          <meshStandardMaterial/>
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
