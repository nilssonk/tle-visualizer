import React from 'react'

import { Tle, TleLine } from 'util/tle'

function TleDisplayFrame({ tle }: { tle: Tle | null }): JSX.Element {
    if (tle === null) {
        return <></>
    }

    const style = 'show_tle'

    const makeListElem = ([name, value]: [string, TleLine]) => {
        return (
            <li key={name} className={style}>
                <h2 className={style}>{name}</h2>
                <p className={style}>{value}</p>
            </li>
        )
    }

    return (
        <div id={style} className="overlay_element">
            <h1 className={style}>TLE Summary</h1>
            <ul id={style}>{tle.map((e) => makeListElem(e))}</ul>
        </div>
    )
}

export default TleDisplayFrame
