import { Canvas, useLoader } from "@react-three/fiber";
import { useSpring, animated as a } from "@react-spring/three";
import { OrbitControls, Html } from "@react-three/drei";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { TextureLoader } from "three";

// Load image from public folder
const Card = () => {
  const [hovered, setHovered] = useState(false);
  
  // Ensure the image is in the "public/image" folder
  const texture = useLoader(TextureLoader, "/image/profil.jpg");

  // Smooth tilt animation
  const { rotation } = useSpring({
    rotation: hovered ? [0.1, 0.2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <a.mesh
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
  
      <boxGeometry args={[2, 3, 0.2]} />
      <meshStandardMaterial map={texture} />

      <Html position={[0, 0, 0.16]} center occlude>
        <div 
          className="p-5 rounded-xl text-center shadow-lg w-52 backdrop-blur-md"
          style={{
            // backgroundColor: "rgba(0, 0, 0, 0.7)", // Better contrast
            color: "white",
            fontWeight: "bold",
            borderRadius: "12px",
          }}
        >
          <h2 className="text-xl font-extrabold drop-shadow-lg">Rohan Parveag</h2>
          <p className="text-sm text-gray-300 drop-shadow-lg">Full-Stack Developer</p>
          <div className="flex justify-center mt-4 space-x-4 text-lg">
            <a href="https://github.com/DevRohan33" target="_blank" className="text-white hover:text-blue-400">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/rohanparveag" target="_blank" className="text-white hover:text-blue-400">
              <FaLinkedin />
            </a>
            <a href="mailto:rohanparveag@gmail.com" className="text-white hover:text-blue-400">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </Html>
    </a.mesh>
  );
};

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Card />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
