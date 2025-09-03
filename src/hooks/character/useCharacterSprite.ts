import { useMemo } from "react";
import { Direction } from "../../models/enums/Direction";
import characterImg from "../../assets/character.png";
import characterImgRight from "../../assets/character-rigth.png";
import characterImgLeft from "../../assets/character-left.png";

export function useCharacterSprite(direction: Direction) {
    return useMemo(() => {
        switch (direction) {
            case Direction.Left:
            case Direction.UpLeft:
            case Direction.DownLeft:
                return characterImgLeft;
            case Direction.Right:
            case Direction.UpRight:
            case Direction.DownRight:
                return characterImgRight;
            default:
                return characterImg;
        }
    }, [direction]);
}