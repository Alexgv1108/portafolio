import { useShallow } from "zustand/shallow";
import { useCharacterPosition } from "../../hooks/character/useCharacterPosition";
import { useCharacterSprite } from "../../hooks/character/useCharacterSprite";
import { useCharacterStore } from "../../hooks/stores/useCharacterStore";

export const Character = () => {
    useCharacterPosition();

    const { direction, x, y } = useCharacterStore(
        useShallow((state) => ({
            direction: state.direction,
            x: state.x,
            y: state.y,
        }))
    );

    const sprite = useCharacterSprite(direction);

    return (
        <div
            className="absolute"
            style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                willChange: "transform",
                backfaceVisibility: "hidden",
                zIndex: 9999,
            }}
        >
            <img
                src={sprite}
                alt="Character sprite"
                className="h-64 object-contain"
                style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                }}
            />
        </div>
    );
}