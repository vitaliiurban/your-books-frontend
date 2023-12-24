import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { signInUser } from "../../redux/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
export default function SignIn() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { setUser } = useStateContext();
  const user = useSelector((state) => state.authentication);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleEmailChange = (e) => {
    if (error) setError(false);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (error) setError(false);
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }
    await dispatch(signInUser({ email, password }));
    setShow(true);
  };
  // console.log(user.data);
  useEffect(() => {
    if (user.data?.token) {
      setUser(user.data);
    }
  }, [user.data, setUser]);
  const handleGotoSignUp = () => {
    navigateTo("/sign-up");
  };
  console.log(user);
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/public/your-books.svg"
            alt="your-books-logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to <span className="text-orange-600">Your Books</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            it will take you less than a minute
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                      error && !email ? "border-red-300" : ""
                    }`}
                    onChange={handleEmailChange}
                  />
                </div>
                <p
                  className={`mt-2 text-sm text-red-600 ${
                    error && !email ? "" : "hidden"
                  }`}
                  id="email-error"
                >
                  Please fill out this field.
                </p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                      error && !password ? "border-red-300" : ""
                    }`}
                    onChange={handlePasswordChange}
                  />
                </div>
                <p
                  className={`mt-2 text-sm text-red-600 ${
                    error && !password ? "" : "hidden"
                  }`}
                  id="password-error"
                >
                  Please fill out this field.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  onClick={handleGotoSignUp}
                >
                  Go to sign up
                </button>
              </div>
            </form>
            <Notification
              show={show}
              setShow={setShow}
              title={
                user?.data?.error ? "there is some problem" : "successfully!"
              }
              body={
                user?.data?.error
                  ? user.data.error
                  : "you will be redirected to home page"
              }
              error={user?.data?.error ? true : false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
