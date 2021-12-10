import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Dummy from "../../common/sharedComponents/Dummy/Dummy";
import { selectHistory } from "../../common/slices/userSlice";
import s from "./History.module.css";

const History = () => {
  const userHistory = useAppSelector(selectHistory);

  return (
    <>
      {userHistory && (
        <div className={s["history-container"]}>
          <ul className={s["history-list"]}>
            {userHistory.map((query, i) => {
              return (
                <li key={i}>
                  <Link to={`${query}`}>
                    <h2 className="heading-2" style={{ color: "black" }}>
                      {query.slice(query.indexOf("=") + 1)}
                    </h2>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!userHistory && <Dummy text={"No search results yet"} />}
    </>
  );
};

export default History;
