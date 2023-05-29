import Image from "react-bootstrap/Image"
import * as React from "react";
import "./restaurant-picker.css"
import { Link } from 'react-router-dom';

const imageWidthHeight = 250

const RestaurantPicker = () => {

	return <div className="text-center">
		<Link to="/review" state={{restaurantName: "Gourmet Haven", urlToImage: "../../assets/gourmet_haven.png"}}>
			<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-black mx-3' src={require("../../assets/gourmet_haven.png")} />
		</Link>
		<Link to="/review" state={{restaurantName: "Sizzle & Spice", urlToImage: "../../assets/sizzle_and_spice.png"}}>
			<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-white mx-3' src={require("../../assets/sizzle_and_spice.png")} />
		</Link>
		<Link to="/review" state={{restaurantName: "Café Serendipity", urlToImage: "../../assets/cafe_serendipity.png"}}>
			<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-white mx-3' src={require("../../assets/cafe_serendipity.png")} />
		</Link>
		<Link to="/review" state={{restaurantName: "Sea Breeze Grill", urlToImage: "../../assets/sea_breeze_grill.png"}}>
			<Image height={imageWidthHeight} width={imageWidthHeight} className='logo-white mx-3' src={require("../../assets/sea_breeze_grill.png")} />
		</Link>
	</div>
}

const RestaurantPage = () => {
	return <div className="row mx-3 my-3">
		<h1 className="text-center mb-5">Please choose one of our restaurants</h1>
		<RestaurantPicker />
	</div>
}

export default RestaurantPage
