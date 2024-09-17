import React, { useState, useEffect } from "react";
import "../styles/Products.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Products = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fashionProducts, setFashionProducts] = useState([]);
  const [productsPerSlide, setProductsPerSlide] = useState(3); 

  useEffect(() => {
    setFashionProducts(
      products.filter((product) => product.category === "Fashion")
    );
  }, [products]);

  useEffect(() => {
    
    const updateProductsPerSlide = () => {
      if (window.innerWidth <= 767) {
        setProductsPerSlide(1); 
      } else if (window.innerWidth <= 991) {
        setProductsPerSlide(2); 
      } else {
        setProductsPerSlide(3); 
      }
    };
    window.addEventListener("resize", updateProductsPerSlide);
    updateProductsPerSlide();
    return () => window.removeEventListener("resize", updateProductsPerSlide);
  }, []);

  const groupedProducts = fashionProducts.reduce((acc, product, index) => {
    const groupIndex = Math.floor(index / productsPerSlide);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(product);
    return acc;
  }, []);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="container my-5 position-relative">
      <h2
        className="text-center mb-4"
        style={{ marginTop: "2rem", fontWeight: "bold", fontSize: "xxx-large" }}
      >
        Fashion
      </h2>

      <Carousel
        id="productCarousel"
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
                  className={`col-lg-${12 / productsPerSlide} col-md-${12 / productsPerSlide} mb-4 d-flex justify-content-center`}
                >
                  <div className="card p-3 shadow" style={{ width: "18rem" }}>
                    <img
                      src={product.imageSrc}
                      className="card-img-top"
                      alt={product.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
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

export default Products;
