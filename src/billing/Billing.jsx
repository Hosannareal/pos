import "./Billing.css";
import TopBar from "../TopBar.jsx";
import BottomBar from "../BottomBar.jsx";
import viewCardContext from "../context/ViewCardContext";
import { useContext, useMemo } from "react";

export default function Billing() {
  const { finalList } = useContext(viewCardContext);

  // Calculate total dynamically
  const totalPrice = useMemo(() => {
    return finalList.reduce(
      (sum, item) => sum + (item.subTotalPrice || item.price || 0),
      0
    );
  }, [finalList]);

  // Get current date and time
  const now = new Date();
  const billData = {
    billNo: 1430,
    date: now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    items: finalList, // Use the actual cart items
    cgst: 0.8,
    sgst: 0.8,
    serviceCharge: 50,
    discount: 8,
    roundOff: 0.4,
    total: totalPrice + 0.8 + 0.8 + 50 - 8 + 0.4,
  };

  return (
    <>
      <TopBar name={"My Restaurant"} />

      <div className="billing-container">
        {/* Header */}
        <div className="billing-header">
          <div className="billing-icon">🧾</div>
          <h3>Bill No: {billData.billNo}</h3>
          <h2>₹ {billData.total.toFixed(2)}</h2>
          <p>
            {billData.date} {billData.time}
          </p>
        </div>

        {/* Items */}
        <div className="billing-items">
          {billData.items.length > 0 ? (
            billData.items.map((item, i) => (
              <div key={i} className="billing-item">
                <span>{item.name}</span>
                <span>₹ {(item.subTotalPrice || item.price).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>

        {/* Charges */}
        <div className="billing-charges">
          <div>
            <span>CGST</span>
            <span>₹ {billData.cgst.toFixed(2)}</span>
          </div>
          <div>
            <span>SGST</span>
            <span>₹ {billData.sgst.toFixed(2)}</span>
          </div>
          <div>
            <span>Service Charge</span>
            <span>₹ {billData.serviceCharge.toFixed(2)}</span>
          </div>
          <div>
            <span>Total Discount</span>
            <span>₹ {billData.discount.toFixed(2)}</span>
          </div>
          <div>
            <span>Round Off</span>
            <span>₹ {billData.roundOff.toFixed(2)}</span>
          </div>
        </div>

        {/* Button */}
        <div className="billing-footer">
          <button className="pay-btn">Google Pay / UPI</button>
        </div>
      </div>

      <BottomBar />
    </>
  );
}
