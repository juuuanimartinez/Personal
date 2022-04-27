import React ,{useState,useEffect,createContext} from "react";
import { getAccesToken,getRefreshToken,refreshAccessToken } from "../api/auth";

export const AuthContext= createContext();
export default function AuthProvider(props)
{
    const {children}=props;
    const [user,setUser]=useState({
        user:null,
        isLoading:true,

    });
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>

}