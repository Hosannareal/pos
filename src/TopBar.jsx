import './TopBar.css'

export default function ({name , tableNo}) {

    return(
        <>
       <div className="top-bar"  style={{display:"flex", justifyContent: "space-between"}}>
        <div className='rest-info '> 
        <div className="rest-imgContainer"  ><img  className="rest-img"  src='/bg-app.jpg' alt="photo" /></div>
        <div className="rest-name">{name}</div>

        </div>
         <div id='table-no'>Table no</div>

        </div> 
        </>
    )
}