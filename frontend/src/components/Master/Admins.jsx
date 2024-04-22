import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllAdmins, removeAdminStatus } from "../../store/masterFunc"
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import AddAdmin from '../Master/AddAdmin'
import './masters.css'




export default function Admins() {
 const dispatch = useDispatch()
const admins = useSelector(state =>  state.admins?.admins)

useEffect(()=>{
dispatch(getAllAdmins())
},[dispatch])


const remove = (id) =>{
    dispatch(removeAdminStatus(id)).then(()=> dispatch(getAllAdmins()))
}


    return (
    <div>
        <div style={{position:'relative', top:'140px'}}>
        <OpenModalButton
        buttonText={'Add New Admin'}
        modalComponent={<AddAdmin />}
        onButtonClick={() => <AddAdmin/>}
        />
        </div>
        <h1 style={{position:'relative',left:'200px',fontSize:'45pt'}}>Authorized Admins</h1>
        <hr color="black"/>
        <ul style={{display:'flex',flexWrap:'wrap'}}>
            {admins && admins.map((admin)=>(
                <li key={admin.id} className="empl">
                    <h4 style={{fontSize:'15pt'}}>Admin Name:</h4>
                    <p style={{fontWeight:'bold'}}>{admin.firstName} {admin.lastName}</p>
                    <h4 style={{fontSize:'15pt'}}>Admin Email: </h4>
                    <p style={{fontWeight:'bold'}}>{admin.email}</p>
                    <h4 style={{fontSize:'15pt'}}>Admin UserName: </h4>
                    <p style={{fontWeight:'bold'}}>{admin.username}</p>
                    <br/>
                    <button className={'removeadmin'}
                    onClick={()=> remove(admin.id)}>Remove Admin Status</button>
                <br/>
                </li>
            ))}
        </ul>
            <hr color="black"/>
    </div>
  )
}
