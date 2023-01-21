import {  get_data_failure, get_data_request, get_data_success } from "./data.action"
import axios from "axios";

export const dataapi = (params)=>async (dispatch)=>{

    // Get the token from the local storage
    let token = window.localStorage.getItem("token");
    console.log(token,"local token")

           axios
            .get(`https://api.spotify.com/v1/search?q=rock&type=${params}`,{
            headers: {
                 Authorization: `Bearer ${token}`,
            //   Content-Type: 'application/json',
            },
        })
    .then((res)=>{
        console.log(res.data.tracks,"redsponse data")
        dispatch(dispatch(get_data_success(res.data.tracks.items)))
    })
    .catch((err)=>{
        dispatch(get_data_failure())
        console.log(err)
    })

        
    
  
   

}