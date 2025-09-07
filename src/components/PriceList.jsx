import React, { useEffect, useState } from "react";
import {
  FaToggleOn,
  FaToggleOff,
  FaCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { productsService } from "../services/dataService";
import "../styles/components/PriceList.css";

const PriceList = () => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [products, setProducts] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [focusedRow, setFocusedRow] = useState(null);

  const toggleAdvancedMode = () => {
    setIsAdvanced((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".table-row")) {
        setFocusedRow(null);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFieldChange = async (index, field, value) => {
    const originalValue = products[index][field];

    // Only save if value actually changed
    if (originalValue == value) return;

    try {
      const productId = products[index].id;
      const updatedData = { [field]: value };

      // Call API to update the product
      await productsService.updateProduct(productId, updatedData);

      // Update local state on successful save
      setProducts((prev) =>
        prev.map((product, i) =>
          i === index ? { ...product, [field]: value } : product
        )
      );

      console.log(`Product ${field} updated successfully`);
    } catch (error) {
      console.error(`Error updating product ${field}:`, error);
    }
  };

  const handleRowClick = (index) => {
    setFocusedRow(index);
  };

  const handleKeyPress = async (e, index, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.innerText;
      await handleFieldChange(index, field, value);
      e.target.blur();
    }
  };

  // Add character limit handler for name and description fields
  const handleInput = (e, maxLength) => {
    const text = e.target.innerText;
    if (text.length > maxLength) {
      e.target.innerText = text.substring(0, maxLength);
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(e.target);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleKeyDown = (e, maxLength) => {
    const text = e.target.innerText;
    const selection = window.getSelection();
    const hasSelection = selection.toString().length > 0;

    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Tab",
      "Enter",
    ];

    if (allowedKeys.includes(e.key)) {
      return;
    }

    if (e.ctrlKey || e.metaKey) {
      return;
    }

    if (hasSelection) {
      return;
    }

    if (text.length >= maxLength && e.key.length === 1) {
      e.preventDefault();
    }
  };

  // Determine which columns to show based on screen size
  const showDescription = screenSize > 1105;
  const showStock = screenSize > 645;
  const showUnit = screenSize > 710;
  const showInPrice = screenSize > 1105;
  const showArticle = screenSize > 710;

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

            <FaPlusCircle color="#24fa64ff" size={16} />
          </button>

          <button className="action-button">
            <span className="btn-label">Print List</span>
            <span className="button-icon" role="img" aria-label="Print">
              🖨️
            </span>
          </button>

          <button className="action-button" onClick={toggleAdvancedMode}>
            <span className="btn-label">Advanced mode</span>
            {isAdvanced ? (
              <FaToggleOff color="#ccc" size={24} />
            ) : (
              <FaToggleOn color="#1ca7f7ff" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table">
        <div className="table-header">
          <div className="col-arrow" style={{ minWidth: "30px" }}></div>

          {showArticle && (
            <div className="col-article">
              Article No.
              <FaArrowDown size={14} color="#00bfff" />
            </div>
          )}

          <div className="col-name">
            <span className="col-name-header">
              Product/Service
              <FaArrowDown size={14} color="#09ff00ff" />
            </span>
          </div>

          {showInPrice && <div className="col-in-price">In Price</div>}
          <div className="col-price">Price</div>
          {showUnit && <div className="col-unit">Unit</div>}
          {showStock && <div className="col-stock">In Stock</div>}
          {showDescription && (
            <div className="col-description">
              <span className="col-description-header">Description</span>
            </div>
          )}
          <div className="col-menu"></div>
        </div>
        <div className="table-body">
          {products.map((product, index) => {
            return (
              <div
                className="table-row"
                key={index}
                onClick={() => handleRowClick(index)}
                style={{
                  cursor: "pointer",
                }}
              >
                <div
                  className="col-arrow arrow"
                  style={{
                    visibility: focusedRow === index ? "visible" : "hidden",
                    color: focusedRow === index ? "#00bfff" : "transparent",
                  }}
                >
                  <FaArrowRightLong />
                </div>

                {showArticle && (
                  <div className="col-article">
                    <span
                      className="bubble"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleFieldChange(
                          index,
                          "articleNo",
                          e.target.innerText
                        )
                      }
                      onKeyPress={(e) => handleKeyPress(e, index, "articleNo")}
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
                    onInput={(e) => handleInput(e, 50)}
                    onKeyDown={(e) => handleKeyDown(e, 50)}
                    onBlur={(e) =>
                      handleFieldChange(index, "product", e.target.innerText)
                    }
                    onKeyPress={(e) => handleKeyPress(e, index, "product")}
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
                      onKeyPress={(e) => handleKeyPress(e, index, "inPrice")}
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
                    onKeyPress={(e) => handleKeyPress(e, index, "price")}
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
                      onKeyPress={(e) => handleKeyPress(e, index, "unit")}
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
                      onKeyPress={(e) => handleKeyPress(e, index, "inStock")}
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
                      onInput={(e) => handleInput(e, 50)}
                      onKeyDown={(e) => handleKeyDown(e, 50)}
                      onBlur={(e) =>
                        handleFieldChange(
                          index,
                          "description",
                          e.target.innerText
                        )
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(e, index, "description")
                      }
                    >
                      {product.description}
                    </span>
                  </div>
                )}

                <div className="col-menu more-menu">⋯</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PriceList;
