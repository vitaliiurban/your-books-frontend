import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input.jsx";
import {
  deleteUser,
  updateUser,
  updateUserPass,
} from "../../redux/slices/userSlice.js";
import Notification from "../../components/Notification/Notification.jsx";

import PrimaryButton from "../../components/Buttons/PrimaryButton.jsx";
import SecondaryButton from "../../components/Buttons/SecondaryButton.jsx";

export default function UserSettings() {
  const dispatch = useDispatch();
  const { user, setUser } = useStateContext();
  const [errorUE, setErrorUE] = useState(false);
  const [errorP, setErrorP] = useState(false);
  const [showEU, setShowEU] = useState(false);
  const [showP, setShowP] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const userState = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const handleNameChange = (e) => {
    if (errorUE) setErrorUE(false);
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    if (errorUE) setErrorUE(false);
    setEmail(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    if (errorP) setErrorP(false);
    setOldPassword(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (errorP) setErrorP(false);
    setPassword(e.target.value);
  };
  const handleNameAndEmailSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) {
      setErrorUE(true);
      return;
    }
    // setName(e.target.value);
    dispatch(updateUser({ id: user.id, username, email }));
    setUser({ ...user, username, email });
    setShowEU(true);
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !password) {
      setErrorP(true);
      return;
    }
    await dispatch(updateUserPass({ id: user.id, oldPassword, password }));

    setShowP(true);
  };
  const handleUserDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser({ id: user.id }));
    window.location.reload();
    localStorage.removeItem("ACCESS_USER");
  };
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-center flex-col items-center">
      <p className="text-3xl font-bold">
        it's a user{" "}
        <span className={"text-orange-600 font-bold"}> settings </span>
      </p>
      <p className="text-xl my-10">
        for now you can{" "}
        <span className={"text-orange-600 font-bold"}> edit </span> here your
        name and email
      </p>
      <div className="flex justify-center flex-col items-center">
        <div className="my-5 flex flex-col gap-5">
          <Input
            label={"username"}
            error={errorUE}
            element={username}
            handleElementChange={handleNameChange}
          />
          <Input
            label={"email"}
            error={errorUE}
            element={email}
            handleElementChange={handleEmailChange}
          />
        </div>
        <PrimaryButton
          label={"submit"}
          handleClick={handleNameAndEmailSubmit}
        />
      </div>
      <Notification
        show={showEU}
        setShow={setShowEU}
        title={"successfully changed"}
        body={"go to user page to see changes"}
      />
      <p className="text-xl my-10">
        also you could
        <span className={"text-orange-600 font-bold"}> change </span> your
        password here
      </p>
      <div className="flex justify-center flex-col items-center">
        <div className="my-5 flex  gap-5">
          <Input
            label={"old password"}
            error={errorP}
            element={oldPassword}
            handleElementChange={handleOldPasswordChange}
          />
          <Input
            label={"new password"}
            error={errorP}
            element={password}
            handleElementChange={handlePasswordChange}
          />
        </div>
        <PrimaryButton label={"submit"} handleClick={handlePasswordSubmit} />
        <Notification
          show={showP}
          setShow={setShowP}
          title={
            userState?.data?.error
              ? "there is some problem"
              : "successfully changed"
          }
          body={
            userState?.data?.error
              ? userState.data.error
              : "now you have a new pass!"
          }
          error={userState?.data?.error ? true : false}
        />
      </div>
      <p className="text-xl my-10">
        also you could
        <span className={"text-orange-600 font-bold"}> delete </span> your
        account here
      </p>
      <SecondaryButton
        label={"delete my account"}
        handleClick={handleUserDelete}
      />
    </div>
  );
}

{
  /* <div>
        {Array.from({ length: 3000 }).map((_, index) => (
          <div key={index}>{uuidv1().substring(0, 8)}</div>
        ))}
        import { v1 as uuidv1 } from "uuid";
      </div> */
}
//      <Notification show={show} setShow={setShow} />
