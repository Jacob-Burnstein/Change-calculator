//pictures associated with values

// onClick the picture, it adds value to total received (connected to navBar (shared state))

// a delete button

//take the total value - total cost, and then put remainder into changeCalculation.js (puts change into an object split by $$ denominations)
//after than, we're getting an object that says  twenties: 2, tens: 0 etc....

// next button to CalculatedChangeRender.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addTotalReceived,
  subtractTotalReceived,
  addCalculatedChange,
  setChangeToGive,
  addCoins,
} from "../CashRegister/cartSlice";
import { useState, useEffect } from "react";

import calculateChange from "./changeCalculation";
import "./Denomination.scss";
import "./ReceivedCoins.scss";
import Totalbar from "../TotalsBar/TotalsBar";
import Popup from "../Popup/Popup";

import centCoin1 from "../../assets/images/1-cent-coin.jpeg";
import centCoin5 from "../../assets/images/5-cent-coin.jpeg";
import centCoin10 from "../../assets/images/10-cent-coin.jpeg";
import centCoin25 from "../../assets/images/25-cent-coin.jpeg";
import centCoin100 from "../../assets/images/100-cent-coin.jpeg";

const coinImgs = {
  centCoin1,
  centCoin5,
  centCoin10,
  centCoin25,
  centCoin100,
};

const ReceivedCoins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialCoins = useSelector((state) => state.cart.coins);

  const [coins, setCoins] = useState(initialCoins);

  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const totalReceived = useSelector((state) => state.cart.totalReceived);

  const changeToGive = totalReceived - totalPrice;

  //Popup:
  const [buttonPopup, setButtonPopup] = useState(false);

  // Increase quantity of coin clicked and increase total value recieved
  const handleCoinClick = (coinValue) => {
    // Add coin to denomination count
    setCoins((prevCoins) => ({
      ...prevCoins,
      [coinValue]: prevCoins[coinValue] + 1,
    }));
    // Increase total value recieved
    dispatch(addTotalReceived(coinValue / 100));
  };

  useEffect(() => {
    dispatch(addCoins(coins));
  }, [coins]);

  // Remove quantity of coin clicked and subtract from total value recieved
  const handleCoinRemovalClick = (coinValue) => {
    // Remove coin from denominatoin count
    setCoins((prevCoins) => ({
      ...prevCoins,
      [coinValue]: prevCoins[coinValue] - 1,
    }));
    // Decrease total value recieved
    dispatch(subtractTotalReceived(coinValue / 100));
  };

  const handleClick = () => {
    const result = calculateChange(changeToGive);
    dispatch(addCalculatedChange({ changeObject: result }));
    dispatch(setChangeToGive(changeToGive));
    if (changeToGive < 0) {
      setButtonPopup(true);
    } else {
      navigate("/change");
    }
  };

  return (
    <>
      <body>
        <div className="receivedCoinHeader">
          <h1 className="receivedHeaderText">Received Coins</h1>
          <p>Click on each coin that you received from the customer</p>
        </div>
        <div className="totalbar">
          <Totalbar />
        </div>
        <section className="coinsSection">
          {Object.entries(coins).map(([coinValue, count]) => {
            const coinSrc = coinImgs[`centCoin${coinValue}`];
            return (
              <div className="coinDiv" key={coinValue}>
                <button
                  className="remove-button"
                  onClick={() => handleCoinRemovalClick(coinValue)}
                >
                  -
                </button>
                <img
                  src={coinSrc}
                  alt={`${coinValue}-cent-coin`}
                  className={`coins coin-${coinValue}-cent`}
                  onClick={() => handleCoinClick(coinValue)}
                />
                {coins[coinValue] > 0 && (
                  <>
                    <p>{coins[coinValue]}</p>
                  </>
                )}
                <br />
              </div>
            );
          })}
        </section>
        <footer>
          <button onClick={() => navigate("/received-bills")}>Back</button>
          <button onClick={handleClick}>Next</button>
        </footer>
        {/* Popup: */}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h1 className="popup-header">Tell the customer:</h1>
          <p className="popup-para">
            It looks like the cost is more than what you paid, please provide
            more cash. Thanks!
          </p>
        </Popup>
      </body>
    </>
  );
};

export default ReceivedCoins;
