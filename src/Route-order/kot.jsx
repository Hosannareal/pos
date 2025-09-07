import './kot.css'
import OrderedItem from './orderedItem'

 export default function ({orderList}) {
    
    return(<>
         <div className='kot'> 
                <div className='kot-time'>
                <div>  KOT (1)</div>
                <div className='time-ago'> 30 sec</div>
                 </div>
                 <hr className='kot-seperaton'></hr>
                 {
                orderList.length > 0 ? 
                        orderList.map((item ,index)=> {
                        return <OrderedItem  item={item}/>
                    })
                : null
                 }
 
               </div>

    </>)
 }