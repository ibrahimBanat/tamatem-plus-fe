import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Layout from './components/Layout';
import Products from "./components/Products";
import ProductsView from "./components/ProductsView";
import Login from "./components/Login";
import {useEffect} from "react";
import {AuthProvider, useAuth} from "./context/authContext";
function App() {
  return (
      <AuthProvider>
          <div className={'app'}>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route exact index element={<Home />} />
                      <Route path="products" element={<Products />} />
                      <Route path="products/:id" element={<ProductsView />} />
                      <Route path="login" element={<Login />} />
                  </Route>
              </Routes>
          </div>
      </AuthProvider>

  );
}

export default App;
