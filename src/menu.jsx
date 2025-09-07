import './menu.css'
import SubMenu from './Submenu.jsx'
import { useRef,useEffect,useContext } from 'react'
import viewCardContext from './context/ViewCardContext'
import { POSContext } from './context/POSContext.jsx'


export default function ({name , no , items}){

  const { posData } = useContext(POSContext);
  const category = posData.categories.find(cat => cat.name === name);
    
  const menuRef = useRef();
  const { setMenuRef } = useContext(viewCardContext);

  // Set the menuRef in context when this component mounts
//   console.log(name + "...")
  const { registerMenuRef , currentCat} = useContext(viewCardContext);

  useEffect(() => {
    registerMenuRef(name, menuRef); // Register this ref by name
  }, [name]);


     return  (
        <>
        <div ref={menuRef} className='main-menu'>
            <div className='menu-topbar'>
            <div id='menu-name'>
            {name} ({no})
            </div>
            <div id='menu-downArrow'>
                 <img src='./down-arrow-icon.png' alt='down-arrow-icon' />
            </div>

            </div>
            <div id='plain-divider'><hr /></div>
            <div className='subMenu'> 
                
                {/* {
                  category?.items?.map((item, index) => (
                     <SubMenu key={item.id} item={item} />
                     ))
                     } */}
                {
                  items?.map((item , index) => (
                     <SubMenu key={item.id} item={item} />
                  ))
                }



            </div>
        </div>
         </>
    )
}