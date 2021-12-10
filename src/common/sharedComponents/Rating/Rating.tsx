import s from "./Rating.module.css";

type RatingProps = {
  value?: number;
};

const Rating = ({ value = 0 }: RatingProps) => {
  let className = '';
  switch (true) {
    case (value < 50):
      className = `${s['rating-low']}`
      break;

    case (value >= 75):
      className = `${s['rating-high']}`
      break;
    case (value >= 50):
      className = `${s['rating-mid']}`
      break;
    default:
    
  }
  return (
    <div className={s.rating + ' ' + className}>
      {value}
    </div>
  );
};

export default Rating;
