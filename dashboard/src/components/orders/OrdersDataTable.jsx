import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Skeleton from "../skeletonLoad/Skeleton";
import Chip from '@mui/material/Chip';
import { API_BASE_URL } from "../../config/env";

export default function OrdersDatatable() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/allOrders`, {
        withCredentials: true
      })
      .then((res) => {
        setAllOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`error in fetching orders data ${err}`);
        setLoading(false);
      })
  }, [location]);

  function formatOrderTime(input) {
    return new Date(input).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  let title = ["Instrument", "Product", "Mode", "Qty.", "Price", "OrderTime", "Status"];

  if (loading) {
    return (
      <>
        <h2>Orders</h2>
        <br />
        <Skeleton title={title} />
      </>
    );
  }
  return (
    <>
      {allOrders.length > 0 ? (
        <>
          <h2>Orders ({allOrders.length})</h2>
          <br />
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Instrument</th>
                <th>Product</th>
                <th>Mode</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>OrderTime</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {allOrders.map((stock, idx) => (
                <tr key={idx}>
                  <td colSpan={2}>{stock.name}</td>
                  <td>{stock.product}</td>
                  <td>{stock.mode}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{formatOrderTime(stock.createdAt)}</td>
                  <td>{stock.status === "Passed" ? <Chip label="Passed" color="success" /> : <Chip label="Failed" color="error" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2>Orders ({allOrders.length})</h2>
          <br />
          <h4>No Orders Placed Yet!!</h4>
          <br />
          <a href="/">
            <button className="btn btn-primary">Place Order</button>
          </a>
        </>
      )}
    </>
  );
}
