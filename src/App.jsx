
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import ViewCardProvider from './context/viewCardProvider.jsx';
import POSContext from './context/POSContext.jsx'; 
import './app.css'
import Home from './Home.jsx';
import Order from './Order.jsx';
import ViewCart from './viewCart/ViewCart.jsx'
import RouteOrder from './Route-order/Route-order.jsx';
import Billing from './billing/Billing.jsx';


export default function App() {
  return (
    <POSContext>
      <ViewCardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Menu" element={<Order />} />
            <Route path="/View-Cart" element={<ViewCart />} />
            <Route path="/Order" element={<RouteOrder />} />
            <Route path="/Billing" element={<Billing />} />
          </Routes>
        </BrowserRouter>
      </ViewCardProvider>
    </POSContext>
  );
}



// export default function App() {
   
//   return(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/order" element={
//           < ViewCardProvider>
//            <Order />
//           </ViewCardProvider>
//           } />
//       <Route path='/View-Cart' element={< ViewCart />} />
//       </Routes>
//     </BrowserRouter>
//   )
//  }





