import {Box, OrbitControls, Plane} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

function ApartmentScene() {
  return (
    <>
      {/* Плоскость пола */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="lightgray"/>
      </Plane>

      {/* Стены как коробки */}
      <Box position={[0, 0.5, -2]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box position={[2, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color="white"/>
      </Box>

      {/* Дверь */}
      <Box position={[0, 0.5, 2]} args={[1, 1, 0.05]}>
        <meshStandardMaterial color="brown"/>
      </Box>

      {/* Освещение */}
      <ambientLight intensity={0.5}/>
      <directionalLight position={[5, 5, 5]} intensity={1}/>

    </>
  )
}

export default function HUApartmentScene() {
  return (
    <Canvas camera={{position: [0, 5, 0], fov: 50}} shadows>
      <OrbitControls
        enableRotate={false} // Зафиксируем вращение для вида сверху
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <ApartmentScene/>
    </Canvas>
  )
}