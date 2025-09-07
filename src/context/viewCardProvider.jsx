import { useEffect, useState ,useMemo} from "react";
import viewCardContext from "./ViewCardContext";

export default function ViewCardProvider ({children}) {
    // let totalCount;
    const [click , setclick] = useState("invisiable");
    const [showVarientItem , setShowVarientItem] = useState(null)
    // const [totalCountNo , setTotalCount] = useState(0)
    const [currentCat, setCurrentCat] = useState("")
      const [menuRefs, setMenuRefs] = useState(null); // store ref
      const[activeClassID , setActiveCLassID] = useState(0);
    const [finalList, setFinalList] = useState([]);
    const [orderList , setOrderList] = useState([])
    const [varientchoiceItemData, setVarientchoiceItemData] = useState({});
    const [itemCounts, setItemCounts] = useState({}); 
    const [allNote , setAllNote] =useState({})


  function updateItemCount(id, delta) { 
    
  setItemCounts(prev => ({
    ...prev,
    [id]: Math.max((prev[id] || 0) + delta, 0)
  }));
}

        
          function showViewCard (type , item ) {
              setclick (type);
                setShowVarientItem(item)

           }
        
    
    function totalCountFunc (type ,count) {
      //  if (type ==="varient") setTotalCount(() => count)
      //   else if(type ==='plus' || type === 'add') {
      //     setTotalCount((prev) => {
      //       const currentCount =  prev + count   ;
      //       console.log(currentCount + "....")
      //           return currentCount ;
      //       });

      //   }
      //    else if (type ==='mins'){
      //       setTotalCount((prev) => {
      //          const currentCount = prev + count  ;
      //          return currentCount ;
      //      });

      //   }

      // const totalQuantity = useMemo(() => {
      //   setTotalCount((prev) => {
      //      Object.values(itemCounts).reduce((acc, qty) => acc + qty, 0);
      //   })
      //   }, [itemCounts]);

         
      
    }
   const totalCountNo = useMemo(() => {
  return Object.values(itemCounts).reduce((acc, qty) => acc + qty, 0);
}, [itemCounts]);


 // Called from each Menu to register its ref
  function registerMenuRef(name, ref) {
    setMenuRefs((prevRefs) => ({ ...prevRefs, [name]: ref }));
  }

  // Called from category click
  function scrollToCategory(name) {
    // console.log(menuRefs)
    const ref = menuRefs[name];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  // function finalCartList(item, type) {
  //   setFinalList((prev) => {
  //     const index = prev.findIndex(
  //       (i) => i.id === item.id && i.selectedVariant === item.selectedVariant
  //     );

  //     if (type === "add") {
  //       if (index !== -1) {
  //         // Update existing item
  //         const updatedItem = {
  //           ...prev[index],
  //           ...item,
  //           addons: item.addons || prev[index].addons,
  //           variantChoice: item.variantChoice || prev[index].variantChoice,
  //         };

  //         const newList = [...prev];
  //         newList[index] = updatedItem;
  //         return newList;
  //       } else {
  //         return [...prev, item]; // Add new item
  //       }
  //     }

  //     else if (type === "mins") {
  //       if (index !== -1) {
  //         const newList = [...prev];
  //         newList.splice(index, 1); // Remove one instance
  //         return newList;
  //       }
  //       return prev;
  //     }

  //     else if (type === "delete") {
  //       return prev.filter(
  //         (el) =>
  //           !(el.id === item.id && el.selectedVariant === item.selectedVariant)
  //       );
  //     }

  //     return prev;
  //   });
  // }
function allNoteFunc(note, itemId, type) {
  setAllNote((prev) => ({
    ...prev,           // keep existing notes
    [itemId]: note     // update or add note for this item
  }));
}

  function processAddons(addons) {
  const addonMap = {};

  addons.forEach(addon => {
    if (!addonMap[addon.id]) {
      addonMap[addon.id] = { ...addon, count: 1, total: addon.price };
    } else {
      addonMap[addon.id].count++;
      addonMap[addon.id].total += addon.price;
    }
  });

  // Convert back to array
  const result = Object.values(addonMap);

  // Grand total price
  const grandTotal = result.reduce((sum, a) => sum + a.total, 0);
  const AddonTotalLength = result.reduce((sum, a) => sum + a.count, 0);

  return { result, grandTotal , AddonTotalLength };
}

function finalCartList(item, type) {
  setFinalList(prev => {
    const updated = [...prev];
     if (type === "delete") {
      return updated.filter(
        el =>
          !(el.id === item.id || el.SpecialItem?.id === item.SpecialItem?.id)
      );
    }
    if (type === "add") {
      // Case 1: Normal item
      
      if (!item.SpecialItem) {
        // 🔹 Process addons before saving
       const existingIndex = prev.findIndex(
        el => el.id === item.id
      );

      // const itemCount = itemCounts[item.id]
      const subTotalPrice = item.count * item.price
      // console.warn(item.count)

      if(existingIndex  > -1) {
         updated[existingIndex] = {...item,subTotalPrice}
        return updated
      }
        // const { result, grandTotal, AddonTotalLength } = processAddons(item.addons || []);
        return [...prev, { ...item,subTotalPrice}];
      }

      // Case 2: Special item (update if exists, else add new)
      const existingIndex = prev.findIndex(
        el => el.SpecialItem?.id === item.SpecialItem?.id
      );

      if (item.SpecialItem) {
        if (existingIndex !== -1) {
          // ✅ merge addons and variants 
          const mergedAddons = [
            ...(updated[existingIndex]?.addons || []),
            ...(item.addons || []),
          ];
          const totalSubTotalPrice = updated[existingIndex].subTotalPrice + item.subTotalPrice;
          // const toatalCount =  item.count; 
          // 🔹 Process merged addons
          const { result, grandTotal, AddonTotalLength } = processAddons(mergedAddons);

          updated[existingIndex] = {
            ...updated[existingIndex],
            varientChoiceData: {
              ...(updated[existingIndex]?.varientChoiceData || {}),
              ...Object.fromEntries(
                Object.entries(item.varientChoiceData || {}).map(([key, value]) => [
                  key,
                  (updated[existingIndex]?.varientChoiceData?.[key] || 0) + value
                ]
              )
              )
            },
            count : item.count,
             subTotalPrice : totalSubTotalPrice,
            addons: result,                // ✅ deduped addons
            addonsTotal: grandTotal,       // ✅ total addons price
            addonsCount: AddonTotalLength, // ✅ total addons count
          };
          return updated;
        }

        // New SpecialItem (process addons before adding)
        const { result, grandTotal, AddonTotalLength } = processAddons(item.addons || []);
        return [...prev, { ...item, addons: result, addonsTotal: grandTotal, addonsCount: AddonTotalLength, }];
      }

      return [...prev, item];
    }
 
    return prev;
  });
}

  function orderedListFunc( isplaced){
      setOrderList(Prev => {
        // const orderlist = finalCartList
        console.warn(isplaced)
        console.log("hello world");
        if(isplaced) return finalList
      })
  }




  
 

    
    return(
        < viewCardContext.Provider value={{ 
            click,
            showViewCard ,
             showVarientItem,
             totalCountNo ,
             totalCountFunc,
             currentCat,
             setCurrentCat,
             registerMenuRef,
            scrollToCategory,
            activeClassID,
            setActiveCLassID,
            menuRefs,
            finalCartList,
            finalList,
            setFinalList,
             setVarientchoiceItemData,
            varientchoiceItemData,
            itemCounts, 
            setItemCounts,
            updateItemCount ,
            allNote,
            allNoteFunc,
            orderedListFunc,
            orderList,

             }}>
            {children}
        </viewCardContext.Provider>
    )
}