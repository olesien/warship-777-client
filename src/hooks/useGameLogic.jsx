import { useGameContext } from "../contexts/GameContextProvider";

const calculateParts = (partCount, direction) => {
    // const directions = ["left", "right", "up", "down"];
    const parts = [];
    let col = 0;
    let row = 0;

    //for loop to get proper part length!
    for (let i = 0; i < partCount; i++) {
        if (direction === "left") {
            col--;
        } else if (direction === "right") {
            col++;
        }

        if (direction === "up") {
            row--;
        } else if (direction === "down") {
            row++;
        }
        parts.push({ col, row });
        console.log("ran part");
    }

    //subparts: [{ col: 0, row: 1 }] for example
    return parts;
};

export default function useGameLogic() {
    const { grid, setGrid, removeBoatFromStart, addBoatToStart } =
        useGameContext();
    //filled means that it can be interacted with. Part is just for visuals

    // const [grid, setGrid] = useState([
    //     [
    //         { filled: false, part: false, hit: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         {
    //             filled: true,
    //             part: true,
    //             subparts: [{col: 1, row: 0}]
    //         },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    //     [
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //         { filled: false, part: false },
    //     ],
    // ]);
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        //extract the element by its id
        const boatId = ev.dataTransfer.getData("text");
        //get the element
        const child = document.getElementById(boatId);
        //Get the parents & their indexes.
        const parentNode = child.parentNode;
        const parentIndex = Number(parentNode.id.substring(3));
        const totalIndex = Number(ev.target.id.substring(3));

        //Calculate how many rows/columns there are. This assumes that it is a square!!!!
        const columnCount = grid.length;
        const rowCount = grid[0].length;

        //Get the column index of the new and old position
        const columnIndex = Math.ceil(totalIndex / columnCount) - 1;
        const parentColumnIndex = Math.ceil(parentIndex / columnCount) - 1;

        //Reverse engineer to get the index for the rows as well
        const rowIndex = totalIndex - rowCount * columnIndex - 1;

        const parentRowIndex = parentIndex - rowCount * parentColumnIndex - 1;

        //Is it a new ship (dragged from outside the grid)
        let isNew = parentColumnIndex === -1;

        console.log(isNew);

        const isDroppingOnStart = ev.target.classList.contains("boat-setup");

        if (isDroppingOnStart) {
            isNew = false;
        }

        console.log(isDroppingOnStart);

        //is a part of the ship!
        if (
            !isDroppingOnStart &&
            (grid[columnIndex] === undefined ||
                grid[columnIndex][rowIndex].part)
        ) {
            console.log("returning!");
            return;
        }

        //Which class names should be expected?
        const lengthList = ["single", "double", "triple", "quadruple"];
        const directions = ["left", "right", "up", "down"];

        let length, direction;
        //Only run this if it's new
        if (isNew) {
            //get index to determine if it's a single/double/triple/quadruple sized boat
            length = lengthList.findIndex(
                (len) =>
                    len ===
                    Array.from(child.classList).find((childClass) =>
                        lengthList.find((length) => length === childClass)
                    )
            );

            //What direction is it?
            direction = Array.from(child.classList).find((childClass) =>
                directions.find((direction) => direction === childClass)
            );
        }

        //Update the grid
        setGrid((prevGrid) => {
            let oldGridItem = {};
            if (isNew) {
                //Using what we got from the if statement above, calculate what the relative directions of the tile "children" should be
                oldGridItem.subparts = calculateParts(length, direction);
            } else {
                //Not new, this boat exists on the grid already. Grab reference to it
                oldGridItem = prevGrid[parentColumnIndex][parentRowIndex];
            }
            //const oldGridItem = prevGrid[parentColumnIndex][parentRowIndex];

            //Can you even place the boat?
            let obfuscated = false;

            let children;
            //Get the children new positions and then also check if those tiles can be placed within the grid (and they are not already taken)
            if (isNew) {
                children = oldGridItem.subparts.map((subpart) => {
                    const newColumn = columnIndex + subpart.col;

                    const newRow = rowIndex + subpart.row;

                    //x axis will cause overflow
                    if (!prevGrid[newColumn]) {
                        obfuscated = true;
                        return {};
                    }

                    const newGridItem = prevGrid[newColumn][newRow];
                    console.log(newGridItem);
                    //y axis will cause overflow, or those parts are already filled.
                    if (
                        newGridItem === undefined ||
                        newGridItem.filled ||
                        newGridItem.part
                    ) {
                        obfuscated = true;
                    }

                    return { newColumn, newRow };
                });
            } else {
                //Calculate the positions of the old and new positions for the children. Will they cause overflow?
                children = oldGridItem.subparts.map((subpart) => {
                    const newColumn = columnIndex + subpart.col;
                    const oldColumn = parentColumnIndex + subpart.col;

                    const newRow = rowIndex + subpart.row;
                    const oldRow = parentRowIndex + subpart.row;

                    if (isDroppingOnStart) {
                        return { oldColumn, oldRow };
                    }

                    //x axis will cause overflow
                    if (!prevGrid[newColumn]) {
                        obfuscated = true;
                        return {};
                    }

                    const newGridItem = prevGrid[newColumn][newRow];
                    console.log(newGridItem);
                    //y axis will cause overflow, or those parts are already filled.
                    if (
                        newGridItem === undefined ||
                        newGridItem.filled ||
                        newGridItem.part
                    ) {
                        obfuscated = true;
                    }

                    return { newColumn, oldColumn, newRow, oldRow };
                });
            }

            //If obfuscated, just return!
            if (!isDroppingOnStart && obfuscated) {
                console.log("returning");
                return prevGrid;
            }

            //new grid

            const newGrid = prevGrid.map((prevColumn, prevColumnIndex) => {
                //Map through the columns
                return prevColumn.map((prevRow, prevRowIndex) => {
                    //add "main" boat tile
                    if (
                        prevRowIndex === rowIndex &&
                        prevColumnIndex === columnIndex &&
                        !isDroppingOnStart
                    ) {
                        console.log(
                            "Adding to: " + prevColumnIndex + " " + prevRowIndex
                        );
                        return {
                            filled: true,
                            part: true,
                            subparts: oldGridItem.subparts,
                            hit: false,
                            missed: false,
                        };
                    }
                    //remove the "main" boat tile
                    if (
                        prevRowIndex === parentRowIndex &&
                        prevColumnIndex === parentColumnIndex
                    ) {
                        console.log(
                            "Removing from: " +
                                prevColumnIndex +
                                " " +
                                prevRowIndex
                        );
                        return {
                            filled: false,
                            part: false,
                            hit: false,
                            missed: false,
                        };
                    }

                    //loop through the smaller component parts to add or remove.

                    const rightTile = children.find(
                        (child) =>
                            child.newColumn === prevColumnIndex &&
                            child.newRow === prevRowIndex
                    );
                    if (rightTile && !isDroppingOnStart) {
                        //add this tile!
                        console.log("adding component tile");
                        return {
                            filled: false,
                            part: true,
                            hit: false,
                            missed: false,
                        };
                    }

                    //If it's new we can't delete the old tile in the traditional sense!
                    if (!isNew) {
                        console.log("running delete tiles");
                        const deleteTile = children.find(
                            (child) =>
                                child.oldColumn === prevColumnIndex &&
                                child.oldRow === prevRowIndex
                        );

                        console.log(children);
                        console.log(prevColumnIndex, prevRowIndex);

                        if (deleteTile) {
                            console.log(prevColumnIndex, prevRowIndex);
                            console.log("deleting component tile");
                            //add this tile!
                            return {
                                filled: false,
                                part: false,
                                hit: false,
                                missed: false,
                            };
                        }
                    }

                    //If no changes to this row, return it
                    return prevRow;
                });
            });
            //Is new. Delete the old one
            if (isNew) {
                try {
                    //Get boat index and remove it from start!
                    const boatIndex = Number(boatId.substring(4)) - 1;
                    removeBoatFromStart(boatIndex);
                } catch (err) {
                    console.log(err);
                }
            } else if (isDroppingOnStart) {
                console.log("dropping on start");
                const sizeIndex = children.length;
                const size = lengthList[sizeIndex];
                console.log(size);

                //directions
                let direction = "right";

                const oldSubPart = oldGridItem.subparts[0];

                console.log(oldSubPart);

                if (oldSubPart.col === -1) {
                    //go left;
                    direction = "left";
                } else if (oldSubPart.row === 1) {
                    //go up
                    direction = "up";
                } else if (oldSubPart.row === -1) {
                    //go down;
                    direction = "down";
                }

                console.log(direction);
                addBoatToStart(size, direction);
            }
            //Return the new grid
            return newGrid;
        });

        //ev.target.appendChild(document.getElementById(data));
    }
    return { grid, drop: drop, allowDrop: allowDrop, drag: drag };
}
