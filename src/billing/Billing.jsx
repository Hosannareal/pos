import './Billing.css'
import TopBar from '../TopBar.jsx'
import BottomBar from '../BottomBar.jsx'
import { POSContext } from "../context/POSContext"
import { useContext } from 'react'
import { QRCodeCanvas } from "qrcode.react";   // ⬅️ Keep this at the top with other imports

export default function Billing() {
  // Replace with your Merchant UPI ID from Google Pay Business
  const merchantUpiId = "9971079593@okbizaxis";  
  const name = "tiwari";  // This will show in payment apps
  const amount = "1";     // Fixed amount

  // Generate UPI Payment URL
  const upiUrl = `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&cu=INR&tn=Order1234`;

  return (
    <>
      <TopBar name={"My Restaurant"} />  

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Pay ₹{amount} via UPI</h1>

        {/* QR Code */}
        <QRCodeCanvas value={upiUrl} size={250} />

        <p style={{ marginTop: "10px" }}>
          Scan this QR to pay ₹{amount} securely
        </p>
      </div>

      <BottomBar />
    </>
  );
}
