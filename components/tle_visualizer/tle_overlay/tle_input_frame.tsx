import React, { useEffect, useState } from 'react'

type TextCallback = (x: string) => void

const exampleTles: Array<[string, string]> = [
    [
        'International Space Station',
        `ISS (ZARYA)
1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537`,
    ],
]

function TleInput({
    exampleText,
    setExampleText,
    style,
}: {
    exampleText: string
    setExampleText: TextCallback
    style: string
}): JSX.Element {
    const inputChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()

        const newValue = event.target.value
        setExampleText(newValue)
    }

    return (
        <>
            <h1 className={style}>TLE Input</h1>
            <textarea
                className={style}
                wrap="false"
                rows={3}
                cols={70}
                onChange={inputChanged}
                required
                value={exampleText}
            />
        </>
    )
}

function TleExamples({
    setExampleText,
    style,
}: {
    setExampleText: (x: string) => void
    style: string
}): JSX.Element {
    const exampleStyle = 'input_tle_example'

    const makeExampleTle = ([name, content]: [string, string]) => {
        return (
            <li
                key={name}
                className={exampleStyle}
                onMouseDown={() => setExampleText(content)}
            >
                <h3 className={exampleStyle}>{name}</h3>
                <p>{content}</p>
            </li>
        )
    }

    return (
        <>
            <h2 className={style}>Example TLEs</h2>
            <ul id={exampleStyle}>
                {exampleTles.map((tle) => makeExampleTle(tle))}
            </ul>
        </>
    )
}

function TleInputFrame({
    tleChanged,
}: {
    tleChanged: TextCallback
}): JSX.Element {
    const style = 'input_tle'
    const [exampleText, setExampleText] = useState('')

    useEffect(() => tleChanged(exampleText), [exampleText])

    return (
        <div id={style} className="overlay_element">
            <TleInput
                exampleText={exampleText}
                setExampleText={setExampleText}
                style={style}
            />
            <TleExamples setExampleText={setExampleText} style={style} />
        </div>
    )
}

export default TleInputFrame
