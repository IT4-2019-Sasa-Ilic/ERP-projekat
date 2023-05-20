import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/product/${id}`)
  
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
          proizvod_id: data._id,
          naziv_proizvoda: data.naziv_proizvoda,
          slika: data.slike[0].url,
          cena: data.cena,
          quantity: data.kolicina,
          kolicina:quantity,
        },
      })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
  export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

  export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    })
    
    console.log(data)
  
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }