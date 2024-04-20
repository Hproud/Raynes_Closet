import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllAdmins, removeAdminStatus } from "../../store/masterFunc"
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import AddAdmin from '../Master/AddAdmin'




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
        <OpenModalButton
        buttonText={'Add New Admin'}
        modalComponent={<AddAdmin />}
        onButtonClick={() => <AddAdmin/>}
        />
        <h1>Authorized Admins</h1>
        <hr/>
        <ul>
            {admins && admins.map((admin)=>(
                <li key={admin.id}>
                    <h4>Admin Name:</h4>
                    <p>{admin.firstName} {admin.lastName}</p>
                    <h4>Admin Email: </h4>
                    <p>{admin.email}</p>
                    <h4>Admin UserName: </h4>
                    <p>{admin.username}</p>
                    <br/>
                    <button onClick={()=> remove(admin.id)}>Remove Admin Status</button>
                <br/>
                <hr/>
                </li>
            ))}
        </ul>
    </div>
  )
}
