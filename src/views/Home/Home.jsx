import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBooks } from "../../redux/slices/booksSlice.js";
import Catalog from "../../components/Catalog/Catalog.jsx";
import { fetchGenres } from "../../redux/slices/genresSlice.js";
import PrimaryButton from "../../components/Buttons/PrimaryButton.jsx";
import SecondaryButton from "../../components/Buttons/SecondaryButton.jsx";

function Home() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const genres = useSelector((state) => state.genres);
  const [searchQuery, setSearchQuery] = useState("");
  const [submit, setSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);
  // useEffect(() => {
  //   dispatch(
  //     fetchBooks({ page: currentPage, limit: currentLimit, searchQuery })
  //   );
  // }, [currentPage]);
  console.log(genres);
  const handleSearchSubmit = async (e, searchQuery) => {
    e.preventDefault();
    await dispatch(
      fetchBooks({ page: currentPage, limit: currentLimit, searchQuery })
    );
    setSubmit(true);
  };
  console.log(genres);
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-center flex-col items-center">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        it's a home page{" "}
        <span className="text-orange-600">You can search for books here </span>
      </h2>
      <form
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        onSubmit={(e) => handleSearchSubmit(e, searchQuery)}
      >
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="Search by books name, authors, publishers..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5  bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Search
          </button>
        </div>
      </form>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        or try to search by genre
      </h2>
      <div className="grid grid-rows-4	grid-flow-col gap-4 my-5">
        {genres?.data?.map((genre, index) =>
          index % 2 == 0 ? (
            <PrimaryButton
              key={index}
              label={genre.name}
              handleClick={(e) => handleSearchSubmit(e, genre.id)}
            />
          ) : (
            <SecondaryButton
              key={index}
              label={genre.name}
              handleClick={(e) => handleSearchSubmit(e, genre.id)}
            />
          )
        )}
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">
        search results:
      </h2>
      {submit && <Catalog books={books} />}
    </div>
  );
}

export default Home;
