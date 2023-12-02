import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/booksSlice";
import ReactPaginate from "react-paginate";

function Catalog() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const books = useSelector((state) => state.books);

  const handlePageChange = (selectedPage) => {
    const selected = selectedPage.selected;
    setCurrentPage(selected + 1);
  };

  const openBook = (id) => {
    navigateTo(`/catalog/${id}`);
  };

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, limit: currentLimit }));
  }, [currentPage]);
  console.log(books);

  return (
    <>
      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-center flex-col items-center">
          <h1 className="font-bold mb-4 text-4xl">Check out our books!</h1>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {books?.data?.map((book) => (
              <a
                key={book.id}
                onClick={() => openBook(book.id)}
                className="group cursor-pointer"
              >
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {book.author}
                </p>
              </a>
            ))}
          </div>
          <div className="flex ul mt-10">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={Math.ceil(books.quantity / currentLimit)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              forcePage={currentPage - 1}
              containerClassName={"flex text-xl justify-center items-center"}
              pageClassName={"rounded-md py-1 px-3"}
              activeLinkClassName={
                "bg-orange-600 text-stone-50 py-1 px-3 rounded-md cursor-default"
              }
              nextClassName={""}
              previousClassName={""}
              disabledLinkClassName={"text-stone-400 py-1 px-3 cursor-default"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalog;
