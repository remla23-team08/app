import * as React from "react";

import './home.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return <div className="row my-3 mx-3">
	<div className=" Jumbotron col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
		<h1 className="display-4">Leave your restaurant review</h1>
		<p className="lead mb-1">You can leave your review for one of our restaurants: </p>
		<ul className='lead mx-4'>
			<li>Gourmet Haven</li>
			<li>Sizzle & Spice</li>
			<li>Café Serendipity</li>
			<li>Sea Breeze Grill</li>
		</ul>
		<hr className="my-4"/>
		<div className="span2">
			<p className="lead text-center">
				<Link to="/restaurant-picker">
					<Button className="btn-home-page btn-lg btn-block">Leave a review</Button>
				</Link>
			</p>
			<p className="lead text-center">
				<Button className="btn-home-page btn-lg btn-block">Overview</Button>
			</p>
			<p className="lead text-center">
				<Button className="btn-home-page btn-lg btn-block">Contact</Button>
			</p>
		</div>
	</div>
</div>
}

export default HomePage;