import React, { useState, useEffect } from "react";
import "../styles/Jewellery.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Jewellery = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [jewelleryProducts, setJewelleryProducts] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(3); 

  useEffect(() => {
    setJewelleryProducts(
      products.filter((product) => product.category === "Jewel")
    );
  }, [products]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setItemsPerSlide(1); 
      } else if (window.innerWidth <= 991) {
        setItemsPerSlide(2); 
      } else {
        setItemsPerSlide(3); 
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const groupedProducts = jewelleryProducts.reduce((acc, product, index) => {
    const groupIndex = Math.floor(index / itemsPerSlide);
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
        Jewellery
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
                  className={`col-lg-${12 / itemsPerSlide} col-md-6 mb-4 d-flex justify-content-center`}
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

export default Jewellery;
