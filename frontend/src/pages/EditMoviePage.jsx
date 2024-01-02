import { Suspense } from "react";
import MovieForm from "../components/app/MovieForm";
import { useRouteLoaderData, Await } from "react-router-dom";
import { getUserType } from "../util/auth";
import ErrorPage from "./Error";

function EditMoviePage() {
  const type = getUserType();
  const data = useRouteLoaderData("movie-detail");
  if (type !== "admin") {
    return <ErrorPage />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data}>
        {(loadedMovie) => {
          return <MovieForm method="patch" movie={loadedMovie} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EditMoviePage;
