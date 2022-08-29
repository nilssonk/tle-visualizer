import React, { Suspense, useRef } from 'react'
import { RootState, useFrame } from '@react-three/fiber'
import { Object3D } from 'three'

import EarthModel from 'components/tle_visualizer/tle_renderer/earth_model'

function TleRenderer(): JSX.Element {
    const ref = useRef<Object3D>(new Object3D())

    useFrame((_state: RootState, delta: number) => {
        if (ref) {
            ref!.current!.rotation!.y! += delta * 0.5
        }
    })

    return (
        <>
            <Suspense fallback={null}>
                <group ref={ref}>
                    <EarthModel />
                </group>
            </Suspense>
            <ambientLight intensity={0.3} />
            <directionalLight />
        </>
    )
}

export default TleRenderer
