import {legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
    productListForAdminReducer,
    productListReducer,
    productUpdateReducer
  } from './redux/reducers/productReducers'
import { categoryCreateReducer, categoryDeleteReducer, categoryListReducer } from './redux/reducers/categoryReducers'
import { userListReducer,userDeleteReducer, userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userDetailsForAdminReducer, userUpdateByAdminReducer } from './redux/reducers/userReducers'
import { cartReducer } from './redux/reducers/cartReducers'
import { myOrdersList, orderDeleteReducer, orderDetailsReducer, ordersListForAdminReducer } from './redux/reducers/orderReducers'
import { CreateReviewReducer, reviewListReducer } from './redux/reducers/reviewReducer'
import { orderCreateReducer } from './redux/reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    categories:categoryListReducer,
    product:productDetailsReducer,
    users:userListReducer,
    userDelete: userDeleteReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    productListForAdmin:productListForAdminReducer,
    productDelete: productDeleteReducer,
    ordersList:ordersListForAdminReducer,
    orderDelete:orderDeleteReducer,
    reviews:reviewListReducer,
    createReview:CreateReviewReducer,
    userDetailsForAdmin:userDetailsForAdminReducer,
    userUpdate:userUpdateByAdminReducer,
    productCreate:productCreateReducer,
    categoryCreate:categoryCreateReducer,
    categoryDelete:categoryDeleteReducer,
    productUpdate:productUpdateReducer,
    orderDetails: orderDetailsReducer,
    myOrders:myOrdersList,
    createOrder:orderCreateReducer
  })
  
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : []

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart:{cartItems:cartItemsFromStorage,paymentMethod:paymentMethodFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },

}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store