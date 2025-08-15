import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/CSS/PriceList.css";
import modeOnBtn from "../assets/Images/modeon.png";
import modeOffBtn from "../assets/Images/modeoff.png";
import printbtn from "../assets/Images/print.png";
import addbtn from "../assets/Images/add.png";

const PriceList = () => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [products, setProducts] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const toggleAdvancedMode = () => {
    setIsAdvanced((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleFieldChange = (index, field, value) => {
    setEditedRows((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
        id: products[index].id,
      },
    }));
  };

  const handleSave = (index) => {
    const updatedData = editedRows[index];
    if (!updatedData) return;

    axios
      .put(`http://localhost:3000/products/${updatedData.id}`, updatedData)
      .then(() => {
        setProducts((prev) => {
          const newProducts = [...prev];
          newProducts[index] = { ...newProducts[index], ...updatedData };
          return newProducts;
        });
        setEditedRows((prev) => {
          const newEditedRows = { ...prev };
          delete newEditedRows[index];
          return newEditedRows;
        });
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
      });
  };

  // Determine which columns to show based on screen size
  const showDescription = screenSize > 1298;
  const showStock = screenSize > 645;
  const showUnit = screenSize > 710;
  const showInPrice = screenSize > 785;
  const showArticle = screenSize > 565;

  return (
    <div className="pricelist-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="search-section">
          <div className="search-group">
            <input
              type="text"
              placeholder="Search Article No..."
              className="search-input"
            />
            <button className="search-icon-button">🔍</button>
          </div>
          <div className="search-group">
            <input
              type="text"
              placeholder="Search Product ..."
              className="search-input"
            />
            <button className="search-icon-button">🔍</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button">
            <span className="btn-label">New Product</span>
            <img src={addbtn} alt="New" className="button-icon" />
          </button>

          <button className="action-button">
            <span className="btn-label">Print List</span>
            <img src={printbtn} alt="Print" className="button-icon" />
          </button>

          <button className="action-button" onClick={toggleAdvancedMode}>
            <span className="btn-label">Advanced mode</span>
            <img
              src={isAdvanced ? modeOnBtn : modeOffBtn}
              alt="Mode Switch"
              className="button-icon"
            />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-wrapper">
        <div className="table">
          <div
            className="table-header"
            style={{
              gridTemplateColumns: `30px ${showArticle ? "100px" : ""} 260px ${
                showInPrice ? "75px" : ""
              } 70px ${showUnit ? "71px" : ""} ${showStock ? "75px" : ""} ${
                showDescription ? "270px" : ""
              } 30px`
                .replace(/\s+/g, " ")
                .trim(),
            }}
          >
            <div className="col-arrow"></div>

            {showArticle && (
              <div className="col-article">
                Article No.
                <span className="arrow blue">↓</span>
              </div>
            )}

            <div className="col-name">
              Product/Service
              <span className="arrow green">↓</span>
            </div>

            {showInPrice && <div className="col-in-price">In Price</div>}
            <div className="col-price">Price</div>
            {showUnit && <div className="col-unit">Unit</div>}
            {showStock && <div className="col-stock">In Stock</div>}
            {showDescription && (
              <div className="col-description">Description</div>
            )}
            <div className="col-menu">Action</div>
          </div>

          {products.map((product, index) => (
            <div
              className="table-row"
              key={index}
              style={{
                gridTemplateColumns: `30px ${
                  showArticle ? "100px" : ""
                } 260px ${showInPrice ? "70px" : ""} 70px ${
                  showUnit ? "71px" : ""
                } ${showStock ? "75px" : ""} ${
                  showDescription ? "270px" : ""
                } 30px`
                  .replace(/\s+/g, " ")
                  .trim(),
              }}
            >
              <div
                className="col-arrow arrow"
                onClick={() => handleSave(index)}
                style={{
                  visibility: editedRows[index] ? "visible" : "hidden",
                  cursor: "pointer",
                }}
              >
                →
              </div>

              {showArticle && (
                <div className="col-article">
                  <span
                    className="bubble"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleFieldChange(index, "articleNo", e.target.innerText)
                    }
                  >
                    {product.articleNo}
                  </span>
                </div>
              )}

              <div className="col-name">
                <span
                  className="bubble ps-wid"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleFieldChange(index, "product", e.target.innerText)
                  }
                >
                  {product.product}
                </span>
              </div>

              {showInPrice && (
                <div className="col-in-price">
                  <span
                    className="bubble"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleFieldChange(index, "inPrice", e.target.innerText)
                    }
                  >
                    {product.inPrice}
                  </span>
                </div>
              )}

              <div className="col-price">
                <span
                  className="bubble"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleFieldChange(index, "price", e.target.innerText)
                  }
                >
                  {product.price}
                </span>
              </div>

              {showUnit && (
                <div className="col-unit">
                  <span
                    className="bubble"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleFieldChange(index, "unit", e.target.innerText)
                    }
                  >
                    {product.unit}
                  </span>
                </div>
              )}

              {showStock && (
                <div className="col-stock">
                  <span
                    className="bubble"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleFieldChange(index, "inStock", e.target.innerText)
                    }
                  >
                    {product.inStock}
                  </span>
                </div>
              )}

              {showDescription && (
                <div className="col-description">
                  <span
                    className="bubble decs"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleFieldChange(
                        index,
                        "description",
                        e.target.innerText
                      )
                    }
                  >
                    {product.description}
                  </span>
                </div>
              )}

              <div className="col-menu more-menu">⋯</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceList;
