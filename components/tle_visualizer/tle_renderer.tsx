import React, { Suspense, useRef } from 'react'
import { RootState, useFrame } from '@react-three/fiber'
import { Group } from 'three'

import EarthModel from 'components/tle_visualizer/tle_renderer/earth_model'

function TleRenderer(): JSX.Element {
    const ref = useRef<Group>(new Group())

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
