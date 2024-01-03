import React, { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import classes from "./HomePage.module.css";
import HomePageSidebar from "../UI/HomePageSidebar";
import Movie from "./Movie";
import Navbar from "../UI/Navbar";
import { Pagination } from "./Pagination";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { url as fetchUrl } from "globalVariables";

const HomePage = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(28);
  const scrollableContainerRef = useRef(null);
  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (newSearch) => {
    paginate(1);
    setSearchTerm(newSearch);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0;
      }

      try {
        setLoading(true);
        const token = getAuthToken();
        const response = await axios.get(
          `${fetchUrl}/api/v1/movies?limit=${postsPerPage}&skip=${
            (currentPage - 1) * postsPerPage
          }&search=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTotalPosts(response.data.count);
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, postsPerPage, searchTerm]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={classes.homepage}>
        <HomePageSidebar />
        <div className={classes.movies}>
          <Navbar onSearchChange={handleSearchChange} />
          {loading ? (
            <div className={classes.loader}>
              <ClipLoader color={"#3d4958"} loading={loading} size={35} />
            </div>
          ) : (
            <div
              className={classes["main-page--container"]}
              ref={scrollableContainerRef}
            >
              <ul className={classes["movie-container"]}>
                {searchTerm.length < 0
                  ? movies.results &&
                    movies.results.map((movie) => (
                      <Link
                        to={movie._id}
                        key={movie._id}
                        className={classes.link}
                      >
                        <Movie
                          id={movie._id}
                          title={movie.title}
                          type={movie.genre}
                          src={movie.posterUrl}
                        />
                      </Link>
                    ))
                  : movies.results &&
                    movies.results
                      .filter((movie) => {
                        return movie.title.toLowerCase().includes(searchTerm);
                      })
                      .map((movie) => (
                        <Link
                          to={movie._id}
                          key={movie._id}
                          className={classes.link}
                        >
                          <Movie
                            id={movie._id}
                            title={movie.title}
                            type={movie.genre}
                            src={movie.posterUrl}
                          />
                        </Link>
                      ))}
              </ul>
              )
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={movies && totalPosts}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
