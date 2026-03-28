export default function Balance({balance, setOpenBox}) {
  const addOpen = () => {
    setOpenBox((prevState) => ( {...prevState, state: true, type: "Deposit"} ));
  }

  const withdrawOpen = () => {
    setOpenBox((prevState) => ( {...prevState, state: true, type: "Withdraw"} ));
  }

  return (
    <>
      <div className="card shadow-sm border-0">

      <div className="card-body p-4">

        <h6 className="text-muted mb-2">
          Available Balance
        </h6>

        <h2 className="fw-bold mb-2">
          ₹ {balance.toLocaleString()}
        </h2>

        <p className="text-muted mb-4">
          Funds available for trading or withdrawal
        </p>

        <div className="d-flex flex-wrap gap-3">

          <button className="btn btn-success px-4 py-2" onClick={addOpen}>
            ADD FUNDS
          </button>

          <button className="btn btn-danger px-4 py-2" onClick={withdrawOpen}>
            WITHDRAW
          </button>

        </div>

      </div>
    </div>
    </>
  );
}