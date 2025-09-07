import BottomBar from "../BottomBar"
import './ViewCart.css'
import Item from "../item"
import { POSContext } from "../context/POSContext"
import viewCardContext from "../context/ViewCardContext"
import { useContext, useEffect, useState ,useMemo } from "react"
import { useNavigate } from 'react-router-dom'

import TopBar from "../TopBar"
 
export default function ViewCart () {

    const {posData} = useContext(POSContext);
    const {finalCartList, finalList ,itemCounts , updateItemCount,allNote , allNoteFunc,orderedListFunc,} = useContext(viewCardContext);
    const long = Math.min(20 + finalList.length * 3, 95);
    console.log("dynamic long.......", long);
    const navigate = useNavigate();
    const [isPlaced , setIsPlaced] = useState(false);
     const [finalNote , setFinalNote] = useState("")
    // ✅ make abortNote per-item instead of one global boolean
    const [abortNote ,setAbortNote] = useState({})

    const totalPrice = useMemo(() => {
        return finalList.reduce((sum, item) => sum + (item.subTotalPrice || item.price || 0), 0);
    }, [finalList]);

    console.log("finalist array,,,,,,,,,", finalList)

    function handledeleteClick (item){
        console.log("finalist array,,,,,,,,,",finalList)
        finalCartList(item , "delete")
        console.log("finalist array,,,,,,,,,", finalList)
    }

    // ✅ fix undeclared "note" variable
    function handleNoteChange(e, itemId) {
  const note = e.target.value;
  setAbortNote((prev) => ({
    ...prev,
    [itemId]: note, // temp store while typing
  }));
}

 

    // ✅ handle abort note per item
    // function handleAbort(itemId) {
    //     console.log("checking note",allNote);
    //     setAbortNote(prev => ({
    //         ...prev,
    //         [itemId]: !prev[itemId]
    //     }));
    // }
    
    function hnadlePlaceOrder(){
        navigate("/Order")
        setIsPlaced( prev => {
            orderedListFunc(!prev);
            return !prev
        });
        setIsPlaced(prev => !prev);


    }
    return (
        <>
            { < TopBar name={posData.restaurantName} /> }
            <div className="itemlist-section">
                <div className="Itemlist-name">Item List</div> 
                <div className="seprate" style={{width : `${long}%` }}></div>
            </div>

            <div className="alllist-section">  
                {
                    finalList.map(
                        (item ,index) => { 
                            let halfCount = 0;
                            let fullCount = 0;

                            if (item.SpecialItem && item.varientChoiceData) {
                                Object.entries(item.varientChoiceData).forEach(([key, el]) => {
                                    if (key === "Half"){ 
                                        halfCount = el};
                                    if (key === "Full") {
                                        fullCount = el};
                                });
                            }

                            const count = item.count || 0;
                            
                            return !item.customisable  || item.SpecialItem ?
                            (
                                <div className="alllist"  key={item.id} >
                                    <Item itemm={item}   count={count} updateItemCount={updateItemCount} show={true} price={item.subTotalPrice}/>
                                    <div className="delete-times-section">
                                        <div className="delete-all" onClick={() => handledeleteClick(item)}>  
                                            <img  src="/delete-icon.png"/> 
                                        </div>
                                        <div className="times"> x{count}  </div>   
                                    </div>

                                    { item.SpecialItem ? allNote[item.SpecialItem.id]
                                    ? <div className="VarientNote" >
                                        <div className="note-img"> <img src="./note-icon.png" alt="" /> </div>
                                        <div className="note-value"> {allNote[item.SpecialItem.id]} </div>
                                    </div>
                                    :  <div className="VarientNote-second">
                                        <div className="note-img-and-addnote">
                                            <div className="note-img"> <img src="./plus-note.png" alt="" /> </div>
                                            <div className="addnote">Add a note</div>
                                        </div>
                                        <hr className="addNoteLine"></hr>
                                    </div>
                                    :   allNote[item.id] ?   // ✅ per-item abort check
                                    <div className="VarientNote" >
                                        <div className="note-img"> <img src="./note-icon.png" alt="" /> </div>
                                        <div className="note-value"> {allNote[item.id]} </div>
                                    </div>
                                    :   <div className="item-note-section">
                                        <div className="allitem-note-name">note</div>
                                        {/* ✅ controlled input with per-item note value */}
                                        <input
                                            className="search serachcustom"
                                            value={abortNote[item.id] ?? allNote[item.id] ?? ""}
                                            onChange={(e) => handleNoteChange(e, item.id)}
                                            onBlur={() => {
                                                const note = abortNote[item.id] ?? "";
                                                if (note !== "") {
                                                allNoteFunc(note, item.id, "add");
                                                }
                                            }}
                                            />

                                    </div>
                                    }

                                    { item.SpecialItem ? (
                                        <> 
                                            <hr className="varient-line"></hr>
                                            <div className="all-varient">
                                                {fullCount > 0 && (
                                                    <>
                                                        <div>x{fullCount} Full</div>
                                                        <hr />
                                                    </>
                                                )}
                                                {halfCount > 0 && (
                                                    <>
                                                        <div>x{halfCount} Half</div>
                                                        <hr />
                                                    </>
                                                )}
                                            
                                                {item.addonsCount > 0 && (
                                                    <div >x{item.addonsCount} addons ( ₹{item.addonsTotal} )</div>
                                                )}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            )
                            : null
                        }
                    )
                }
            </div>
         
            <div  className='placeOrder-float'>
                <div className="placeOrder-price">₹ {totalPrice}</div>
                <div>
                    <button onClick={()=>hnadlePlaceOrder()}>place order </button>
                </div>
            </div>

            <BottomBar />
        </>
    )
}
