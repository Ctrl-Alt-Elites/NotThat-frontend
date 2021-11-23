// Styling
import './App.css';

// React imports
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'

// Components
import LoginForm from './Pages/LoginForm'
import SignUpForm from './Pages/SignUpForm'
import OptionDisplay from './Pages/OptionDisplay';
import Categories from './Pages/Categories';
import About from './Pages/About';
import Home from './Home';

// Functions
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

function App() {

  // States
  const [userData, setUserData] = useState([])
  const [restaurantData, setRestaurantData] = useState([])
  const [currentRestaurants, setCurrentRestaurants] = useState()

  // Functions
  const generateCategories = () => {
    // getRestaurants()
    let mergedCuisines = []
    let finalizedCuisineArray = []

    // Looping through all the restaurants to merge the cuisine all into one array
    restaurantData.forEach((restaurant) => {
        // Getting the cuisine key from the restaurant object
        let cuisineItems = parseString(restaurant.cuisines[0].name)
        mergedCuisines = [...mergedCuisines, ...cuisineItems]
    })

    // Stripping the merged arrays from duplicate cuisines
    mergedCuisines.forEach((item, index) => {
      if (!foundDuplicate(finalizedCuisineArray, item)) {finalizedCuisineArray.push(item)}
    })

    return finalizedCuisineArray
  }

  // User CRUD
  const getUsers = () => {
    fetch('http://localhost:4000/users', {
        method: 'GET'}
        )
        .then((res) => res.json())
        .then((data) => {setUserData(data)})
  }

  const postUser = (restaurant, setPlace) => {
    fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(restaurant)
        })
        .then(response => response.json())
        .then(data => setPlace({ name: "", passowrd: ""}))
        // .then(data => {getRestaurants()})
        
  }

  // Restaurant CRUD
  const getRestaurants = () => {
    fetch('http://localhost:4000/restaurants', {
        method: 'GET'}
        )
        .then((res) => res.json())
        .then((data) => {setRestaurantData(data)})
  }

  const postRestaurant = (restaurant, setPlace) => {
    fetch('http://localhost:4000/restaurants', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(restaurant)
        })
        .then(response => response.json())
        .then(data => setPlace({ name: "", zipcode: ""}))
        .then(data => {getRestaurants()})
        
  }

  const putRestaurant = (id, info) => {
    fetch(`http://localhost:4000/restaurants/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(data => {getRestaurants()})
  }

  
  const deleteRestaurant = (restaurant) => {
    fetch(`http://localhost:4000/restaurants/${restaurant}`, {
            method: 'DELETE',
        })
        .then(data => {getRestaurants()})
  }




  return (
    <div className="App">
      <nav>
        <ul className="navbar">
          <li><Link to="/home" >Home</Link></li>
          <li><Link to="/favorites" >Favorites</Link></li>
          <li><Link to="/categories">Categories</Link> </li>
        </ul>
      </nav>
      <h1>Not That</h1>
      
      <Routes>
        {/* Login Form */}
        <Route path="/"element={<LoginForm
        userData={userData}
        getUsers={getUsers}
        postUser={postUser}
        />}/>

        <Route path="/register"element={<SignUpForm
        userData={userData}
        getUsers={getUsers}
        />}/>
        
        {/* Home */}
        <Route path="/home"element={<Home 
        restaurantData={restaurantData} 
        setRestaurantData={setRestaurantData} 
        // CRUD Methods
        getRestaurants={getRestaurants} 
        postRestaurant={postRestaurant} 
        />}/>

          {/* Favorites */}
        <Route exact path="/favorites" element={<About
        restaurantData={restaurantData} 
        setRestaurantData={setRestaurantData} 
        // CRUD Methods
        getRestaurants={getRestaurants} 
        postRestaurant={postRestaurant} 
        putRestaurant={putRestaurant}
        deleteRestaurant={deleteRestaurant}
        />}/>

        {/* Categories */}
        <Route exact path="/categories" element={<Categories
        getRestaurants={getRestaurants} 
        restaurantData={restaurantData}
        foundDuplicate={foundDuplicate}
        generateCategories={generateCategories}
        setCurrentRestaurants={setCurrentRestaurants}
        />}/>

        <Route exact path="/options" element={<OptionDisplay
        currentRestaurants={currentRestaurants}
        />}/>
      </Routes>
    </div>
  );
}

export default App;
