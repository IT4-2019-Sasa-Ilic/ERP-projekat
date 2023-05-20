import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
// protected admin pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";

import ScrollToTop from "./utils/utils";
import ShippingScreen from "./pages/user/ShipingScreen";
import OrderSuccessPage from "./pages/user/OrderSuccesPage";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-list/" element={<ProductListPage />} />
        <Route path="/product-list/:category" element={<ProductListPage />} />
        <Route path="/product-list/search/:searchQuery" element={<ProductListPage />} />
        <Route path="/product-details" element={<ProductDetailsPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart/:id?" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element="Page not exists 404" />
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/my-orders" element={<UserOrdersPage />} />
          <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route
            path="/user/order-details/:id"
            element={<UserOrderDetailsPage />}
          />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user/" element={<AdminEditUserPage />} />
          <Route path="/admin/edit-user/:id" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product/:id"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailsPage />}
          />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;