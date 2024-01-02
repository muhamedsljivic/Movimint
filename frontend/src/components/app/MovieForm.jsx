import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

import classes from "./MovieForm.module.css";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { useEffect, useState } from "react";

function MovieForm({ method, movie }) {
  const data = useActionData();
  const [awaitedMovie, setAwaitedMovie] = useState();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  const backHandler = () => {
    navigate("..");
  };

  useEffect(() => {
    async function fetch() {
      const m = await movie.data;
      setAwaitedMovie(m);
    }
    fetch();
  }, [movie, awaitedMovie]);

  return (
    <div className={classes.container}>
      <IoMdArrowBack onClick={backHandler} size={28} className={classes.icon} />
      <Form method={method} className={classes.form}>
        <p>Validation not added yet.</p>
        {data && data.errors && (
          // ADD VALIDATION
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={awaitedMovie ? awaitedMovie.data.movie.title : ""}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={awaitedMovie ? awaitedMovie.data.movie.posterUrl : ""}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={
              awaitedMovie
                ? awaitedMovie.data.movie.releaseDate.split("T")[0]
                : ""
            }
          />
        </p>
        <p>
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            type="text"
            name="genre"
            required
            defaultValue={awaitedMovie ? awaitedMovie.data.movie.genre : ""}
          />
        </p>
        <p>
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            type="text"
            name="rating"
            required
            defaultValue={awaitedMovie ? awaitedMovie.data.movie.rating : ""}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={
              awaitedMovie ? awaitedMovie.data.movie.description : ""
            }
          />
        </p>

        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default MovieForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const movieData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
    genre: data.get("genre"),
    rating: data.get("rating"),
  };

  let url = "http://localhost:3000/movies";

  if (method === "PATCH") {
    const movieId = params.movieId;
    url = "http://localhost:3000/api/v1/movies/" + movieId;
  }

  const response = await axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(movieData),
  });

  if (response.status !== 200) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/homepage");
}
