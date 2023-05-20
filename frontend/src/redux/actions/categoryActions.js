import axios from 'axios'
import {
CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL
} from '../constants/categoryConstants'
import { logout } from './userActions'

export const getCategories = () => async (
    dispatch
  ) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST})
      const { data } = await axios.get(
        `/api/categories/`
      )
  
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type:  CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const createCategory = (naziv_kategorije) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_CATEGORY_REQUEST,
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
  
      const { data } = await axios.post(`/api/categories/`, {naziv_kategorije}, config)
  
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: data,
      })
    }  catch (error) {
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
        type: CREATE_CATEGORY_FAIL,
        payload: message,
      })
    }
  }

  export const deleteCategory = (naziv) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_CATEGORY_REQUEST,
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
      await axios.delete(`/api/categories/${naziv}`,config)
  
      dispatch({ type: DELETE_CATEGORY_SUCCESS })
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
        type: DELETE_CATEGORY_FAIL,
        payload: message,
      })
    }
  }