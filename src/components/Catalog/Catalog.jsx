import { useNavigate } from "react-router-dom";
function Catalog({ books }) {
  const navigateTo = useNavigate();
  const openBook = (id) => {
    navigateTo(`/catalog/${id}`);
  };
  return (
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
  );
}

export default Catalog;
