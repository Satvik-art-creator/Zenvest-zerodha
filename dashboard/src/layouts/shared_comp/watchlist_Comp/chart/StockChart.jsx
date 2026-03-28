import { Doughnut } from "react-chartjs-2";
import "./chartSetup";

function StockChart({ watchlist, selectedStock }) {
  const labels = watchlist.map((stock) => stock.name);

  const baseColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
  ];

  const borderBaseColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const backgroundColor = watchlist.map((stock, index) => {
    const original = baseColors[index % baseColors.length];

    if (!selectedStock) return original;

    if (stock.name === selectedStock) {
      return original.replace("0.5", "0.9"); // stronger
    }

    return original.replace("0.5", "0.1"); // dim others
  });

  const borderColor = watchlist.map((stock, index) => {
    const original = borderBaseColors[index % borderBaseColors.length];

    if (!selectedStock) return original;

    if (stock.name === selectedStock) {
      return original;
    }

    return "rgba(180,180,180,0.3)";
  });

  const borderWidth = watchlist.map((stock) =>
    selectedStock && stock.name === selectedStock ? 3 : 1,
  );

  const offset = watchlist.map((stock) =>
    selectedStock && stock.name === selectedStock ? 20 : 0,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor,
        borderColor,
        borderWidth,
        offset,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%",
    animation: {
      duration: 500,
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 17, 
        },
      },
    },
    layout: {
      padding: {
        right: 30, 
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default StockChart;
