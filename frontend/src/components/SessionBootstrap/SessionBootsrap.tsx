import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCurrentUserAsync } from "../../store/slices/AuthSlice/authThunk";
import Router from "../../router/Router";

const SessionBootstrap = () => {
  // check if user token is valid before attaching router to app
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    dispatch(getCurrentUserAsync()).finally(() => {
      setIsChecking(false);
    });
  }, [dispatch]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return <Router />;
};

export default SessionBootstrap;
