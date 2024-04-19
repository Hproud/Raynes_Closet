import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkSuggestions, editSugg, findOneSug } from "../../store/suggestion"
import { useModal } from "../../context/Modal"


export default function EditSuggestionModal({id}) {
  // const id = useSelector(state => state.suggestions?.suggestion?.id)
const dispatch = useDispatch()
const sugg = useSelector((state) => state.suggestions?.suggestion?.suggestion)
useEffect(()=>{
    dispatch(findOneSug(id))
},[dispatch,id])

// const sugg = useSelector((state) => state.suggestions.suggestion?.suggestion)
const [suggestion,setSuggestion] = useState()
const {closeModal} = useModal()

const handleSubmit = (e) =>{
    e.preventDefault();
dispatch(editSugg(id, suggestion)).then(closeModal).then(()=>dispatch(checkSuggestions()))
}

console.log(sugg, 'when i hit the button')

  return (
    <div>
        <h1>Update Your Suggestion!</h1>
        <form onSubmit={handleSubmit}>
            <label>Please Write Your Updated Suggestion Below!</label>
            <br/>
            <textarea
            type='textbox'
            value={suggestion}
            placeholder={sugg}
            onChange={(e)=> setSuggestion(e.target.value)}
            />
            <br/>
            <button type="submit" >Submit Update</button>
        </form>
    </div>
  )
}
