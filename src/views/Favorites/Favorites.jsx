/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { useEffect, useState } from "react";

import { fetchFavoritesBooks } from "../../redux/slices/booksSlice";
import { deleteFavorite } from "../../redux/slices/favoritesSlice.js";

export default function Reserves() {
  const dispatch = useDispatch();
  const { user } = useStateContext();
  const favorites = useSelector((state) => state.favorites);
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchFavoritesBooks({ user_id: user.id }));
  }, [favorites.data]);

  return (
    <div className="">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
          Favorites
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {books?.favoritesBooks?.map((book) => (
                <li key={book.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={book.image}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a
                            href={book.image}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {book.title}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          {book.author}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {book.publisher}
                      </p>
                    </div>

                    <div className="mt-4 flex-1 flex items-end justify-between">
                      <p className="flex items-center text-sm text-gray-700 space-x-2"></p>
                      <div className="ml-4">
                        <button
                          onClick={() => {
                            dispatch(
                              deleteFavorite({
                                book_id: book.id,
                                user_id: user.id,
                              })
                            );
                          }}
                          type="button"
                          className="text-sm font-medium text-red-700 hover:text-red-800"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </form>
      </div>
    </div>
  );
}
