 import { useState } from 'react'
import './Submenu.css'
import { useContext,useEffect } from 'react'; 
import viewCardContext from './context/ViewCardContext';

export default function Submenu({item}){
 
  // let totalCountNo;
 //context-api
 const {click , showViewCard , totalCountNo,totalCountFunc,finalCartList,finalList, itemCounts, updateItemCount,setItemCounts  } = useContext(viewCardContext);
 


 //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//  console.log("item id:::",item.id)
//  console.log("item name:::",item.name)
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


const count = itemCounts[item.id] || 0;
//  const count = itemCounts[item.id] || 0;
    function viewCartStyle (type){
      if (item.customisable && type === "add") showViewCard("custom",item)
      else showViewCard("normal")
    }

    useEffect(() => {
      console.log("Updated finalList:", finalList);
    }, [finalList]);

    // function checkVarient(type){
    //     if(item.customisable) {
    //       return true;
    //     }
    //}   
         
     function handleClick(type) {
      if (type === "add") {
        const NewCount = count + 1 ;
          if( !item.customisable ) {
            // totalCountFunc("add", 1)
            // updateItemCount(item.id,1)
            setItemCounts(prev => {
              return {...prev,[item.id] : (prev[item.id] || 0 )+ 1}
            })
            // setItemCounts(1)
           finalCartList({...item,count :1}, "add");
          }
        console.log(totalCountNo)
        viewCartStyle(type);
      }
      else if (type === "plus" && !item.customisable){
        // updateItemCount(item.id , 1) 
        setItemCounts((prev) => {
         const update = prev[item.id] + 1
          // if(prev = 0) totalCountFunc(type,2)
            // totalCountFunc(type, 1 );
          if(!item.customisable)   finalCartList({...item,count :update}, "add");
            return {...prev ,[item.id] :update}
          })
       }
      else if (type === 'mins' && !item.customisable) {
           if(count > 0) {
          // updateItemCount(item.id, -1);
          // totalCountFunc("mins" , -1 );
          setItemCounts(prev => {
            const update =  Math.max(prev[item.id] -1, 0)
            finalCartList({...item,count :update}, "add");
             return {...prev ,[item.id] : update}
          })
           console.log(totalCountNo)
           viewCartStyle();
            }
            else {
        // Hide add/remove and go back to "+ Add"
          setcount(0);
        }
      }

      }

    return (
       
         <div className='subMenu'>
            <div id='veg-nonveg'> 
                {
                  item.type ==="veg" ? 
                  < img src='veg-icon.png' alt='veg-icon' id='veg-non-veg'  /> :
                 < img src='non-veg-icon.png' alt='non-veg-icon' id='veg-non-veg'  />
                }
            </div>

            <div className='horizontal'> 
 
                <div id='food-name'>
                   {item.name}
                </div>
                <div id='add'>
          {count === 0 || item.customisable ? (
            <div id='plusadd' onClick={() =>
            {
              handleClick("add")               // console.log(finalList)
              
            }
            } >+ Add</div>
          ) : (
            <div className='add-remove'>
              <div onClick={() =>
              {
                
                handleClick("mins")
                // console.log(finalList)
              }
              }>-</div>
              <div>{count}</div>
              <div onClick={() =>
              {
                
                handleClick("plus") 
                // console.log(finalList)
              } 
                }>+</div>
            </div>
          )}
        </div>
            </div>
            <div className='horizontal-2'>
            <div id='price'> 
                { "₹ " + item.price}
            </div>
            <div id='customisable'>
                  {
                    item.customisable ? "Variants" : ""
                  }
            </div>

            </div>
            <div id='note'> {item.description} </div>
            <div id='line'><hr /> </div>
         </div>
   
    )
 }