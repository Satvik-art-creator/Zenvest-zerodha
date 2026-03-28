// import {holdings} from "../../data/data.js"
import { useState, useEffect } from "react";
import axios from "axios";
import VerticalChart from "../charts/VerticalChart";
import Skeleton from "../skeletonLoad/Skeleton";

export default function HoldingsDataTable() {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/allHoldings", {
        withCredentials: true
      })
      .then((res) => {
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        console.log(`error in fetching positions data ${err}`);
      });
  }, []);

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  let title = [
    "Instrument",
    "Qty.",
    "Avg. cost",
    "LTP.",
    "Cur. val",
    "P&L",
    "Net chg.",
    "Day chg.",
  ];

  if (loading) {
    return (
      <>
        <h2>Holdings</h2>
        <br />
        <Skeleton title={title} />
      </>
    );
  }

  return (
    <>
      <h2>Holdings ({allHoldings.length})</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
        </thead>

        <tbody>
          {allHoldings.map((stock, idx) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const netClass = Number(stock.net) >= 0.0 ? "profit" : "loss";
            const dayClass = Number(stock.day) >= 0.0 ? "profit" : "loss";

            return (
              <tr key={idx}>
                <td colSpan={2}>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={netClass}>{Number(stock.net).toFixed(2)}</td>
                <td className={dayClass}>{Number(stock.day).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ position: "relative", width: "100%", padding: "1rem" }}>
        <VerticalChart data={data} />
      </div>
    </>
  );
}
