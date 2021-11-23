// React
import { useState, useEffect } from "react"

// Styling
import './PlaceCard.css'

// Functions
const parseString = (string) => {
    if(!string){
        return []
    }else{
    return string.split(/[ ,]+/);  
    }
}

// Component
const PlaceCard = (props) => {

    // States
    const [ updating, setUpdating] = useState(false) 
    const [info, setInfo] = useState({ name: "", zipcode: ""})
    const [cuisines, setCuisines] = useState('')
    const id = props.value._id
    

    // Functions
    const update = () => {
        setUpdating(!updating) //setting the ternary boolean
    }

    const finalizeUpdate = async (e) => {
        e.preventDefault()

        let infoNew = {name: info.name, zipcode: info.zipcode, cuisines: [{name: cuisines}]}

        update() // for setting the ternary boolean
        props.handleUpdate() // just console logs 'updated'
        props.putRestaurant(id, infoNew) // sending post request
    }
    

    const handleEdit = (e) => {
        const value = e.target.value
        const name = e.target.name
        const copy = Object.assign({}, info)
        copy[name] = value
        setInfo(copy)
    }

    // Setting Cuisine Changes
    const handleCuisineChange = (e) => {
        const value = e.target.value
        const foodArray = parseString(value)
        console.log(value)
        if (value !== "" || value !== " ") {setCuisines(value)}
    }

    let CuisineArray = parseString(props.value.cuisines[0].name)
    let CuisineItems = CuisineArray.map((cuisineItem) => {
        return (
            <li>
                {cuisineItem}
            </li>
        )
    })

    useEffect(() => {
        setInfo({name: props.value.name, zipcode: props.value.zipcode})
        setCuisines(props.value.cuisines[0].name)
    }, [])


    return (
        
        <div class="place-card">
            <p className="hide-me">{props.value._id}</p>
            {updating ? 
            <form onSubmit={finalizeUpdate}>
                <input className="place-card-input-field" onChange={handleEdit} name="name" value={info.name} type="text" placeholder="Restaurant" />
                <input className="place-card-input-field" onChange={handleEdit} name="zipcode" value={info.zipcode} type="text" placeholder="Location" />
                <input className="place-card-input-field" onChange={handleCuisineChange} name="cuisines" value={cuisines} type="text"  placeholder="Cuisines"/>
                <button type="submit">Save</button>
            </form> : 
            ''
            }
            {!updating ? <div className="restaurant-name">{props.value.name}</div> : ''}
            {!updating ? <div className="location">{props.value.zipcode}</div> : ''}
            {!updating ? <div className="flexible"><ul className="cuisine-list">{CuisineItems} </ul></div> : <div class="flexible"></div>}
            <div>{updating ? "" : <button className="update-button" onClick={update}>Update</button>} <button onClick={props.handleDelete}>Delete</button></div>
        </div>


    )
}   
export default PlaceCard