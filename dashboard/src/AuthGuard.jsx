import { useContext, useEffect, useRef } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { AuthContext } from "./context/AuthContext";

export default function AuthGuard({ children }) {
  const { user, loading } = useContext(AuthContext);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !redirectedRef.current) {
      redirectedRef.current = true;
      // Pass query param so the Login page can show the appropriate toast
      window.location.replace("http://localhost:5173/login?session=required");
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
