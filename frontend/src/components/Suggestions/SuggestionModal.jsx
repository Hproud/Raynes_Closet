import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { makeSuggestion } from "../../store/suggestion"
import './suggestion.css'
import { GiClothes } from "react-icons/gi";
import { FcCollaboration } from "react-icons/fc";





export default function SuggestionModal() {
    const [suggestion,setSuggestion] = useState('')
const {closeModal} = useModal()
const dispatch = useDispatch()


const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(makeSuggestion(suggestion)).then(closeModal)
}


  return (
    <div className="suggy">
        <h1 style={{textDecoration:'wavy Underline'}}><GiClothes /> Suggestions <FcCollaboration /></h1>
        <p style={{position:'relative',left: ' 18px'}}>Want to see Something for Sale?</p>
        <p style={{position:'relative',bottom:'30px',left:'25px'}}>Something We Can do better?</p>
        <h3 style={{position:'relative',bottom:'40px',left:'30px'}}>Let Us Know Below!</h3>
        <form onSubmit={handleSubmit}>
            <label style={{position:'relative',bottom: '50px'}}>Please Write Your Suggestion Below!</label>
            <br/>
            <textarea
            type='textbox'
            value={suggestion}
            onChange={(e)=> setSuggestion(e.target.value)}
            placeholder="Please be as detailed as possible!"
            style={{position:'relative',
          width:'250px',height:'150px',borderWidth: ' 3px',borderColor:'black',
        bottom:'40px',
      backgroundColor:'sandybrown',
    color:'black'}}

            />
            <br/>
            <button className="subsugg" type="submit" >Submit Suggestion</button>
        </form>
    </div>
  )
}
