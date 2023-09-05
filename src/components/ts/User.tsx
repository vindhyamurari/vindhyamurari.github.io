import React, { useEffect, useState } from "react";
import { getUserData } from "../../services/userService";
import Loader from "./Loader";
import "../scss/User.scss";
import reload from "../../assests/reload.png";
import user from "../../assests/user.png";
import email from "../../assests/mail.png";

interface UserResponseInterface {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const fetchUserDetails = (): void => {
    setIsLoading(true);
    try {
      getUserData()
        .then((response: UserResponseInterface) => {
          const newUserData = {
            title: response?.name?.title,
            firstName: response?.name?.first,
            lastName: response?.name?.last,
            email: response?.email,
          };
          localStorage.setItem("userData", JSON.stringify(newUserData));
          setUserData(newUserData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchUserDetails();
  };

  useEffect(() => {
    const storedUserData: string | null = localStorage.getItem("userData");
    if (storedUserData !== null) {
      setUserData(JSON.parse(storedUserData));
    } else {
      fetchUserDetails();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="user-data-screen">
          <div className="user-data">
            <div className="user-name-box">
              <div>
                <img
                  className="username-img"
                  src={user}
                  alt="Username"
                  loading="lazy"
                />
              </div>
              <div className="user-name">
                {`${userData?.title} ${userData?.firstName} ${userData?.lastName}`}
              </div>
            </div>
            <div className="user-email-box">
              <div>
                <img
                  className="email-img"
                  src={email}
                  alt="email"
                  loading="lazy"
                />
              </div>
              <div className="user-email">{userData?.email}</div>
            </div>
          </div>
          <div className="refresh-container">
            <span className="refresh-button" onClick={handleRefresh}>
              <img
                className="refresh-img"
                src={reload}
                alt="refresh"
                loading="lazy"
              />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
