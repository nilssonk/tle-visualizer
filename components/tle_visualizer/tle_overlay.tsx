import React, { useState } from 'react'

import TleInputFrame from 'components/tle_visualizer/tle_overlay/tle_input_frame'
import TleDisplayFrame from 'components/tle_visualizer/tle_overlay/tle_display_frame'

import { Tle } from 'util/tle'
import ParseTle from 'util/parse_tle'

function TleOverlay(): JSX.Element {
    const [tleValue, setTleValue] = useState<Tle | null>(null)

    const handleTleInput = (newValue: string) => {
        const tle = ParseTle(newValue)
        setTleValue(tle)
    }

    return (
        <>
            <TleInputFrame tleChanged={handleTleInput} />
            <TleDisplayFrame tle={tleValue} />
        </>
    )
}

export default TleOverlay
