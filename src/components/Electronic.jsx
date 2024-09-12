import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Electronic.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Electronics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data.filter(product => product.category === "Tech"));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const groupedProducts = products.reduce((acc, product, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(product);
    return acc;
  }, []);

  return (
    <div className="container my-5 position-relative">
      <h2
        className="text-center mb-4"
        style={{ marginTop: "2rem", fontWeight: "bold", fontSize: "xxx-large" }}
      >
        Electronics
      </h2>

      <Carousel
        id="electronicsCarousel"
        activeIndex={activeIndex}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
      >
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="row">
              {group.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center"
                >
                  <div className="card p-3 shadow" style={{ width: "18rem" }}>
                    <img
                      src={product.imageSrc}
                      className="card-img-top"
                      alt={product.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="card-body">
                      <b><h4 className="card-title">{product.name}</h4></b>
                      <p className="text-danger">Price $ {product.price}</p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-transparent">Buy Now</button>
                        <button className="btn btn-colored">See More</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="carousel-indicator-buttons d-flex justify-content-between mt-4">
        <button
          className="custom-carousel-btn"
          onClick={() =>
            setActiveIndex((prevIndex) =>
              prevIndex === 0 ? groupedProducts.length - 1 : prevIndex - 1
            )
          }
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <button
          className="custom-carousel-btn"
          onClick={() =>
            setActiveIndex((prevIndex) =>
              prevIndex === groupedProducts.length - 1 ? 0 : prevIndex + 1
            )
          }
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Electronics;
