import { useContext, useEffect, useRef } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { AuthContext } from "./context/AuthContext";

export default function PublicRoute({ children }) {

  const {user, loading} = useContext(AuthContext);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!loading && user && !redirectedRef.current) {
      redirectedRef.current = true;
      window.location.replace("http://localhost:5174");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <BounceLoader color="#312f2f" />
      </div>
    );
  }

  if (user) return null;

  return children;
}