import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Totalbar from "../TotalsBar/TotalsBar";
import DenominationCard from "./DenominationCard";

import "./IncrementalRendering.scss";
import "../DenominationsReceived/Denomination.scss";

// finds denominations with values > 0, and renders one at a time (onClick)
const IncrementalRendering = () => {
  //gets calculatedChange object from redux store
  const { calculatedChange, changeToGive } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  //used for onClick to move to next positive denomination/value pair
  const [index, setIndex] = useState(0);

  // new array to store [denomination, value]
  const renderingArray = [];

  // finds denominations with values > 0, and pushes denomination/value pairs to renderingArray
  const renderDenomination = () => {
    for (const denomination in calculatedChange) {
      let value = calculatedChange[denomination];
      if (value > 0) {
        renderingArray.push(denomination, value);
      }
    }
  };

  renderDenomination();

  // sets denomination and value to render, based on order in renderingArray
  let renderedDenomination = renderingArray[index];
  let renderedValue = renderingArray[index + 1];

  return (
    <>
      <body>
        <section className="incremental-headers">
          <div className="totalsBar">
            <Totalbar />
          </div>
          <div>
            <p className="changeP">
              Give the customer each of the bills and coins below
            </p>
          </div>
        </section>
        <section className="incremental-content">
          <h3>Total to return: ${changeToGive.toFixed(2)}</h3>
          {renderedDenomination ? (
            <>
              <section className="card">
                <DenominationCard
                  denomination={renderedDenomination}
                  value={renderedValue}
                  className={
                    renderedDenomination ===
                    ("Quarters" || "Dimes" || "Nickels" || "Pennies")
                      ? "coins"
                      : "bills"
                  }
                />
              </section>
              <footer>
                <button onClick={() => navigate("/received-coins")}>
                  Back
                </button>
                {/* conditional to only display next button if there is another denomination/value to show */}
                <div className="changeButtonDiv">
                  {index + 2 < renderingArray.length ? (
                    <button onClick={() => setIndex(index + 2)}>Next</button>
                  ) : null}

                  <button onClick={() => navigate("/total-change")}>
                    Total
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <button onClick={() => navigate("/")}>Home</button>
          )}
        </section>
      </body>
    </>
  );
};

export default IncrementalRendering;
