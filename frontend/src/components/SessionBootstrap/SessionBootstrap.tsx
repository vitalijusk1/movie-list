import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCurrentUserAsync } from "../../store/slices/UserSlice/userThunk";
import Router from "../../router/Router";
import Loader from "../Loader/Loader";
import utilsStyles from "../../styles/Utils.module.css";

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
    return (
      <div className={`${utilsStyles.page} ${utilsStyles.flexCenter}`}>
        <Loader size={40} />
      </div>
    );
  }

  return <Router />;
};

export default SessionBootstrap;
