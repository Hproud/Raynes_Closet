import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { makeSuggestion } from "../../store/suggestion"


export default function SuggestionModal() {
    const [suggestion,setSuggestion] = useState('')
const {closeModal} = useModal()
const dispatch = useDispatch()


const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(makeSuggestion(suggestion)).then(closeModal)
}


  return (
    <div>
        <h1>Suggestions</h1>
        <p>Want to see Something for Sale?</p>
        <p>Something We Can do better?</p>
        <h3>Let Us Know Below!</h3>
        <form onSubmit={handleSubmit}>
            <label>Please Write Your Suggestion Below!</label>
            <br/>
            <textarea
            type='textbox'
            value={suggestion}
            onChange={(e)=> setSuggestion(e.target.value)}
            />
            <br/>
            <button type="submit" >Submit Suggestion</button>
        </form>
    </div>
  )
}
