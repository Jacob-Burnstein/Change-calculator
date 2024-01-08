//pictures associated with values
// onClick the picture, it adds value to total received (connected to navBar (shared state))
// a delete button
// next button
import "./Denomination.scss";
import "./ReceivedBills.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addTotalReceived,
  subtractTotalReceived,
  addBills,
} from "../CashRegister/cartSlice";
import { useState } from "react";
import Totalbar from "../TotalsBar/TotalsBar";
//popup and import show the total in the popup
import Popup from "../Popup/Popup";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import dollarBill1 from "../../assets/images/1-dollar-bill.jpeg";
import dollarBill5 from "../../assets/images/5-dollar-bill.jpeg";
import dollarBill10 from "../../assets/images/10-dollar-bill.jpeg";
import dollarBill20 from "../../assets/images/20-dollar-bill.jpeg";
import dollarBill50 from "../../assets/images/50-dollar-bill.jpeg";
import dollarBill100 from "../../assets/images/100-dollar-bill.jpeg";

const billImgs = {
  dollarBill1,
  dollarBill5,
  dollarBill10,
  dollarBill20,
  dollarBill50,
  dollarBill100,
};

const ReceivedBills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialBills = useSelector((state) => state.cart.bills);

  // Inialize demonimation state object
  const [bills, setBills] = useState(initialBills);

  //Popup: to show the total in the popup
  const { totalPrice } = useSelector((state) => state.cart);
  //Popup: useState and useEffect for Popup function
  const [timedPopup, setTimedPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 200);
  }, []);

  // Increase quantity of bill clicked and increase total value recieved
  const handleBillClick = (billValue) => {
    // Add bill to denomination count
    setBills((prevBills) => ({
      ...prevBills,
      [billValue]: prevBills[billValue] + 1,
    }));
    // Increase total value recieved
    dispatch(addTotalReceived(billValue));
    // Update state with bill quantities
    dispatch(addBills(bills));
  };

  useEffect(() => {
    dispatch(addBills(bills));
  }, [bills]);

  // Remove quantity of bill clicked and subtract from total value recieved
  const handleBillRemovalClick = (billValue) => {
    // Remove bill from denomination count
    setBills((prevBills) => ({
      ...prevBills,
      [billValue]: prevBills[billValue] - 1,
    }));
    // Decrease total value recieved
    dispatch(subtractTotalReceived(billValue));
  };

  return (
    <>
      <body>
        <div className="receivedBillHeader">
          <h1 className="receivedHeaderText">Received Bills</h1>
          <p>Click on each bill that you received from the customer</p>
        </div>
        <div className="totalbar">
          <Totalbar />
        </div>
        <main>
          <section className="billsSection">
            {Object.entries(bills).map(([billValue]) => {
              const billSrc = billImgs[`dollarBill${billValue}`];
              return (
                <div className="billDiv" key={billValue}>
                  <>
                    {bills[billValue] > 0 && (
                      <button
                        className="remove-button"
                        onClick={() => handleBillRemovalClick(billValue)}
                      >
                        -
                      </button>
                    )}
                  </>
                  <img
                    src={billSrc}
                    alt={`${billValue}-dollar-bill`}
                    className="bills"
                    onClick={() => handleBillClick(billValue)}
                  />

                  {bills[billValue] > 0 && <p>x{bills[billValue]}</p>}
                  <br />
                </div>
              );
            })}
          </section>
        </main>
        <footer>
          <button onClick={() => navigate("/products")}>Back</button>
          <button
            className="receivedBillNextButton"
            onClick={() => navigate("/received-coins")}
          >
            Next
          </button>
        </footer>
        <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
          <h1 className="popup-header">Tell the customer:</h1>
          <p className="popup-para">
            Your total today is ${totalPrice.toFixed(2)}
          </p>
        </Popup>
      </body>
    </>
  );
};

export default ReceivedBills;
