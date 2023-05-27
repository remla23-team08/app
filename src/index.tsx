import ReactDOM from "react-dom";
import * as React from "react";

import Button from 'react-bootstrap/Button';

import "./index.css"

const IndexPage = () => {
	return <div className="row my-3 mx-3">
	<div className=" Jumbotron col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
		<h1 className="display-4">Leave your restaurant review</h1>
		<p className="lead">You can leave your review for one of our restaurants: Gourmet Haven, Sizzle And Spice, Café Serendipity and Sea Breeze Grill</p>
		<hr className="my-4"/>
		<div className="span2">
			<p className="lead text-center">
				<Button className="btn-to-review btn-lg btn-block" href="restaurant-picker.html">Leave a review</Button>
			</p>
			<p className="lead text-center">
				<Button className="btn-to-overview btn-lg btn-block">Overview</Button>
			</p>
			<p className="lead text-center">
				<Button className="btn-to-contact btn-lg btn-block">Contact</Button>
			</p>
		</div>
	</div>
</div>
}

ReactDOM.render(<IndexPage />, document.getElementById("IndexPage"));
