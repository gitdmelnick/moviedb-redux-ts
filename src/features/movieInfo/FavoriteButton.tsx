import { MouseEvent } from "react";
import s from "./FavoriteButton.module.css";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: (e: MouseEvent) => void;
};

const FavoriteButton = ({ isFavorite, onClick}: FavoriteButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  return (
    <button onClick={handleClick} className={s["favorite-button"]}>
      <img className={`${s["favorite-icon"]} ${isFavorite ? s["favorite-active"] : ''}`}/>
    </button>
  );
};

export default FavoriteButton;
