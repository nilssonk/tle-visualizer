import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'

import TleRenderer from 'components/tle_visualizer/tle_renderer'
import TleOverlay from 'components/tle_visualizer/tle_overlay'

function TleVisualizer(): JSX.Element {
    return (
        <Canvas>
            <color attach="background" args={['gray']} />
            <TleRenderer />
            <Html fullscreen={true}>
                <TleOverlay />
            </Html>
        </Canvas>
    )
}

export default TleVisualizer
