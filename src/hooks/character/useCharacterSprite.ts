import { useMemo } from "react";
import { Direction } from "../../models/enums/Direction";
import characterImg from "../../assets/character.png";
import characterImgRight from "../../assets/character-rigth.png";
import characterImgLeft from "../../assets/character-left.png";

export function useCharacterSprite(direction: Direction) {
    return useMemo(() => {
        switch (direction) {
            case Direction.Left:
                return characterImgLeft;
            case Direction.Right:
                return characterImgRight;
            default:
                return characterImg;
        }
    }, [direction]);
}