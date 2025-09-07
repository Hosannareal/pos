import { useNavigate, useLocation } from "react-router-dom";
import "./BottomBar.css";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 gives the current URL path
  

  function handleOnClick(where) {
    console.log(where);
    navigate(where);
    console.log("location from BottomBar",location)
  }

  return (
    <div className="bottom-bar">
      <div onClick={() => handleOnClick("/Menu")}>
        <img src="/home-icon.png" alt="home-icon" />
        <div className={location.pathname === "/Menu" ? "color-change" : ""}>
          Menu
        </div>
      </div>

      <div onClick={() => handleOnClick("/View-cart")}>
        <img src="/Menu-icon.png" alt="home-icon" />
        <div
          className={location.pathname === "/View-cart" ? "color-change" : ""}
        >
          View Cart
        </div>
      </div>

      <div onClick={() => handleOnClick("/Order")}>
        <img src="/order-icon.png" alt="home-icon" />
        <div className={location.pathname === "/Order" ? "color-change" : ""}>
          Order
        </div>
      </div>

      <div onClick={() => handleOnClick("/Billing")}>
        <img src="/billing-icon.jpg" alt="home-icon" />
        <div
          className={location.pathname === "/Billing" ? "color-change" : ""}
        >
          Billing
        </div>
      </div>
    </div>
  );
}
