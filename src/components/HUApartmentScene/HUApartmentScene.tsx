import {Box, ContactShadows, OrbitControls, Plane, SoftShadows} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Cylinder} from "@react-three/drei/core/shapes";
import {SignalItemI} from "../../api/getDeviceInfo.ts";

const DEVICES_COORDINATES: [number, number, number][] = [];

function ApartmentScene({devices}: HUApartmentScenePropsI) {
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
      <Box receiveShadow castShadow position={[0.1, 0.5, 0.6]} args={[1.7, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[1.8, 0.5, 0.6]} args={[0.5, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-0.7, 0.5, 1]} args={[0.1, 1, 2]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-0.7, 0.5, -1.2]} args={[0.1, 1, 1.4]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-1.8, 0.5, -1]} args={[0.4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-0.9, 0.5, -1]} args={[0.4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>

      {/*Датчик*/}
      <Cylinder
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
        receiveShadow castShadow position={[0, 0.5, -1.9]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[0.1, 0.1, 0.1]}
      >
        <meshStandardMaterial color='#27EB96'/>
      </Cylinder>
    </>
  )
}

interface HUApartmentScenePropsI {
  devices?: SignalItemI[];
}

export default function HUApartmentScene({devices}: HUApartmentScenePropsI) {
  return (
    <Canvas
      style={{width: 600, height: 600}}
      camera={{
        fov: 50,
        far: 100,
        near: 0.1,
        position: [0, 7, 8]
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      shadows
    >
      <ApartmentScene/>

      <OrbitControls
        enableRotate
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        minDistance={8}
        maxDistance={8}
        enablePan={false}
        target={[0, 0.5, 0]}
      />

      <hemisphereLight
        color="white"
        groundColor="#171717"
        intensity={0.8}
      />

      {/* Основной направленный свет */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001} // Уменьшает артефакты
        shadow-normalBias={0.05} // Улучшает качество теней
      />

      {/* Дополнительный мягкий свет сбоку */}
      <directionalLight
        position={[-10, 5, 0]}
        intensity={0.4}
        castShadow={false}
      />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={10}
      />

      <SoftShadows size={25} samples={16} />
      <ambientLight intensity={1}/>
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow={true}
      />
    </Canvas>
  )
}
