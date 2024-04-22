import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkSuggestions, removeSugg } from "../../store/suggestion"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import EditSuggestionModal from "./EditSuggestionModal"
import './suggestion.css'



export default function SuggestionsPage() {
const dispatch = useDispatch()
const suggestions = useSelector(state => state.suggestions?.suggestions)
const admin = useSelector(state => state.session?.user.isAdmin)
const master = useSelector(state => state.session?.user.isMaster)
useEffect(()=>{

    dispatch(checkSuggestions())

},[dispatch,suggestions?.length])

const remove = (id) =>{
dispatch(removeSugg(id))
}

const editing = async (id) =>{
// dispatch(findOneSug(id))
return <EditSuggestionModal id={id}/>
}

  return (
    <div className="whole">
        <h1 className="sugtitle">Submitted Suggestions</h1>
<ul className="lsted">
    {suggestions && suggestions.map((suggestion) => (
        <li className="sug" key={suggestion.id}>
{(admin || master) && (
    <div className="user">
<h4 className="user">User: </h4>
<p className="user1">{" "}{suggestion.User?.firstName} {suggestion.User?.lastName}</p>
<h4>Suggestion: </h4>
<p>{suggestion.suggestion}</p>
<h4>Submitted On: </h4>
<p>{(suggestion.updatedAt).slice(0,10)}</p>


    </div>
)}
{!master && !admin && (
    <div className="consumersuggestions">
        <h3>Suggestion: </h3>
        <p>{suggestion.suggestion}</p>
        <h4>Submitted On: </h4>
        <p>{(suggestion.updatedAt).slice(0,10)}</p>
    <div style={{position:'relative',left:'30px',bottom:'3px'}}>

        <OpenModalButton
        buttonText={'Edit Suggestion'}
        modalComponent={
            <EditSuggestionModal id={suggestion.id} />
        }
        onButtonClick={()=> editing(suggestion.id)}
/>{" "}
<button onClick={()=>remove(suggestion.id)}
style={{
    position:'relative',
    top: '2px'

}}
>Delete Suggestion</button>
</div>

    </div>
)}
        </li>
    ))}
</ul>
    </div>
  )
}
