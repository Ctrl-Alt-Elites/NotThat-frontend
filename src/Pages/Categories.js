// React
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

// Styling
import './Categories.css'

// Components
import CategoryButton from '../Components/Button'

// Functions
function removeItemFromArray(arr, value) {
    let i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

function foundDuplicate(Arr, InitialItem) {
        
  for (let i = 0; i < Arr.length; i++) {
      let item = Arr[i]
      if (InitialItem === item) {
          return true
      }
  }
  return false
}

const parseString = (string) => {
  return string.split(/[ ,]+/);  
}

export default function Categories(props) {

    //Cat

    // States
    const [display, setDisplay] = useState()
    const [categories, setCategories] = useState([])

    // Initial Loading Display
    let myArray = props.generateCategories()

    useEffect(() => {
        props.getRestaurants()

        setDisplay(

            // Mapping out the generated categories and creating a button per category on page load
            props.generateCategories().map((item, index) => {
                return (
                  <CategoryButton 
                  triggerRemove={triggerRemove}
                  context={item}
                  />
                )
            })

        )

        setCategories(props.generateCategories())
        
    }, [])

    // Functions
    function getRestaurantById(Id) {

      let restaurantData = props.restaurantData

      for (let i = 0; i < restaurantData.length; i++) {
        if (restaurantData[i]._id === Id) {
          return restaurantData[i]
        }
      }


    }

    function triggerRemove(value) {

        // Removing the clicked category from the arrays
        myArray = removeItemFromArray(myArray, value)
        

        // Mapping
        // Creating li's from the finalized table with all duplicates removed
        let myCategories =  myArray.map((item, index) => {
            return (
              <CategoryButton 
              triggerRemove={triggerRemove}
              context={item}
              />
            )
        })

        setDisplay(myCategories)
        setCategories(myArray)
    }

    function queryRestaurants(targetCuisineItem) {
      // initialize an array 
      let queryResults = []

      // loop through the restaurants to check on whether the `targetCuisineItem` is within the restaurant's cuisine list
      props.restaurantData.forEach((restaurant) => {

        // convert cuisine list to a table *subject to change*
        let cuisineList = parseString(restaurant.cuisines[0].name)
        
        // cuisine list loop through
        for (let i = 0; i < cuisineList.length; i++) {
          // setting the current cuisine as a variable
          let currentCuisineItem = cuisineList[i]

          // if the current cuisine ^ is the same as the cuisine we're searching for
          if (currentCuisineItem === targetCuisineItem) {

            if (queryResults.indexOf(restaurant._id) === -1) {
              queryResults.push(restaurant._id)
            }
          }
        }

      })


      return queryResults
    }

    function compileChoices() {

      // Creating an array to store all the ids
      let restaurantQuery = []
      // Creating a queried array for finalized restaurant list
      let queriedRestaurants = []

      // Looping through each nondeleted categories
      categories.forEach((targetCuisine) => {
        // searching through the restaurants' cuisines to check for matches with the target cuisine
        queryRestaurants(targetCuisine).forEach((id) => {
          // only push the restaurant id if it is not already in the list
          if (restaurantQuery.indexOf(id) === -1) {
            restaurantQuery.push(id)
          }
        })
      })

      restaurantQuery.forEach((Id) => {
        // query through the restaurants to get them by id
        queriedRestaurants.push(getRestaurantById(Id))
      })

      console.log(queriedRestaurants)
      props.setCurrentRestaurants(queriedRestaurants)
    }

    
    

    return (
        <div>
          <h3>click what you don't want and hit submit.</h3>
          <div className="categories">
            {display}
          </div>
          <Link to="/options" > 
          <button onClick={compileChoices} className="submit-button submit">
            Submit
          </button>
          </Link>
        </div>
    )

}