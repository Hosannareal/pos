 

 import './item.css'
import { useEffect ,useState} from 'react';

export default function ({ itemm, updateItemCount, count ,localCount , setLocalCount ,show, price}) {
 
    console.log("price from item.js", price);
    const handleDecrement = () => {
        if (!show && localCount > 1) {
            setLocalCount(prev => prev - 1);
         }
        if(show && count > 1){
            updateItemCount(itemm.id || itemm.SpecialItem?.id, -1);
        }
    };

     const handleIncrement = () => {
  if (!show) {  
     setLocalCount(prev => prev + 1);
    // updateItemCount(itemm.id || itemm.SpecialItem?.id, +1);

  } else {
    updateItemCount(itemm.id || itemm.SpecialItem?.id, +1);
  }
};

    return (
        <div className="itemComp">
            <div id="nameComp">
                {itemm?.name || itemm?.SpecialItem?.name || "Aryan"}
            </div>
            <div className="price-addComp"> 
                <div id="priceComp">
                    ₹ { price || itemm?.price || itemm?.SpecialItem?.price || "₹ 240"}
                </div>
                <div className="addComp">
                    <div onClick={handleDecrement}>-</div>
                    {
                        show ? 
                        <div>{count}</div>
                        :
                        <div>{localCount}</div>
                    }
                    <div onClick={handleIncrement}>+</div>
                </div>
            </div>
        </div>
    )
}
