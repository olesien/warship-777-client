import React from "react";
import RenderGameRows from "./RenderGameRows";
import RenderRows from "./RenderRows";

export default function RenderColumns({
    grid,
    drop = false,
    allowDrop = false,
    drag = false,
}) {
    return (
        <>
            {grid.map((column, columnIndex, type) => (
                <div className="rows" key={columnIndex}>
                    {column.map((row, rowIndex) => {
                        //console.log(column.length, columnIndex, rowIndex);
                        const calculateTotal =
                            column.length * columnIndex + (rowIndex + 1);
                        //Already in game!
                        if (!drop) {
                            return (
                                <RenderGameRows
                                    row={row}
                                    totalIndex={calculateTotal}
                                    key={calculateTotal}
                                    type={type}
                                />
                            );
                        }

                        //Placement grid
                        return (
                            <RenderRows
                                row={row}
                                drop={drop}
                                allowDrop={allowDrop}
                                drag={drag}
                                totalIndex={calculateTotal}
                                key={calculateTotal}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}
