import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";

import Balance from "../components/funds/Balance";
import Transactions from "../components/funds/Transactions";
import MoneyDialog from "../components/funds/MoneyDialog";

export default function Funds() {
  const [fundsData, setFundsData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true); // page loader
  const [fundLoading, setFundLoading] = useState(true); // transactions loader

  const [balance, setBalance] = useState(1000); //reset the balance value on page reloads
  const { setSuccess, setError, setWarning } = useOutletContext();

  const [openBox, setOpenBox] = useState({
    state: false,
    type: "",
    amount: "",
  });
  // track dialog open state

  const handleClose = () =>
    setOpenBox((prevState) => ({ ...prevState, state: false, amount: "" }));

  const handleSubmit = async () => {
    let { type, amount } = openBox;
    amount = Number(amount);

    try {
      let { data } = await axios.post(
        "http://localhost:8080/funds",
        { type, amount },
        {
          withCredentials: true,
        },
      );

      const { success, message, balance } = data;
      if (balance !== undefined) setBalance(balance); //updates the balance and check edge cases -- POST

      if (success) {
        setSuccess(message);
      } else {
        setError(message);
      }

      if (success) {
        setFundsData((prev) => [
          {
            type,
            amount,
            createdAt: new Date(), // same field your table uses
          },
          ...prev,
        ]);
      }
    } catch (err) {
      if (err.response) {
        // The server responded with a status code outside 2xx
        // console.log(err.response.data.); // <-- here is your JSON message
        setWarning(err.response.data.message);
      } else {
        // Network error or request not sent
        console.log(err.message);
        setError("Server not reachable");
      }
    }

    handleClose();
  };

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/funds", {
          withCredentials: true,
        });

        setFundsData(data.funds);
        setBalance(data.balance);
      } catch (err) {
        console.log(err);
      } finally {
        setPageLoading(false);
        setFundLoading(false);
      }
    };

    fetchFunds();
  }, []);

  return (
    <div className="container-fluid px-4 py-3">
      {openBox.state && (
        <MoneyDialog
          open={openBox}
          setOpen={setOpenBox}
          closeFunc={handleClose}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-semibold">Funds</h2>
        </div>
      </div>

      {/* Balance Card */}
      <div className="row mb-4">
        <div className="col-12">
          {pageLoading ? (
            <p>Loading...</p>
          ) : (
            <Balance balance={balance} setOpenBox={setOpenBox} />
          )}
        </div>
      </div>

      {/* Transactions */}
      <div className="row">
        <div className="col-12 table-responsive">
          <Transactions funds={fundsData} loader={fundLoading} />
        </div>
      </div>
    </div>
  );
}
