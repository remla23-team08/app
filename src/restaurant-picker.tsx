import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image"
import * as React from "react";
import "./restaurant-picker.css"

const imageWidthHeight = 250

const RestaurantPicker = () => {

	const goToReview = (restaurantName) => {
		console.log(restaurantName)
		window.location.href="review.html"
	}



	return <div className="text-center">
		<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-black mx-3' onClick={() => goToReview("Gourmet Haven")} src={require("../assets/gourmet_haven.png")} />
		<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-white mx-3' onClick={() => goToReview("Sizzle And Spice")} src={require("../assets/sizzle_and_spice.png")} />
		<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-white mx-3' onClick={() => goToReview("Café Serendipity")} src={require("../assets/cafe_serendipity.png")} />
		<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-white mx-3' onClick={() => goToReview("Sea Breeze Grill")} src={require("../assets/sea_breeze_grill.png")} />
	</div>
}

const RestaurantPage = () => {
	return <div className="row mx-3 my-3">
		<h1 className="text-center mb-5">Please choose a restaurant</h1>
		<RestaurantPicker />
	</div>
}

ReactDOM.render(<RestaurantPage />, document.getElementById("RestaurantPage"));