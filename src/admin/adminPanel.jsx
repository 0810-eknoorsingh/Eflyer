import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageSrc: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const API_URL = "http://localhost:3001/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.get(API_URL);
      const products = response.data;
      const highestId = products.reduce(
        (max, product) => Math.max(max, parseInt(product.id, 10)),
        0
      );

      const newProductWithId = {
        ...newProduct,
        id: (highestId + 1).toString(),
      };

      const addResponse = await axios.post(API_URL, newProductWithId);
      setProducts([...products, addResponse.data]);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        imageSrc: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedProduct.id}`,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? response.data : product
        )
      );
      setEditProduct(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateProduct = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (!editProduct.name || !editProduct.price || !editProduct.category) {
      alert("Please fill out all fields.");
      return;
    }
    updateProduct(editProduct);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="admin-panel">
        <h1 className="admin-title">
          <b>ADMIN PANEL</b>
        </h1>

        <div className="add-product-form">
          <h2>
            <u>ADD NEW PRODUCT</u>
          </h2>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            placeholder="Product Name"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            placeholder="Price"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            placeholder="Category"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="imageSrc"
            value={newProduct.imageSrc}
            placeholder="Image URL"
            onChange={handleInputChange}
            className="input-field"
          />
          <button onClick={addProduct} className="add-btn">
            Add Product
          </button>
        </div>

        <div className="product-list">
          <h2><b><u>Product List</u></b></h2>
          {products.length === 0 ? (
            <p>No products available. Please add some products.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p style={{color: "green"}}>Price: ${product.price}</p>
                  <p>
                    Category: <b>{product.category}</b>
                  </p>
                </div>
                <div className="product-actions">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="update-btn"
                  >
                    Update Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <Modal
            title="Edit Product"
            onClose={() => setModalOpen(false)}
            onSave={handleSaveUpdate}
          >
            <input
              type="text"
              name="name"
              value={editProduct.name}
              placeholder="Product Name"
              onChange={handleEditChange}
              className="input-field"
            />
            <input
              type="number"
              name="price"
              value={editProduct.price}
              placeholder="Price"
              onChange={handleEditChange}
              className="input-field"
            />
            <input
              type="text"
              name="category"
              value={editProduct.category}
              placeholder="Category"
              onChange={handleEditChange}
              className="input-field"
            />
            <input
              type="text"
              name="imageSrc"
              value={editProduct.imageSrc}
              placeholder="Image URL"
              onChange={handleEditChange}
              className="input-field"
            />
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
