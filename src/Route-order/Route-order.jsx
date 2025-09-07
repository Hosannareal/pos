import './Route-order.css'
import TopBar from '../TopBar.jsx'
import BottomBar from '../BottomBar.jsx'
import Kot from './kot.jsx'
import { POSContext } from "../context/POSContext"
import { useContext, useState } from 'react'
import viewCardContext from '../context/ViewCardContext.jsx'

export default function RouteOrder() {
  const { posData } = useContext(POSContext)
  const { orderedListFunc, orderList } = useContext(viewCardContext)
  const [isSelected, setIsSelected] = useState("Order-item")

  console.table(orderList)

  return (
    <>
      <TopBar name={posData.restaurantName} />
      <div className="nameANDline">
        <div
          className="order-item"
          onClick={() => setIsSelected("Order-item")}
        >
          <div id="Order-name">Order item</div>
          <div
            className={`dull-line ${
              isSelected === "Order-item" ? "Order-line" : ""
            }`}
          ></div>
        </div>

        <div
          className="list-item"
          onClick={() => setIsSelected("List-item")}
        >
          <div id="List-name">List item</div>
          <div
            className={`dull-line ${
              isSelected === "List-item" ? "List-line" : ""
            }`}
          ></div>
        </div>
      </div>

      <div className="Main-Oreder-section">
        
        <Kot orderList={orderList} />
      </div>

      <BottomBar />
    </>
  )
}
