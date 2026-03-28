import { Outlet } from "react-router";
import Navbar from "./shared_comp/Navbar";
import WatchList from "./shared_comp/watchlist_Comp/WatchList";
import AuthGuard from "../AuthGuard";
import { ToastContainer, toast } from "react-toastify";

export default function AppLayout() {
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
    const handleWarning = (err) =>
    toast.warning(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  return (
    <>
      <AuthGuard>
        <section className="layout">
          <WatchList setError={handleError} setSuccess={handleSuccess} />
          <div className="right-area">
            <Navbar />
            <main>
              <Outlet context={{setError:handleError, setSuccess:handleSuccess, setWarning:handleWarning}} />
            </main>
          </div>
          <ToastContainer />
        </section>
      </AuthGuard>
    </>
  );
}
