import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Header() {
  //   const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useStateContext();
  const navigateTo = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("ACCESS_USER");
    window.location.reload();
  };
  const handleNavigate = (path) => {
    navigateTo(path);
  };
  const headerOptions = [
    { id: 1, name: "Catalog", path: "/catalog" },
    { id: 2, name: "Home", path: "/home" },
  ];
  const userOptions = [
    {
      id: 1,
      name: "Your Profile",
      path: "/user-profile",
      function: handleNavigate,
    },
    {
      id: 2,
      name: "Settings",
      path: "/user-settings",
      function: handleNavigate,
    },
    { id: 3, name: "Sign out", path: "", function: handleSignOut },
  ];
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="mx-auto h-12 w-auto"
                    src="/public/your-books.svg"
                    alt="your-books-logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {headerOptions.map((option) => (
                    <a
                      key={option.id}
                      className={`${
                        currentPath === option.path
                          ? "border-orange-500"
                          : "border-transparent"
                      } text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
                      onClick={() => handleNavigate(option.path)}
                    >
                      {option.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff&crop=faces&dpr=1&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userOptions.map((option) => (
                        <Menu.Item key={option.id}>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                              onClick={() => option.function(option.path)}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {headerOptions.map((option) => (
                <Disclosure.Button
                  key={option.id}
                  as="a"
                  onClick={() => handleNavigate(option.path)}
                  className={`${
                    currentPath === option.path
                      ? "bg-orange-50 border-orange-500  text-orange-700"
                      : "border-transparent"
                  }   block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer`}
                >
                  {option.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff&crop=faces&dpr=1&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.username}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {userOptions.map((option) => (
                  <Disclosure.Button
                    key={option.id}
                    as="a"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => option.function(option.path)}
                  >
                    {option.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
