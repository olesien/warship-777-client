import RenderGridDesc from "../components/RenderGridDesc";
import RenderColumns from "./RenderColumns";
import { useGameContext } from "../contexts/GameContextProvider";

export default function RenderPlayerGrid() {
    const { player } = useGameContext();
    return (
        <div className="d-flex flex-column" id="playFieldPosition">
            <div
                className="grid-container justify-content-end w-400"
                id="nmrPosition"
            >
                <RenderGridDesc alfabet={false} />
            </div>

            <div className="d-flex">
                <div className="grid-container d-flex flex-column">
                    <RenderGridDesc isAlfabet={true} />
                </div>

                <div
                    className="bg-gameboard container text-center grid-container"
                    style={{ height: "400px", width: "400px" }}
                >
                    <RenderColumns grid={player.gameboard} type="player" />
                </div>
            </div>
        </div>
    );
}
