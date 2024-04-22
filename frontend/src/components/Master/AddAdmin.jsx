import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { addAdmin } from "../../store/masterFunc"
import './masters.css'



export default function AddAdmin() {
const dispatch = useDispatch()
const {closeModal}= useModal()
const [email,setEmail] = useState()
const [firstName,setFirstName]= useState();
const [lastName,setLastName]= useState();
const [userName, setUserName] = useState();



const handleSubmit = (e) =>{
  e.preventDefault();
if(window.confirm(`You are granting Admin Access to the User ${firstName} ${lastName} Would You Like to Continue?`)){
 dispatch(addAdmin(email,userName,firstName,lastName)).then(closeModal)
}

}

  return (
    <div className="addadminform">
      <h1 style={{fontWeight:'bolder'}}>Add Admin Access</h1>
      <form onSubmit={handleSubmit}>
<label className="emal">User Email: </label>
<br/>
<input
type="text"
value={email}
onChange={(e)=> setEmail(e.target.value)}
style={{backgroundColor:'aquamarine'}}
/>
<br/>
<label className="usernm">UserName: </label>
<br/>
<input
type="text"
value={userName}
onChange={(e)=> setUserName(e.target.value)}
style={{backgroundColor:'aquamarine'}}
/>
<br/>
<label className="nm">User First Name: </label>
<br/>
<input
type="text"
value={firstName}
onChange={(e)=> setFirstName(e.target.value)}
style={{backgroundColor:'aquamarine'}}
/>
<br/>
<label className="lstnm">User Last Name: </label>
<br/>
<input
type="text"
value={lastName}
onChange={(e)=> setLastName(e.target.value)}
style={{backgroundColor:'aquamarine'}}
/>
<br/>
<br/>
<button type="submit" className="fin">Add Admin</button>
      </form>
    </div>
  )
}
