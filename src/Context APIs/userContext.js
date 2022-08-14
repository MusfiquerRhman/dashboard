import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const localData = localStorage.getItem("userInformations");
  const [UserToken, setUserToken] = useState(
    localData === null ? "" : JSON.parse(localData).access_token
  );
  const [fullName, setFullName] = useState(
    localData === null ? "" : JSON.parse(localData).user_info.fullname
  );
  const [email, setEmail] = useState(
    localData === null ? "" : JSON.parse(localData).user_info.email
  );
  const [phone, setPhone] = useState(
    localData === null ? "" : JSON.parse(localData).user_info.phone
  );
  const [zip, setZip] = useState(
    localData === null ? "" : JSON.parse(localData).user_info.zip
  );
  const [user_status, setUser_status] = useState(
    localData === null ? false : JSON.parse(localData).user_info.admin_status
  );

  return (
    <UserContext.Provider
      value={{
        UserToken,
        setUserToken,
        fullName,
        setFullName,
        email,
        setEmail,
        phone,
        setPhone,
        zip,
        setZip,
        user_status,
        setUser_status,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
