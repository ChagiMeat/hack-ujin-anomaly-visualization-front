import {Box, ContactShadows, OrbitControls, Plane} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

function ApartmentScene() {
  return (
    <>
      {/* Плоскость пола */}
      <Plane args={[4, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="lightgray"/>
      </Plane>

      {/* Стены как коробки */}
      <Box receiveShadow castShadow position={[0, 0.5, -1.95]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[0, 0.5, 1.95]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color="white"/>
      </Box>

      {/* Освещение */}
      <ambientLight intensity={0.5}/>
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={10}
      />
    </>
  )
}

export default function HUApartmentScene() {
  return (
    <Canvas camera={{position: [0, 5, 0], fov: 50}} shadows>
      <OrbitControls
        enableRotate
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 3}
        maxDistance={8}
        minDistance={5}
      />
      <ApartmentScene/>
    </Canvas>
  )
}