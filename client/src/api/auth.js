import {basePath,apiVersion} from "./config";
import { ACCES_TOKEN, REFRESH_TOKEN} from "../utils/constant";
import jwtDecode from "jwt-decode";


export function getAccesToken()
{ 
    const accessToken= localStorage.getItem(ACCES_TOKEN);

    if(!accessToken ||accessToken==="null")
    {
        return null;

    }
   return  willExpireToken(accessToken) ? null : accessToken;
    
}
export function getRefreshToken()
{
    const refreshToken= localStorage.getItem(REFRESH_TOKEN);
    if(!refreshToken ||refreshToken==="null")
    {
        return null;

    }
   return  willExpireToken(refreshToken) ? null : refreshToken;
    
}

function willExpireToken(token)
{
    const seconds=60;
    const metaToken=jwtDecode(token);
    const {exp}=metaToken;
    const now =(Date.now()+seconds) /1000;
    return now > exp;
    
    
}