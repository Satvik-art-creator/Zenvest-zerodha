import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Draggable from "react-draggable";

export default function BuyActionWindow({
  setActionState,
  stockData,
  setStockState,
  setError,
  setSuccess
}) {
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [inputHandle, setInputHandle] = useState({
    qty: 1,
    price: stockData.price,
    product: "CNC",
  });

  const marginRequired =
    inputHandle.product === "CNC"
      ? inputHandle.qty * inputHandle.price
      : inputHandle.qty * inputHandle.price * 0.2;

  // Sync price when stockData changes
  useEffect(() => {
    setInputHandle({
      qty: 1,
      price: stockData.price,
      product: "CNC",
    });
  }, [stockData]);

  const inputHandleFunc = (e) => {
    const { name, value } = e.target;
    setInputHandle((prevInp) => ({ ...prevInp, [name]: value }));
  };

  const newOrderFunc = async () => {
    try {
      setLoading(true);

      await axios
        .post(
          "http://localhost:8080/newOrder",
          {
            name: stockData.name,
            product: inputHandle.product,
            qty: inputHandle.qty,
            price: inputHandle.price,
            mode: "BUY",
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          if (res.data.success) {
            setSuccess(res.data.message);
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          console.log(`error in placing order ${err}`);
          setError("Error in placing order. Please try again.");
        });

      setLoading(false);

      setActionState({ buy: false, sell: false });
      navigate("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  const resetClickFunc = () => {
    setActionState({ buy: false, sell: false });
    setStockState((prevStockState) =>
      prevStockState.map((stock) => ({ ...stock, value: false })),
    );
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
        <p>Placing Order...</p>
      </div>
    );
  } else {
    return createPortal(
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none", zIndex: 1050 }}>
        <Draggable handle=".drag-handle" nodeRef={nodeRef} bounds="parent">
          <div className="card shadow-sm actionWindow" ref={nodeRef}>
            {/* Header (draggable) */}
            <div
              className="card-header bg-primary text-white drag-handle"
              style={{ cursor: "move" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <strong>
                  Buy {stockData.name} <small className="fw-light">NSE</small> x{" "}
                  {inputHandle.qty} Qty
                </strong>
              </div>
            </div>
            <br />
            {/* Qty & Price */}
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <label className="form-label" htmlFor="qty">
                    Qty.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="qty"
                    id="qty"
                    value={inputHandle.qty}
                    onChange={inputHandleFunc}
                    required
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    id="price"
                    value={inputHandle.price}
                    onChange={inputHandleFunc}
                    required
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* CNC & MIC */}
            <div className="mt-3 d-flex justify-content-center">
              <div className="btn-group" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="product"
                  id="cnc"
                  autoComplete="off"
                  checked={inputHandle.product === "CNC"}
                  onChange={() =>
                    setInputHandle({ ...inputHandle, product: "CNC" })
                  }
                />
                <label
                  className="btn btn-outline-primary px-4 py-1"
                  htmlFor="cnc"
                  style={{ fontSize: "0.85rem" }}
                >
                  CNC <span className="text-muted ms-1">(Delivery)</span>
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="product"
                  id="mis"
                  autoComplete="off"
                  checked={inputHandle.product === "MIS"}
                  onChange={() =>
                    setInputHandle({ ...inputHandle, product: "MIS" })
                  }
                />
                <label
                  className="btn btn-outline-primary px-4 py-1"
                  htmlFor="mis"
                  style={{ fontSize: "0.85rem" }}
                >
                  MIS <span className="text-muted ms-1">(Intraday)</span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center my-4">
              <span className="text-muted" style={{ marginLeft: "10px" }}>
                Margin required ₹{marginRequired.toFixed(2)}
              </span>
              <div>
                <button className="btn btn-primary me-2" onClick={newOrderFunc}>
                  Buy
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ marginRight: "25px" }}
                  onClick={resetClickFunc}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      </div>,
      document.body,
    );
  }
}
