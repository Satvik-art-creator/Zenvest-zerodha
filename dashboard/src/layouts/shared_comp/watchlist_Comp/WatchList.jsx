import "../styles/watchlist.css";
import { watchlist } from "../../../data/data.js";
import WatchListItem from "./WatchListItem";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import StockChart from "./chart/StockChart.jsx";

import { useState, useEffect } from "react";

const stockDatas = watchlist.map((stock, idx) => {
  return { name: stock.name, value: false };
});

export default function WatchList({setError, setSuccess}) {
  const [showActionWindow, setShowActionWindow] = useState({
    buy: false,
    sell: false,
  });
  const [showStockData, setShowStockData] = useState(stockDatas);
  const [selectedStock, setSelectedStock] = useState(null);

  // console.log(showStockData);

  let trueStockData = null;
  showStockData.filter((stock) => {
    if (stock.value) {
      watchlist.filter((currStock) => {
        if (stock.name == currStock.name) {
          trueStockData = currStock;
        }
      });
    }
  });

  useEffect(() => {
    function handleClick(e) {
      const analyticsArea = document.getElementById("analytics-area");
      if (analyticsArea && !analyticsArea.contains(e.target)) {
        setSelectedStock(null);
      }
    }

    if (selectedStock) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectedStock]);

  return (
    <>
      <aside id="analytics-area">
        {showActionWindow.buy && (
          <BuyActionWindow
            setActionState={setShowActionWindow}
            stockData={trueStockData}
            setStockState={setShowStockData}
            setError={setError}
            setSuccess={setSuccess}
          />
        )}
        {showActionWindow.sell && (
          <SellActionWindow
            setActionState={setShowActionWindow}
            stockData={trueStockData}
            setStockState={setShowStockData}
            setError={setError}
            setSuccess={setSuccess}
          />
        )}

        <div className="info d-flex align-items-center">
          <div className="mx-5">
            <p className="p1">NIFTY 50</p>
            <p className="p2">100.2</p>
          </div>

          <div className="mx-5">
            <p className="p1">SENSEX</p>
            <p className="p2">100.2</p>
          </div>
        </div>
        <div className="searchContainer">
          <input
            type="text"
            name="search"
            className="m-2 px-3"
            placeholder="Search eg:infy, bse, nifty fut weekly, gold  mcx"
          />
          <span className="m-2 p1">{watchlist.length} / 50</span>
        </div>

        <ul>
          {watchlist.map((stock, idx) => (
            <WatchListItem
              stock={stock}
              key={idx}
              setActionState={setShowActionWindow}
              setStockState={setShowStockData}
              setSelectedStock={setSelectedStock}
            />
          ))}
        </ul>
        <br />
        <div className="chart" id="stock-chart">
          <StockChart watchlist={watchlist} selectedStock={selectedStock} />
        </div>
      </aside>
    </>
  );
}
