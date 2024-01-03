import { Suspense } from "react";
import { getAuthToken } from "../util/auth";
import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import axios from "axios";
import SingleMovie from "../components/app/SingleMovie";
import ClipLoader from "react-spinners/ClipLoader";
import { url as fetchUrl } from "../../util/globalVariables";

function MovieDetailPage() {
  const { data } = useRouteLoaderData("movie-detail");
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClipLoader color={"#3d4958"} size={35} />
        </div>
      }
    >
      <Await resolve={data}>
        {(loadedMovie) => {
          return (
            <SingleMovie
              src={loadedMovie.data.movie.posterUrl}
              description={loadedMovie.data.movie.description}
              title={loadedMovie.data.movie.title}
              genre={loadedMovie.data.movie.genre}
              rating={loadedMovie.data.movie.rating}
              date={loadedMovie.data.movie.releaseDate}
              time={loadedMovie.data.movie.runtime}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}

export default MovieDetailPage;

async function loadMovieDetails(id, token) {
  const response = await axios.get(`${fetchUrl}/api/v1/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw json(
      { message: "Could not fetch details for selected movie" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function loader({ params }) {
  const id = params.movieId;
  const token = getAuthToken();

  return defer({
    data: loadMovieDetails(id, token),
  });
}

export async function action({ params, request }) {
  const movieId = params.movieId;
  const token = getAuthToken();
  const response = await axios({
    method: "delete",
    url: `${fetchUrl}/api/v1/movies/${movieId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/homepage");
}
