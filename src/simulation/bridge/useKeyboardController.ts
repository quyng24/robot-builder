import { useEffect } from "react";
import { getSimulationState } from "../state/SimulationState";

export function useKeyboardController(isActive: boolean = true) {
    useEffect(() => {
        if(!isActive) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
            const world = getSimulationState();
            switch(e.code) {
                case "KeyW":
                case "ArrowUp":
                    world.setControllerInput({ linear: 1 });
                    break;
                case "KeyS":
                case "ArrowDown":
                    world.setControllerInput({ linear: -1 });
                    break;
                case "KeyA":
                case "ArrowLeft":
                    world.setControllerInput({ angular: 1 });
                    break;
                case "KeyD":
                case "ArrowRight":
                    world.setControllerInput({ angular: -1 });
                    break;
                case "Space":
                    world.setControllerInput({ manualBrake: true });
                    break;
                }
            }

            const handleKeyUp = (e: KeyboardEvent) => {
                const world = getSimulationState();
                switch (e.code) {
                    case "KeyW":
                    case "ArrowUp":
                    case "KeyS":
                    case "ArrowDown":
                        world.setControllerInput({ linear: 0 });
                        break;
                    case "KeyA":
                    case "ArrowLeft":
                    case "KeyD":
                    case "ArrowRight":
                        world.setControllerInput({ angular: 0 });
                        break;
                    case "Space":
                        world.setControllerInput({ manualBrake: false });
                        break;
                    }
            }

            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                window.removeEventListener("keyup", handleKeyUp);
                getSimulationState().setControllerInput({ linear: 0, angular: 0, manualBrake: false});
            }
    }, [isActive]);
}