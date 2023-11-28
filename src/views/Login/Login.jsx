import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../redux/authSlice.jsx";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function Login() {
  const dispatch = useDispatch();
  const { setUser } = useStateContext();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const submitButton = () => {
    console.log("Form submited");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (auth.user) {
      setUser(auth.user);
    }
  }, [auth.user, setUser]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleUsername} placeholder="Login" />
        <input
          type="password"
          onChange={handlePassword}
          placeholder="Password"
        />
        <button type="submit" onClick={submitButton}>
          Log in
        </button>
      </form>
    </div>
  );
}
