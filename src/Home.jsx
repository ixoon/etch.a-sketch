import React, { useState, useEffect } from "react";

function Draw() {
    const [color, setColor] = useState("#000000");
    const [gridSize, setGridSize] = useState(16);
    const [isDrawing, setIsDrawing] = useState(false);

    const createGrid = (size) => {
        const container = document.querySelector(".display-container");
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) {
            const div = document.createElement("div");
            div.classList.add("grid-item");
            container.appendChild(div);
        }
    };

    useEffect(() => {
        createGrid(gridSize);
    }, [gridSize]);

    const handleMouseOver = (e) => {
        if (isDrawing && e.target.classList.contains("grid-item")) {
            e.target.style.backgroundColor = color;
        }
    };

    return (
        <>
            <h1>ETCH A <span>SKETCH</span></h1>
            <div className="container">
                <div className="controls-container">
                    <input 
                        type="color" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)}
                    /> <br />
                    <button type="button" onClick={() => setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)}>Random</button> <br />
                    <button type="button" onClick={() => setColor("#FFFFFF")}>Eraser</button> <br />
                    <button type="button" onClick={() => createGrid(gridSize)}>Clear</button> <br />
                    <div className="display-gridSize">{gridSize} x {gridSize}</div>
                    <input 
                        type="range" 
                        className="grid-size" 
                        min="2" 
                        max="64" 
                        value={gridSize} 
                        onChange={(e) => setGridSize(Number(e.target.value))}
                    />
                </div>
                <div 
                    className="display-container"
                    onMouseDown={() => setIsDrawing(true)}
                    onMouseUp={() => setIsDrawing(false)}
                    onMouseLeave={() => setIsDrawing(false)}
                    onMouseOver={handleMouseOver}
                />
            </div>
        </>
    );
}

export default Draw;
