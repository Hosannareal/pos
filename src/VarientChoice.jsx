import './VarientChoice.css';
import { useContext, useEffect, useState } from 'react';
import viewCardContext from './context/ViewCardContext';


export default function VarientChoice({ 
  item, 
  itemCustom, 
  // varientchoiceItemData, 
  // setVarientchoiceItemData, 
  // localCount, 
  // setLocalCount ,
  selectedVariant ,
  setSelectedVariant 
}) {
  const [halfullCount, sethalffullCount] = useState(1);
  const isSelected = selectedVariant === itemCustom.name

   function handleClick () {
    setSelectedVariant(itemCustom.name)
   }

  // Check if THIS variant is currently selected
  // const isSelected = (varientchoiceItemData[item.id] || [])
  //   .some(v => v.name === itemCustom.name);

  // function handleClick() {
  //   // Always replace with only THIS variant (radio style)
  //   setVarientchoiceItemData((prev) => ({
  //     ...prev,
  //     [item.id]: [{ ...itemCustom, count: 1 }]
  //   }));

  //   sethalffullCount(1); // reset when switching
  // }

  // function updatehalffullCount(type) {
  //   sethalffullCount((prevCount) => {
  //     const newCount =
  //       type === "plus"
  //         ? prevCount + 1
  //         : Math.max(1, prevCount - 1);

  //     // Keep global sync
  //     setVarientchoiceItemData((prev) => ({
  //       ...prev,
  //       [item.id]: prev[item.id].map((v) =>
  //         v.name === itemCustom.name ? { ...v, count: newCount } : v
  //       ),
  //     }));

  //     // Update overall count
  //     setLocalCount((prev) =>
  //       type === "plus" ? prev + 1 : Math.max(0, prev - 1)
  //     );

  //     return newCount;
  //   });
  // }

  return (
    <div className="half-full">
      <div
        onClick={handleClick}
        className={`checkpoint-half-full-price-cont ${  isSelected ? "selected" : ""}`}
      >
        <div id="checkpoint">{isSelected ? "✅" : "⚪"}</div>
        <div className="half-full-price-cont">
          <div id="half-or-full">{itemCustom.name}</div>
          <div id="half-full-price">₹ {itemCustom.price}</div>
        </div>
      </div>

      {/* {isSelected && (
        <div className="addComp vertical-addcomp">
          <div onClick={() => updatehalffullCount("mins")}>-</div>
          <div>{halfullCount}</div>
          <div onClick={() => updatehalffullCount("plus")}>+</div>
        </div>
      )} */}
    </div>
  );
}

// export default function VarientChoice({ 
//   item, 
//   itemCustom, 
//   varientchoiceItemData, 
//   setVarientchoiceItemData,
//   localCount, 
//   setLocalCount ,
//   updateItemCount
// }) {
//   const [halfullCount, sethalffullCount] = useState(1);
//   const isSelected = (varientchoiceItemData[item.id] || [])
//     .some(v => v.name === itemCustom.name);

//   function handleClick() {
//     const currentVariants = varientchoiceItemData[item.id] || [];
//      const currentCount = currentVariants.reduce((sum, v) => sum + v.count, 0);
//     // console.log("currentCount....",currentCount);
    
//     if (isSelected) {
//       // Deselecting - remove this variant
//       const newVariants = currentVariants.filter(v => v.name !== itemCustom.name);
//       setVarientchoiceItemData({
//         ...varientchoiceItemData,
//         [item.id]: newVariants
//       });
//       setLocalCount(currentCount - halfullCount);
//        sethalffullCount(1);
//     } else {
//       // Selecting - replace all variants with this one (radio behavior)
//       setVarientchoiceItemData((pre) => {
//         // const previous = pre[item.id] || [];
//          return {
//           ...varientchoiceItemData,
//           [item.id]: [ { ...itemCustom, count: 1 }]
//         }
//       });
//       setLocalCount(1); // Reset to 1 since we're replacing all variants
//       sethalffullCount(1);
//     }
//   }

//   // function updatehalffullCount(type) {
//   //   const newCount = type === "plus" ? halfullCount + 1 : Math.max(1, halfullCount - 1);
//   //   // console.log("newCount.......",newCount)
//   //   type === "plus" ? updateItemCount(item.id , +1 ) : updateItemCount(item.id, -1);
//   //   const countDiff = newCount - halfullCount;
//   //   // console.log("countDiff.........",countDiff);
    
//   //   // Update variant count
//   //       console.log("44444444444",varientchoiceItemData)

//   //   setVarientchoiceItemData((prev) => ({
//   //     ...prev,
//   //     [item.id]: prev[item.id].map((v) =>
//   //       v.name === itemCustom.name ? { ...v, count: newCount } : v
//   //     ),
//   //   }));

//   //   // Update overall count
//   //   setLocalCount((prev) => prev + countDiff);
//   //   sethalffullCount(newCount);
//   // }

//   return (
//     <div className="half-full">
//       <div
//         onClick={handleClick}
//         className={`checkpoint-half-full-price-cont ${isSelected ? "selected" : ""}`}
//       >
//         <div id="checkpoint">{isSelected ? "✅" : "⚪"}</div>
//         <div className="half-full-price-cont">
//           <div id="half-or-full">{itemCustom.name}</div>
//           <div id="half-full-price">₹ {itemCustom.price}</div>
//         </div>
//       </div>

//       {isSelected && (
//         <div className="addComp vertical-addcomp">
//           <div onClick={() => updatehalffullCount("mins")}>-</div>
//           <div>{halfullCount}</div>
//           <div onClick={() => updatehalffullCount("plus")}>+</div>
//         </div>
//       )}
//     </div>
//   );
// }