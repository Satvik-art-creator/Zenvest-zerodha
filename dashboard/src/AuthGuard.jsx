import { useContext, useEffect, useRef } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { AuthContext } from "./context/AuthContext";
import { FRONTEND_APP_URL } from "./config/env";

export default function AuthGuard({ children }) {
  const { user, loading } = useContext(AuthContext);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !redirectedRef.current) {
      redirectedRef.current = true;
      // Pass query param so the Login page can show the appropriate toast
      window.location.replace(`${FRONTEND_APP_URL}/login?session=required`);
    }
  }, [loading, user]);

  if (loading)
    return (
      <div className="loading text-center flex items-center justify-center">
        <BounceLoader color="#312f2f" />
      </div>
    );

  if (!user) return null;

  return children;
}
