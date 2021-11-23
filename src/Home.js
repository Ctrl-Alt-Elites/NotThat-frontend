import RestaurantForm from "./Pages/RestaurantForm"

const Home = (props) => {
    return (
        <>
        <h3>Tell us about your favorite restaurant </h3>
        
            <RestaurantForm 
            restaurantData={props.restaurantData} 
            setRestaurantData={props.setRestaurantData} 
            getRestaurants={props.getRestaurants}
            postRestaurant={props.postRestaurant}
            />
    
        </>
    )
}

export default Home