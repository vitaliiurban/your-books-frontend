import Input from "./Components/Input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/slices/bookSlice";
import { fetchGenres } from "../../redux/slices/genresSlice";
function CreateModal({ show, setShow }) {
  const dispatch = useDispatch();
  const genresState = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: 0,
    publisher: "",
    image: "",
    rating: 0,
    genres: "",
    in_stock: 0,
    reserved: 0,
    description: "",
  });
  const [genres, setGenres] = useState(0);
  const [descripton, setDescription] = useState("");
  const handleGenreChange = (event) => {
    setGenres(event.target.value);
    setFormData({
      ...formData,
      genres: event.target.value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.year ||
      !formData.publisher ||
      !formData.image ||
      !formData.rating ||
      !formData.genres ||
      !formData.in_stock ||
      !formData.reserved ||
      !formData.description
    ) {
      console.log("error need more data");
      return;
    }
    dispatch(createBook(formData));
  };
  console.log(formData);
  return (
    <>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          show ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}
        style={{
          backgroundColor: "rgba(000, 000, 000, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      ></div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          show ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-900 ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Book
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setShow(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <Input
                  label="title"
                  placeholder="Type book name"
                  type="text"
                  oneline={true}
                  value={formData.title}
                  onChange={handleInputChange}
                />

                <Input
                  label="author"
                  placeholder="Type book author"
                  type="text"
                  oneline={false}
                  value={formData.author}
                  onChange={handleInputChange}
                />
                <Input
                  label="year"
                  placeholder="Type book year"
                  type="number"
                  oneline={false}
                  value={formData.year}
                  onChange={handleInputChange}
                  min={2000}
                  max={2023}
                />
                <Input
                  label="publisher"
                  placeholder="Type book publisher"
                  type="text"
                  oneline={false}
                  value={formData.publisher}
                  onChange={handleInputChange}
                />
                <Input
                  label="image"
                  placeholder="Type book image url"
                  type="text"
                  oneline={false}
                  value={formData.image}
                  onChange={handleInputChange}
                />
                <Input
                  label="rating"
                  placeholder="Type book rating 1-5"
                  type="number"
                  oneline={false}
                  value={formData.rating}
                  onChange={handleInputChange}
                  min={1}
                  max={5}
                />

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    genres
                  </label>
                  <select
                    id="genres"
                    value={genres}
                    onChange={handleGenreChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {genresState?.data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="in_stock"
                  placeholder="Type book stock quantity"
                  type="number"
                  oneline={false}
                  value={formData.in_stock}
                  onChange={handleInputChange}
                  min={0}
                  max={35}
                />
                <Input
                  label="reserved"
                  placeholder="Type book reserved quantity"
                  type="number"
                  oneline={false}
                  value={formData.reserved}
                  onChange={handleInputChange}
                  min={0}
                  max={35}
                />

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="Write product description here"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateModal;
