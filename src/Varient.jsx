import Item from './item.jsx'
import './Varient.css'
import VarientChoice from './VarientChoice.jsx'
import viewCardContext from './context/ViewCardContext.jsx';
import Addon from './Addon.jsx';
import { useContext,useState,useEffect } from 'react';
import item from './item.jsx';
 
export default function ({cancel , posData}) {
  const { showVarientItem, finalCartList , varientchoiceItemData ,
    setVarientchoiceItemData , totalCountFunc , itemCounts, updateItemCount,setItemCounts,allNote , allNoteFunc } 
    = useContext(viewCardContext);

  const [selectedAddon, setselectedAddon] = useState([]);
  const [localCount, setLocalCount] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("Half"); // default "Half"
  const [ subTotalPrice , setSubTotalPrice] = useState(0);   // ✅ use state
  const [note , setNote] = useState("")
  // const lastIndex = finalList.length - 1;
  // if (lastIndex < 0) return null; // no items case

  // const showVarientItem= finalList[lastIndex];
  console.log("checking showVarientItem::;",showVarientItem);
  const count = itemCounts[showVarientItem.id] || 0;

  // ✅ calculate subtotal whenever count, addons, or variant changes
  useEffect(() => {
    const addonPrice = selectedAddon.reduce((acc, addon) => acc + (addon.price || 0), 0);

    const basePrice = selectedVariant === "Half"
      ? (showVarientItem.price || 0)
      : (showVarientItem.customisable.find(customitem => customitem.name === selectedVariant)?.price || 0);

    setSubTotalPrice((basePrice * localCount) + addonPrice);
  }, [itemCounts, selectedAddon, selectedVariant,  localCount , showVarientItem]);

  function handleClick(addon) {
    setselectedAddon(prev => {
      // toggle selection
      if (prev.find(a => a.name === addon.name)) {
        return prev.filter(a => a.name !== addon.name);
      }
      return [...prev, addon];
    });
  }
  
      function handleVarientNote (e){
          const note = e.target.value 
          setNote(note);
       }

  function handleClickAddItem () {
    console.log("subtotal in injected data::",subTotalPrice)
    let totalCount = 0;
    setItemCounts(prev => {
      totalCount = (prev[showVarientItem.id] || 0) + localCount ;
     return {...prev,[showVarientItem.id] :  totalCount };
    });
    const injectData = {
      SpecialItem: showVarientItem,
      // variants: varientchoiceItemData[showVarientItem.id],
      varientChoiceData : {[selectedVariant] : localCount},
      addons: selectedAddon,
      subTotalPrice,
      selectedVariant,
      count :  totalCount
      // Note : note
    };

    // finalList.pop();
    // finalList.push(injectData);
    // ✅ Send full item object to finalCartList
  finalCartList(injectData, "add");

  // ✅ Reset states after adding
  setselectedAddon([]);
  setSelectedVariant("Half");
  setSubTotalPrice(0);
  setLocalCount(1);  // reset count for local UI
    setNote("")
    cancel("normal");
    totalCountFunc("varient" , count);
  }

  return (
    <>  
    <div className='cardWrapper'> 

      <div id='cancle-varient' onClick={() => cancel("normal") }>+</div>
      <div className="customViewCard">
        <div className='itemComp-cont'>
          <Item 
            itemm={showVarientItem}
            count={count}
            updateItemCount={updateItemCount}
            itemCounts={itemCounts}
            localCount={localCount}
            setLocalCount={setLocalCount}
          />
        </div>
        <hr/>


        {/* Note Section */}
           <div className='note-section'>
            {allNote[showVarientItem.id] ? 
             <div className="VarientNote  marginClass" >
                 <div className="note-img">
                  <img src="./note-icon.png" alt="" />
                </div>
                <div className="note-value">
                  {allNote[showVarientItem.id]}
                </div>
              </div> 

               :
              <>
                <div id="note-name">Special note</div>
                <div className='search-cont'>
                  <input
                    type="text"
                    className="search"
                    placeholder={`Note for ${showVarientItem.name || ""}`}
                    value={note}
                    onChange={(e) => handleVarientNote(e)}
                    onBlur={() => {
                      const tempNote = note.trim();
                      if (tempNote !== "") {
                        allNoteFunc(tempNote, showVarientItem.id, "add");
                      }
                    }}
                  />
                </div>
              </>
            }
          </div>

        {/* Variants */}
        <div className='VarientChoice'>
          {showVarientItem.customisable && showVarientItem.customisable.map(custom => (
            <VarientChoice
              key={custom.name}
              item={showVarientItem}
              itemCustom={custom}
              varientchoiceItemData={varientchoiceItemData}
              setVarientchoiceItemData={setVarientchoiceItemData}
              localCount={localCount}
              setLocalCount={setLocalCount}
              updateItemCount={updateItemCount}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          ))}
        </div>
        <hr/>
        

        {/* Addons */}
        <div className='addon-margin'>

        <Addon 
          showVarientItem={showVarientItem} 
          setselectedAddon={setselectedAddon} 
          selectedAddon={selectedAddon}
        />
        </div>
        
      </div>
      /////////
      </div>

      {/* Subtotal + Add Button */}
      <div className='add-to-cart'> 
        <div className='totalPrice-name-cont'>
          <div id='totalPrice-amount'>
            ₹ {subTotalPrice}
          </div>
          <div id="totalPrice-name">
            Total price
          </div>
        </div>
        <div id="add-to-cart-btn" onClick={handleClickAddItem}>
          Add to Cart
        </div>
      </div>
    </>
  )
}
