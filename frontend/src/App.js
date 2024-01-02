import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import ErrorPage from "./pages/Error";
import HomePageRoute from "./pages/HomePageRoute";
import MovieDetailPage, {
  loader as singleMovieLoader,
  action as deleteMovieAction,
} from "./pages/MovieDetailPage";
import EditMoviePage from "./pages/EditMoviePage";
import HomePageRouteLayout from "./pages/HomePageRouteLayout";
import MovieDetailPageLayout from "./pages/MovieDetailPageLayout";
import { action as editMovieAction } from "./components/app/MovieForm";
import { checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    // action: loginAction,
  },
  { path: "/signup", element: <SignUpPage />, errorElement: <ErrorPage /> },
  {
    path: "/homepage",
    element: <HomePageRouteLayout />,
    loader: checkAuthLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePageRoute />,
        // loader: movieLoader,
      },
      {
        path: ":movieId",
        id: "movie-detail",
        element: <MovieDetailPageLayout />,
        loader: singleMovieLoader,
        children: [
          {
            index: true,
            element: <MovieDetailPage />,
            loader: singleMovieLoader,
            action: deleteMovieAction,
          },
          {
            path: "edit",
            element: <EditMoviePage />,
            action: editMovieAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
