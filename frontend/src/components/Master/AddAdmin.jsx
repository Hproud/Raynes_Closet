import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { addAdmin } from "../../store/masterFunc"




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
    <div>
      <h1>Add Admin Access</h1>
      <form onSubmit={handleSubmit}>
<label>User Email: </label>
<br/>
<input
type="text"
value={email}
onChange={(e)=> setEmail(e.target.value)}
/>
<br/>
<label>UserName</label>
<br/>
<input
type="text"
value={userName}
onChange={(e)=> setUserName(e.target.value)}
/>
<br/>
<label>User First Name: </label>
<br/>
<input
type="text"
value={firstName}
onChange={(e)=> setFirstName(e.target.value)}
/>
<br/>
<label>User Last Name: </label>
<br/>
<input
type="text"
value={lastName}
onChange={(e)=> setLastName(e.target.value)}
/>
<br/>
<br/>
<button type="submit">Add Admin</button>
      </form>
    </div>
  )
}
