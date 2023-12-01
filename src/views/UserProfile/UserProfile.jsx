import React from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
export default function UserProfile() {
  const { user } = useStateContext();
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-center flex-col items-center">
      <p className="text-3xl font-bold">
        it's a user{" "}
        <span className={"text-orange-600 font-bold"}> profile </span>
      </p>
      <p className="text-xl my-10">
        for now you can
        <span className={"text-orange-600 font-bold"}> see </span> here your
        name and email
      </p>
      <p className="text-lg font-bold my-2">
        your name:{" "}
        <span className={"text-orange-600 font-bold"}>{user?.username} </span>{" "}
      </p>
      <p className="text-lg font-bold my-2">
        your email:{" "}
        <span className={"text-orange-600 font-bold"}>{user?.email} </span>{" "}
      </p>
    </div>
  );
}
