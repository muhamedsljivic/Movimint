import React from "react";
import classes from "./SingleMovie.module.css";
import { Link, useSubmit, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function SingleMovie({ description, title, genre, src, rating, date, time }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const deleteHandler = ({ movie }) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "Delete" });
    }
  };
  const type = localStorage.getItem("type");

  const backHandler = () => {
    navigate("..");
  };

  return (
    <div className={classes.container}>
      <IoMdArrowBack onClick={backHandler} size={28} className={classes.icon} />
      <div className={classes["movie-container"]}>
        <div className={classes.imageWrapper}>
          <img src={src} alt={title} className={classes.movieImage} />
        </div>
        <div className={classes.details}>
          <div className={classes.titleSection}>
            <span className={classes.year}>{new Date(date).getFullYear()}</span>
            <h1 className={classes.title}>{title}</h1>
          </div>
          <p className={classes.summary}>{description}</p>
          <div className={classes.genre}>
            <p>
              {genre} / {time} min
            </p>
          </div>
          <div className={classes.rating}>{rating} rating</div>

          {/* 
          
          <span>❤</span>
          */}

          {type === "admin" && (
            <div className={classes.buttons}>
              <Link to="edit">Edit</Link>
              <button onClick={deleteHandler} type="button">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
