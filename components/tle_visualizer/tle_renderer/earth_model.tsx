import React from 'react'
import { useGLTF } from '@react-three/drei'

function EarthModel() {
    const earth = useGLTF('/models/earthmap.draco.glb')

    const scaleFactor = 0.03
    const scales = [scaleFactor, scaleFactor, scaleFactor]

    return <primitive object={earth.scene} scale={scales} />
}

export default EarthModel
