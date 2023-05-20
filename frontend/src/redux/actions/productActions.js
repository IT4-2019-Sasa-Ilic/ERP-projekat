import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,    PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_FOR_ADMIN_REQUEST,
  PRODUCT_LIST_FOR_ADMIN_SUCCESS,
  PRODUCT_LIST_FOR_ADMIN_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants'

import { logout } from './userActions'

export const listProducts = (cena,pageNumber,ratingsFromFilter,categoriesFromFilter,sortOption,searchQuery) => async (
    dispatch
  ) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
        console.log(ratingsFromFilter)
        let ratings = "";
        let categories = "";
        {Object.keys(ratingsFromFilter).map((key, idx) => {
                if(ratingsFromFilter[key]==true){
                    ratings = ratings + "," + key
                }
              })
            }

        {Object.keys(categoriesFromFilter).map((key, idx) => {
                if(categoriesFromFilter[key]==true){
                    categories = categories + "," + key
                }
              })
        }
        console.log(categoriesFromFilter)
        

          const {data} = await axios.get(
            `/api/products/?pageNumber=${pageNumber}&cena=${cena}&rejting=${ratings}&kategorije=${categories}&sort=${sortOption}&searchQuery=${searchQuery}` )
            dispatch({
              type: PRODUCT_LIST_SUCCESS,
              payload: data,
            })
        
       
  
     
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST })
      console.log(id)
      const { data } = await axios.get(`/api/products/product/${id}`)
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getProductsListForAdmin = () => async (
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
        dispatch({ type: PRODUCT_LIST_FOR_ADMIN_REQUEST})
        const { data } = await axios.get(
          `/api/products/admin`,
          config
        )
  
        dispatch({
          type: PRODUCT_LIST_FOR_ADMIN_SUCCESS,
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
          type: PRODUCT_LIST_FOR_ADMIN_FAIL,
          payload: message,
        })
      }
    }
    export const deleteProduct = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: PRODUCT_DELETE_REQUEST,
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
    
        await axios.delete(`/api/products/admin/${id}`,config)
    
        dispatch({ type: PRODUCT_DELETE_SUCCESS })
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
          type: PRODUCT_DELETE_FAIL,
          payload: message,
        })
      }
    }

    export const createProduct = (id,naziv_proizvoda,opis_proizvoda,naziv_kategorije,kolicina,cena,prosecna_ocena=0) => async (dispatch, getState) => {
      try {
        dispatch({
          type: PRODUCT_CREATE_REQUEST,
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
    
        const { data } = await axios.post(`/api/products/admin`, {id,naziv_proizvoda,opis_proizvoda,naziv_kategorije,kolicina,cena,prosecna_ocena}, config)
    
        dispatch({
          type: PRODUCT_CREATE_SUCCESS,
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
          type: PRODUCT_CREATE_FAIL,
          payload: message,
        })
      }
    }
    export const updateProduct = (id,naziv_proizvoda,opis_proizvoda="",naziv_kategorije="",kolicina="",cena="") => async (dispatch, getState) => {
      try {
        dispatch({
          type: PRODUCT_UPDATE_REQUEST,
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
    console.log(naziv_kategorije)
    
        const { data } = await axios.put(
          `/api/products/admin/${id}`,
          {id,naziv_proizvoda,opis_proizvoda,naziv_kategorije,kolicina,cena},
          config
        )
    
        dispatch({
          type: PRODUCT_UPDATE_SUCCESS,
          payload: data,
        })
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
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
          type: PRODUCT_CREATE_FAIL,
          payload: message,
        })
      }
    }