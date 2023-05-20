import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_RESET
  } from '../constants/reviewConstants'

export const reviewListReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case REVIEW_LIST_REQUEST:
        return { loading: true, reviews: [] }
      case REVIEW_LIST_SUCCESS:
        return {
          loading: false,
          reviews: action.payload
        }
      case REVIEW_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const CreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_REVIEW_REQUEST:
        return { loading: true }
      case CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case CREATE_REVIEW_FAIL:
        return { loading: false, errorReviews: action.payload }
      case CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
}