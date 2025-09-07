import { useContext,useRef } from 'react'
import './CategaryCont.css'
import viewCardContext from './context/ViewCardContext'

export default function ({name ,idof}) {
    const { scrollToCategory, activeClassID,setActiveCLassID , click  } =useContext(viewCardContext)
    
    function handleOnClick (name , idof) {
        console.log(name);
        console.log(idof);
        scrollToCategory(name);
          setActiveCLassID(idof);
      }
    return (
        <>
         <div className="categary" >
            {
                activeClassID === idof ? ( <div id= 'check'></div>) : ""
            }
            <div onClick={() => handleOnClick(name, idof)} className={`categary-imgCon ${ activeClassID === idof ? "play" :"" }  `  } id={idof}>
                {/* {console.log(id)} */}
                 <img className='categary-image' src='/dinner-icon-2.png' alt='icon-img' />
            </div>
            <div className='categary-name' 
            style={activeClassID === idof ? {color: "red"} : {}}
            >
                {name ? name : "coffee"} 
            </div>
            {activeClassID === idof ?
            <div className='active-underLine'> </div>
        : null    
        }
         </div>
        </>
    )
}