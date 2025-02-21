import axios from "axios";
import { API_URL } from "./api";
import { logout } from "../base/redux/auth";



import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const useApiRequest = () => {
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.auth.token)
    const makeURL = function(URL) {
        return API_URL + "/" + URL;
    };
    
    const makePutURL = function(URL, id) {
        return API_URL + "/" + URL + "/" + id ;
    };

    const handleError = (error) => {
        if (error.response && error.response.status === 401) {
            // console.warn("401 Unauthorized - Logging out...");
            
            // // Clear token from localStorage
            // localStorage.removeItem("authToken");
            
            dispatch(logout())
            // Redirect to login
            window.location.href = "/login";
        }
        
    };

     const postApi = async (URL,data, successFn, errorFn) => {
        axios({
            method: "post",
            url: makeURL(URL),
            data : data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                let data = response.data;
                successFn(data);
            })
            .catch(function (error) {
                handleError(error);
                errorFn(error);
            });
    };
    const getApi = async function (URL,params, successFn, errorFn) {

        axios({
            method: "get",
            url: makeURL(URL),
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: params,
        })
            .then(function (response) {
                let data = response.data;
                successFn(data);
            })
            .catch(function (error) {
                handleError(error);
                errorFn(error);
            });
    };

    const putApi = async function (URL,id,data, successFn, errorFn) {

        axios({
            method: "put",
            url: makePutURL(URL, id),
            data: data,
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
            .then(function (response) {
                let data = response.data;
                successFn(data);
            })
            .catch(function (error) {
                handleError(error);
                errorFn(error);
            });
    };

    const deleteApi = async (URL, id, successFn, errorFn) => {
        axios({
            method : "delete",
            url : makePutURL(URL, id),
            headers: {
                Authorization: `Bearer ${token}` // Fetch token from storage
            }
        })
        .then(function (response) {
            let data = response.data;
            successFn(data);
        })
        .catch(function (error) {
            handleError(error);
            errorFn(error);
        });
      };

    const uploadApi = async (URL, id, file, successFn, errorFn) => {
        try {
            const formData = new FormData();
            formData.append("file", file); // Attach file
    
            const response = await axios.post(`${URL}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            successFn(response.data);
        } catch (error) {
            errorFn(error);
        }
    };
    
    

  return {getApi, postApi, putApi, deleteApi, uploadApi}
}

export default useApiRequest









 

export const getApiForPermission = async function ( successFn, errorFn) {

    axios({
        method: "get",
        url: API_URL + "/permission/-OC_5OqmmO4eGTvFWLJJ.json",
        // headers: {
        //     ...authHeaders,
        // },
        // cancelToken: cancelToken?.token
    })
        .then(function (response) {
            let data = response.data;
            successFn(data);
        })
        .catch(function (error) {
            // handleErrorResponse(error);
            errorFn(error);
        });
};

export const putApiForPermission = async function ( data, successFn, errorFn) {

    axios({
        method: "put",
        url: API_URL + "/permission/-OC_5OqmmO4eGTvFWLJJ.json",
        data : data,
        // headers: {
        //     ...authHeaders,
        // },
        // cancelToken: cancelToken?.token
    })
        .then(function (response) {
            let data = response.data;
            successFn(data);
        })
        .catch(function (error) {
            // handleErrorResponse(error);
            errorFn(error);
        });
};



export const performLogout =  (dispatch) => {
    // localStorage.removeItem('authUser'); // Clear localStorage
    console.log("fun is called")
    dispatch(logout()); // Clear Redux state
    console.log("User logged out.");
};