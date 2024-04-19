import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkSuggestions, findOneSug } from "../../store/suggestion"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import EditSuggestionModal from "./EditSuggestionModal"

export default function SuggestionsPage() {
const dispatch = useDispatch()
const suggestions = useSelector(state => state.suggestions?.suggestions)
const admin = useSelector(state => state.session?.user.isAdmin)
const master = useSelector(state => state.session?.user.isMaster)
useEffect(()=>{

    dispatch(checkSuggestions())

},[])



const editing = async (id) =>{
// dispatch(findOneSug(id))
return <EditSuggestionModal id={id}/>
}

  return (
    <div>
        <h1>Submitted Suggestions</h1>
<ul>
    {suggestions && suggestions.map((suggestion) => (
        <li key={suggestion.id}>
{(admin || master) && (
    <div>
<h4>User: </h4>
<p>{suggestion.User.firstName} {suggestion.User.lastName}</p>
<h4>Suggestion: </h4>
<p>{suggestion.suggestion}</p>
<h4>Submitted On: </h4>
<p>{(suggestion.updatedAt).slice(0,10)}</p>
<hr />

    </div>
)}
{!master && !admin && (
    <div>
        <h3>Suggestion: </h3>
        <p>{suggestion.suggestion}</p>
        <h4>Submitted On: </h4>
        <p>{(suggestion.updatedAt).slice(0,10)}</p>
        <OpenModalButton
        buttonText={'Edit Suggestion'}
        modalComponent={<EditSuggestionModal id={suggestion.id} />}
        onButtonClick={()=> editing(suggestion.id)}
/>{" "}
<button>Delete Suggestion</button>
        <hr />
    </div>
)}
        </li>
    ))}
</ul>
    </div>
  )
}
