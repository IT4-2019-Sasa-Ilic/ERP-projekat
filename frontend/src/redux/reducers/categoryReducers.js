import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    CREATE_CATEGORY_RESET,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST
  } from '../constants/categoryConstants'

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { loading: true, categories: [] }
      case CATEGORY_LIST_SUCCESS:
        return {
          loading: false,
          categories: action.payload
        }
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CATEGORY_REQUEST:
        return { loading: true }
      case CREATE_CATEGORY_SUCCESS:
        return { loading: false, success: true, category: action.payload,id:action.payload._id}
      case CREATE_CATEGORY_FAIL:
        return { loading: false, error: action.payload }
      case CREATE_CATEGORY_RESET:
        return {}
      default:
        return state
    }
  }

  export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_CATEGORY_REQUEST:
        return { loading: true }
      case DELETE_CATEGORY_SUCCESS:
        return { loading: false, success: true }
      case DELETE_CATEGORY_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }