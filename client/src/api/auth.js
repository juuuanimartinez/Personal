import {basePath,apiVersion} from "./config";
import { ACCES_TOKEN, REFRESH_TOKEN} from "../utils/constant";
import jwtDecode from "jwt-decode";
import{notification} from "antd";


export function getAccessTokenApi()
{ 
    const accessToken= localStorage.getItem(ACCES_TOKEN);

    if(!accessToken ||accessToken==="null")
    {
        return null;

    }
   return  willExpireToken(accessToken) ? null : accessToken;
    
}
export function getRefreshTokenApi()
{
    const refreshToken= localStorage.getItem(REFRESH_TOKEN);
    
    if(!refreshToken ||refreshToken==="null")
    {
        return null;

    }
   return  willExpireToken(refreshToken) ? null : refreshToken;
    
}

export function refreshAccessTokenApi(refreshToken) {
    const url = `${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj = {
      refreshToken: refreshToken
    };
    const params = {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    fetch(url, params)
      .then(response => {
        if (response.status !== 200) {
          return null;
        }
        return response.json();
      })
      .then(result => {
        if (!result) {
          logout();
        } else {
          const { accessToken, refreshToken } = result;
          localStorage.setItem(ACCES_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
      });
  }
  
export function logout ()
 {  
    notification["success"]({
        message: "Deslogueo correcto"
      });
     localStorage.removeItem(ACCES_TOKEN);
     localStorage.removeItem(REFRESH_TOKEN);
 }

function willExpireToken(token)
{
    
    const seconds=60;
    const metaToken=jwtDecode(token);
    const {exp}=metaToken;
    const now =(Date.now()+seconds) /1000;
    return now > exp;
    
    
}