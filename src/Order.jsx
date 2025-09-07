import './Order.css'
import CategaryCont from './CategaryCont'
import Menu from './menu'
import BottomBar from './BottomBar'
import Varient from './Varient'
import TopBar from './TopBar'

import { useContext ,useEffect} from 'react'
import ViewCardContext from './context/ViewCardContext'
import { POSContext } from "./context/POSContext";
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'


export default function Order () {
    const {click, showViewCard, totalCountNo ,itemCounts ,finalList} = useContext(ViewCardContext)
     const { posData } = useContext(POSContext);
      const [filter, setFilter] = useState("All");   // all | veg | nonveg
     const [ isFilterClick , setisFilterClick] = useState(false);
    const [displayItems, setDisplayItems] = useState([]);    // const navigate = useNavigate() ;
    const  [searchQuerry , setSearchQuerry] = useState("");
    const [isSorting , setIsSorting] = useState(false)
    const [priceRange , setPriceRange] = useState(1000)
    // const toatalCount =Object.values(itemCounts).reduce((sum, qty) => sum + qty, 0)


    // console.log(totalCountNo)
    useEffect(() => {
  const handleScroll = () => {
    if (click !== "invisiable"  ) {
      console.log("Scrolled → hiding view card");
      // showViewCard("invisiable");
      handleRemove();
    }
    if(isFilterClick)  setisFilterClick(false);
    };

  window.addEventListener('scroll', handleScroll);

  return () => {
    // Cleanup
    window.removeEventListener('scroll', handleScroll);
    };
  }, [isFilterClick, click,]);

  useEffect(()=> {
   if (totalCountNo > 0) showViewCard("normal")
  },[])
useEffect(() => {
  const handleClickOutside = (e) => {
    // Close filter if clicking outside of filter-section or filter-option
    if (
      !e.target.closest(".filter-section") &&
      !e.target.closest(".filter-option")
    ) {
      setisFilterClick(false);
    }
  };

  if (isFilterClick) {
    window.addEventListener("click", handleClickOutside);
  }

  return () => {
    window.removeEventListener("click", handleClickOutside);
  };
}, [isFilterClick]);


   useEffect(() => {
      if (click === "custom") {
        document.body.style.overflow = "hidden"; // lock both X & Y
      } else {
        document.body.style.overflow = "auto";
      }
      return () => {
        document.body.style.overflow = "auto"; 
      };
    }, [click]);

  //  function handleOnClick( ) {
  //  navigate('/View Cart') 
  // }
   
  function handleFilter (){
     setisFilterClick(pre => !pre);
  }

  const handleOptionClick = (option) => {
    console.log("hii i'm in filter",option);
    setFilter(option);
    setisFilterClick(pre => !pre);
  };
  
   function handleSearch(event) {
      setSearchQuerry((pre) => 
      {
        console.log(event.target.value);
        return event.target.value
       }
    )
   }
   
   // toggle price filter on/off
      function handleSortingToggle() {
        setIsSorting(prev => !prev);
      }

      // update price range value
      function handlePriceChange(value) {
        setPriceRange(Number(value));
      }
      function handleRemove(e) {
        // const el = e.target.closest(".viewCard");  
         const el = document.getElementsByClassName("viewCard")[0];
        el.classList.add("slide-out-left");

        setTimeout(() => showViewCard("invisiable"), 400);
      }

    return(
        <div className= { click === "custom" ? "father": null } >
         
         <TopBar name={posData.restaurantName} />
   
         <div className={"top-bar-2a" } >
            <div className='search-section'>
            <div id='search-img'><img className='search-image' src='/search-icon.png' alt='icon-img'/></div>
            <input type="text" className='search' placeholder='Serach item' onChange={(event) => handleSearch(event)}/>

            </div>
            <div onClick={handleFilter} 
              className={`filter-section ${isFilterClick ? 'filter-section-onclick' : 'filter-section-onclick-gone'}`}
             > 
                <p>{filter === "All" ? "Filter" : filter}</p>
                <div id='filter-icon'></div>
            </div>
        </div>
        {
          isFilterClick ? 
            <div className='filter-option'> 
              <div className='option-wrapper' onClick={() => handleOptionClick("All")} >
               <div >All</div>
              <div> { filter === "All" ? "✅" :  "⚪" } </div>
                 </div>
              <div className='option-wrapper' onClick={() => handleOptionClick("Veg")} >
              <div >Veg</div>
              <div> { filter === "Veg" ? "✅" :  "⚪" } </div>
                 </div>
              <div className='option-wrapper' onClick={() => handleOptionClick("Non-Veg")} >
              <div >Non-Veg</div>
              <div> { filter === "Non-Veg" ? "✅" :  "⚪" } </div>
                 </div>
              <div className='option-wrapper' onClick={() => handleSortingToggle("price")} >
               <div >Price</div>
              <div> { isSorting? "✅" :  "⚪" } </div>
                  </div>
                  {/* <div className=' range'> </div> */}
                  { isSorting ? 
                    <div className='sorting-range-section'> 
                        <div className='price-start'>0 </div>
                      <input type="range" min="0" max="1000"  className='slider'
                       value={priceRange}
                       step={50}
                        onChange={(e) => handlePriceChange(e.target.value) }
                      />
                      <div className='price-end'>{priceRange}</div>
                    </div>
                      : null
                   }
             </div>
            : null
        }
        <div className='top-bar-2b'>
             {
              posData.categories.map(
                (el) => {
                  // console.log(el);
                 return < CategaryCont  key={el.id} name={el.name} idof={el.id}/> 
                }
              )
            }
        </div>
     
        <div className='menu'> 
             {
              posData.categories.map(
                (el) => {
                   const filteredItems = el.items.filter(item => {
                          // filter by veg/nonveg
                      if (filter === "Veg" && item.type?.toLowerCase() !== "veg") return false;
                      if (filter === "Non-Veg" && item.type?.toLowerCase() !== "non-veg") return false;

                      // filter by search
                      if (searchQuerry && !item.name.toLowerCase().includes(searchQuerry.toLowerCase())) return false;
                      // filter by price
                      if (isSorting && item.price > priceRange) return false;
                                          return true;
                  });
                  

                  // console.log(el.items.length);
                 return < Menu key={el.id} name={el.name} idof={el.id} no={filteredItems.length} items={filteredItems} /> 
                }
              )
            }

              </div>
       <BottomBar />
    
     {console.log(click)}
     
       <div className= {` ${click === "normal"? "viewCard" : "exp"}`} > 
          {
            click === "invisiable" ? null : (
              click ==="normal" ? 
              (
                <>
                
                <div className='items'>
                    {totalCountNo} items added
                </div>
                <div className='view-cancel'>
                <div className='viewcard-btn'>
                    View cart
                </div>
                <div onClick =  {(e) => handleRemove(e)} className='cancel'>
                    +
                </div>
                    
                </div>
                </>
              )
              :
                  // <Varient cancel={showViewCard} posData={posData} />
              
              <div className="overlay">
                <Varient cancel={showViewCard} posData={posData} />
              </div>

                  

   

             )
          }
    </div>  
     
         </div>
    )
    
}
 