// React
import React, { useState } from 'react'

import './RestaurantForm.css'

// Functions
const parseString = (string) => {
    return string.split(/[ ,]+/);  
  }

const RestaurantForm = (props) => {

    // States
    const [place, setPlace] = useState({ name: "", zipcode: ""})
    const [cuisines, setCuisines] = useState('')

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault()

        // creating an info object to post to the database
        let info = {name: place.name, zipcode: place.zipcode, cuisines: [{name: cuisines}]}
        
        if (cuisines !== '' && place.name !== '' && place.zipcode !== '') {
            props.postRestaurant(info, setPlace)
        }
    }

     // handling the input changes
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        const copy = Object.assign({}, place)

        copy[name] = value

        setPlace(copy)
    }

    // Setting Cuisine Changes
    const handleCuisineChange = (e) => {
        const value = e.target.value
        const foodArray = parseString(value)
        setCuisines(value)
    }

    return (
    <div className="restaurant-container">
        <div className="restaurant-form">
            <form onSubmit={handleSubmit}>
                <input className="input-field" onChange={handleChange} type="text" name="name" placeholder="Restaurant" value={place.name}/>
                <input className="input-field" onChange={handleChange} type="text" name="zipcode" placeholder="Zipcode" value={place.zipcode}/>
                <input className="input-field" onChange={handleCuisineChange} type="text" name="cuisines" placeholder="Cuisines" value={cuisines.value}/>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    </div>
    )

}

export default RestaurantForm