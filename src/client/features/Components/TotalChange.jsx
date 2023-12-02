import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../images/images.css";
import Totalbar from "../../layout/Totals_Navbar";

export default function TotalChange() {
  const calculatedChange = useSelector((state) => state.cart.calculatedChange);
  const navigate = useNavigate();

  const findValue = (key) => {
    let value = calculatedChange[key];
    return value;
  };

  const usableKeys = [];

  const valuesQueue = [];

  for (const key in calculatedChange) {
    const value = calculatedChange[key];
    if (value > 0) {
      usableKeys.push(key);
      valuesQueue.push(value);
    }
  }

  return (
    <div>
      <div className="totalbar">
        <Totalbar />
      </div>
      {usableKeys.map((key) => (
        <>
          <p key={key}>{key}:</p>
          <p>{findValue(key)}</p>
          {key === "Twenties" ? (
            <img className="bills" src="src/images/twenty-dollar-bill.jpeg" />
          ) : null}
          {key === "Tens" ? (
            <img className="bills" src="src/images/ten-dollar-bill.jpg" />
          ) : null}
          {key === "Fives" ? (
            <img className="bills" src="src/images/five-dollar-bill.jpg" />
          ) : null}
          {key === "Singles" ? (
            <img className="bills" src="src/images/one-dollar-bill.jpg" />
          ) : null}
          {key === "Quarters" ? (
            <img className="coins quarter" src="src/images/quarter.jpeg" />
          ) : null}
          {key === "Dimes" ? (
            <img className="coins dime" src="src/images/dime.jpeg" />
          ) : null}
          {key === "Nickels" ? (
            <img className="coins nickel" src="src/images/nickel.jpeg" />
          ) : null}
          {key === "Pennies" ? (
            <img className="coins penny" src="src/images/penny.jpeg" />
          ) : null}
        </>
      ))}
      <button onClick={() => navigate("/completed")}>Next</button>
    </div>
  );
}
