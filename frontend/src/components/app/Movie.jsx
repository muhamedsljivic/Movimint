import classes from "./Movie.module.css";
const Movie = ({ src, title, type, onClick }) => {
  return (
    <li className={classes.movie} onClick={onClick}>
      <img src={src} alt={title} />
      <p className={classes["movie-title"]}>{title}</p>
      <p className={classes["movie-type"]}>{type}</p>
    </li>
  );
};
export default Movie;
