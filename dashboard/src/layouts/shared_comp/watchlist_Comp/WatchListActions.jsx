import { Tooltip, Grow } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const WatchListActions = ({
  setActionState,
  setStockState,
  stockData,
  setSelectedStock,
}) => {
  const buyClickFunc = () => {
    setActionState({ buy: true, sell: false });
    setStockState((prevStockState) =>
      prevStockState.map((stock) => ({
        ...stock,
        value: stock.name === stockData.name,
      })),
    );
  };

  const sellClickFunc = () => {
    setActionState({ buy: false, sell: true });
    setStockState((prevStockState) =>
      prevStockState.map((stock) => ({
        ...stock,
        value: stock.name === stockData.name,
      })),
    );
  };

  const analysisFunc = () => {
    setSelectedStock(stockData.name);
    const element = document.getElementById("stock-chart");
    if (!element) return;

    const offset = 150; // extra space
    const top = element.offsetTop - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Tooltip title="Buy (B)" placement="top" arrow transitionComponent={Grow}>
        <button
          className="btn btn-primary mx-2 actionBtn"
          onClick={buyClickFunc}
        >
          B
        </button>
      </Tooltip>

      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        transitionComponent={Grow}
      >
        <button
          className="btn btn-danger mx-2 actionBtn"
          onClick={sellClickFunc}
        >
          S
        </button>
      </Tooltip>

      <Tooltip
        title="Analytics (A)"
        placement="top"
        arrow
        transitionComponent={Grow}
      >
        <button className="btn btn-light mx-2 actionBtn" onClick={analysisFunc}>
          <BarChartIcon />
        </button>
      </Tooltip>

      <Tooltip title="More" placement="top" arrow transitionComponent={Grow}>
        <button className="btn btn-light mx-2 actionBtn">
          <MoreHorizIcon />
        </button>
      </Tooltip>
    </>
  );
};

export default WatchListActions;
