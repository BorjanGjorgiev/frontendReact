import { mdiToaster } from "@mdi/js";
import { message } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {UserProfile} from "../components/reusable/UserProfile";
import {login} from "../api/Login/login";
import {registerUser} from "../api/Login/Register/register";




type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsReady(true);
  }, []);

  const registerUserHandler=async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string

  ) => {
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    
      try {
        await registerUser({ firstName, lastName, email, password });
    
        message.success("Registration successful. Please log in.");
        navigate("/login");
    
      } catch (err) {
        console.error("Registration error:", err);
        message.error("Registration failed.");
      }
  };

  const logInUserHandler= async(
    email: string,
  password: string,
  )=> 
  {
    try
    {
        const res= await login({email,password});

        if (res?.token) {
            localStorage.setItem("token", res.token);
    
            const userObj = {
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.login,
            };
    
            localStorage.setItem("user", JSON.stringify(userObj));
    
            setToken(res.token);
            setUser(userObj);
    
            message.success("Registration Success!");
    
            navigate("/api/auth/login");
          }
        } catch (err) {
          console.error("Registration error:", err);
          alert("Registration failed.");
        }
    }
    const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };
  return (
    <UserContext.Provider
    value={{loginUser:logInUserHandler,user,token,logout,isLoggedIn,registerUser:registerUserHandler}}>
        {isReady ? children:null}
    </UserContext.Provider>
  );
  };
export const useAuth = () => React.useContext(UserContext);

