

 import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate() ;

  const handleClick = () => {
    navigate('/Menu')
  }


  return(
    <>
    <div className="bg-home" >
        <div className='card'> 
          WELCOME TO OUR RESTOURANT 
            <button className='home-btn' onClick={handleClick}> Palce Your Order →</button>
        </div>
       </div>
    </>
  )
 }