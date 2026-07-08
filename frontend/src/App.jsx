import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
                        <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
                        <Route path="/admin/products" element={<PrivateRoute adminOnly><AdminProducts /></PrivateRoute>} />
                        <Route path="/admin/products/create" element={<PrivateRoute adminOnly><AdminProductForm /></PrivateRoute>} />
                        <Route path="/admin/products/edit/:id" element={<PrivateRoute adminOnly><AdminProductForm /></PrivateRoute>} />
                        <Route path="/admin/orders" element={<PrivateRoute adminOnly><AdminOrders /></PrivateRoute>} />
                    </Routes>
                    <Footer />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;