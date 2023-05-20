import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const uploadImagesApiRequest = ( images,id) => async (
    dispatch,getState
    ) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  console.log(id)
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
  const { data } = await axios.post("/api/products/admin/upload-image?id=" + id, formData,config);
  return data;
};

export const deleteImagesApiRequest = (imagePath, id) => async (
  dispatch,getState
  ) => {
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
let encoded = encodeURIComponent(imagePath)

const { data } = await axios.delete(`/api/products/admin/image/${encoded}/${id}`,config);
return data;
};

export const markAsDeliveredOrder = (id) => async (
  dispatch,getState
  ) => {
const {
  userLogin: { userInfo },
} = getState()
let token;
if(userInfo) {
  token=userInfo.korisnik.token
}
else {token = ""}
console.log(token)
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  }
}
console.log(config)

const { data } = await axios.put(`/api/orders/delivered/${id}`,{},config);
return data;
};

export const getBestsellersProducts = async () => {
  const { data } = await axios.get("/api/products/best-sellers");
  return data;
}

