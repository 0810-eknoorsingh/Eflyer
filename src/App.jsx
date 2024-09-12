import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/Products";
import Electronics from "./components/Electronic";
import Jewellery from "./components/Jewellery";
import Footer from "./components/Footer";
import AdminPanel from "./admin/adminPanel";



function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  
  const addProduct = async (product) => {
    try {
      const response = await axios.post("http://localhost:3001/products", product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  
  const updateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:3001/products/${updatedProduct.id}`, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Router>
      <div>
        <AppContent
          products={products}
          addProduct={addProduct}
          deleteProduct={deleteProduct}
          updateProduct={updateProduct}
        />
      </div>
    </Router>
  );
}

const AppContent = ({ products, addProduct, deleteProduct, updateProduct }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/adminPanel";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


              <ProductList products={products} />
              <Electronics products={products} />
              <Jewellery products={products} />
              <Footer />
            </>
          }
        />

        <Route
          path="/adminPanel"
          element={
            <AdminPanel
              products={products}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
