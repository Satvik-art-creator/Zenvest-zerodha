import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Equity from "../components/dashboard/Equity";
import Holdings from "../components/dashboard/Holdings";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const displayName = String(user?.name || user?.username);

  return (
    <>
      <section className="dashboard">
        <h1>Hi, {displayName.toUpperCase()}!</h1>
        <br />
        <hr />
        <Equity />
        <hr />
        <Holdings />
        <hr />
      </section>
    </>
  );
}
