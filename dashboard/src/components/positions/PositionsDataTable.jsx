// import { positions } from "../../data/data.js";
import {useState, useEffect} from "react"
import axios from "axios"
import Skeleton from "../skeletonLoad/Skeleton";
import { API_BASE_URL } from "../../config/env";

export default function PositonsDataTable() {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/allPositions`, {
        withCredentials: true
      })
      .then((res) => {
        setAllPositions(res.data);
        setLoading(false);
      })
      .catch((err)=>{
        setLoading(false);
        console.log(`error in fetching positions data ${err}`);
      });
  }, []);

  let title = ["Product", "Instrument", "Qty.", "Avg", "LTP", "P&L", "Chg."];
  
    if (loading) {
      return (
        <>
          <h2>Positions</h2>
          <br />
          <Skeleton title={title} />
        </>
      );
    }

  return (
    <>
      <h2>Positions ({allPositions.length})</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
        </thead>

        <tbody>
          {allPositions.map((stock, idx) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = Number(stock.day) >= 0.0 ? "profit" : "loss";

            return (
              <tr key={idx}>
                <td colSpan={2}>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{Number(stock.avg).toFixed(2)}</td>
                <td>{Number(stock.price).toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{Number(stock.day).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
