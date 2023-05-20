import axios from "axios";
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
  } from '../constants/orderConstants'
import { logout } from './userActions'
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const getOrdersListForAdmin = () => async (
    dispatch, getState
    ) => {
      try {
  
        const {
          userLogin: { userInfo },
        } = getState()
        let token;
        if(userInfo) {
          token=userInfo.korisnik.token
        }
        else {token = ""}
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        dispatch({ type: ORDER_LIST_REQUEST})
        const { data } = await axios.get(
          `/api/orders/all/admin`,
          config
        )
  
        dispatch({
          type: ORDER_LIST_SUCCESS,
          payload: data,
        })
      
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Samo korisnik sa ulogom admina moze pristupiti ovom resursu"|| message == "Morate biti ulogovani da bi ste pristupili ovom resursu!"||"Neispravan token! Pokusajte ponovo!") {
          setTimeout(function () {
            dispatch(logout())
        }, 1500)
  
        }
        dispatch({
          type: ORDER_LIST_FAIL,
          payload: message,
        })
      }
    }
    export const deleteOrder = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ORDER_DELETE_REQUEST,
        })
        const {
          userLogin: { userInfo },
        } = getState()
        let token;
        if(userInfo) {
          token=userInfo.korisnik.token
        }
        else {token = ""}
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    
        await axios.delete(`/api/orders/${id}`,config)
    
        dispatch({ type: ORDER_DELETE_SUCCESS })
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            if (message === "Samo korisnik sa ulogom admina moze pristupiti ovom resursu"|| message == "Morate biti ulogovani da bi ste pristupili ovom resursu!"||"Neispravan token! Pokusajte ponovo!") {
              setTimeout(function () {
                dispatch(logout())
            }, 1500)
            }
        dispatch({
          type: ORDER_DELETE_FAIL,
          payload: message,
        })
      }
    }

    export const getOrderDetails = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ORDER_DETAILS_REQUEST,
        })
    
        const {
          userLogin: { userInfo },
        } = getState()
        let token;
        if(userInfo) {
          token=userInfo.korisnik.token
        }
        else {token = ""}
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        console.log(config)
        const { data } = await axios.get(`/api/orders/${id}`, config)
    
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: data,
        })
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            if (message === "Samo korisnik sa ulogom admina moze pristupiti ovom resursu"|| message == "Morate biti ulogovani da bi ste pristupili ovom resursu!"||"Neispravan token! Pokusajte ponovo!") {
              setTimeout(function () {
                dispatch(logout())
            }, 1500)
            }
        dispatch({
          type: ORDER_DETAILS_FAIL,
          payload: message,
        })
      }
    }

    export const getMyOrders = () => async (
      dispatch, getState
      ) => {
        try {
    
          const {
            userLogin: { userInfo },
          } = getState()
          let token;
          if(userInfo) {
            token=userInfo.korisnik.token
          }
          else {token = ""}
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          dispatch({ type: MY_ORDERS_REQUEST})
          const { data } = await axios.get(
            `/api/orders/`,
            config
          )
    
          dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data,
          })
        
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === "Samo korisnik sa ulogom admina moze pristupiti ovom resursu"|| message == "Morate biti ulogovani da bi ste pristupili ovom resursu!"||"Neispravan token! Pokusajte ponovo!") {
            setTimeout(function () {
              dispatch(logout())
          }, 1500)
    
          }
          dispatch({
            type: MY_ORDERS_FAIL,
            payload: message,
          })
        }
      }

      export const createOrder = (stavkePorudzbine,nacin_placanja) => async (dispatch, getState) => {
        try {
          dispatch({
            type: ORDER_CREATE_REQUEST,
          })
          const {
            userLogin: { userInfo },
          } = getState()
          let token;
          if(userInfo) {
            token=userInfo.korisnik.token
          }
          else {token = ""}
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          const order = {stavkePorudzbine}
          console.log(stavkePorudzbine)
          const { data } = await axios.post(`/api/orders`, {stavkePorudzbine,nacin_placanja}, config)
      
          dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
          })
          console.log(order)
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === "Samo korisnik sa ulogom admina moze pristupiti ovom resursu"|| message == "Morate biti ulogovani da bi ste pristupili ovom resursu!"||"Neispravan token! Pokusajte ponovo!") {
            setTimeout(function () {
              //dispatch(logout())
          }, 1500)
    
          }
          dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
          })
        }
      }