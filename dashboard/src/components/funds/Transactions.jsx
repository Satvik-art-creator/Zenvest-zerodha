import Skeleton from "../skeletonLoad/Skeleton";

export default function Transactions({ funds=[], loader }) {
  let title = ["Date", "Type", "Amount"];

  if (loader) {
    return (
      <>
        <h2>Transactions</h2>
        <br />
        <Skeleton title={title} />
      </>
    );
  }

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      {funds?.length > 0 ? (
        <>
          <h2>Transactions ({funds.length})</h2>
          <br />
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {funds.map((el, i) => (
                <tr key={i}>
                  <td>{formatDate(el.createdAt)}</td>

                  <td
                    className={
                      el.type === "Deposit"
                        ? "profit"
                        : "loss"
                    }
                  >
                    {el.type}
                  </td>

                  <td>₹ {Number(el.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2>Transactions ({funds?.length || 0})</h2>
          <br />
          <h4>No Transactions Yet!!</h4>
        </>
      )}
    </>
  );
}
