import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as React from "react";
import { ButtonGroup } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import Image from "react-bootstrap/Image"

import "./review.css"

// Set types of sentiment
const badReview: string = "We are sorry to hear you had a bad experience. 🙁";
const goodReview: string = "We are glad to hear you had a good experience. 😀";

// React component that includes the form
const ReviewForm = ({restaurantName}) => {


  // review is state that contains the current review left by the user
  const [review, setReview] = React.useState("");
  // sentiment is the current sentiment of the review
  const [sentiment, setSentiment] = React.useState(true);
  // validated is the state that describes if the form is validated
  const [validated, setValidated] = React.useState(false);
  // while validForm is the state that describes if the form is valid
  const [validForm, setValidForm] = React.useState(false);
  // sentimentReceived describes if a sentiment was received from the API call
  const [sentimentReceived, setSentimentReceived] = React.useState(false);

  const [accuracyGiven, setAccuracyGiven] = React.useState(false);
  const [errorOccured, setErrorOccurred] = React.useState(false);

  // Function that handles sending the review with an API call
  const sendReview = (reviewData) => {
    // Set sentiment and accuracy variables to default to handle new submit
    setSentimentReceived(false)
    setAccuracyGiven(false)
    document.getElementById("good").classList.remove("btn-accuracy-clicked");
    document.getElementById("bad").classList.remove("btn-accuracy-clicked");

    const XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
      console.log(XHR);
      // Check if we get a successful response to our request
      if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
        console.log("Successful Request");
        console.log(XHR.responseText);
        let prediction = JSON.parse(XHR.responseText).prediction;
        if (prediction == 0) {
          setSentiment(false);
        }
        else {
          setSentiment(true)
        }
        // We received a sentiment without errors so we change the state
        setSentimentReceived(true);
      }
      // If we get a server of client error show error message
      if (/(4|5)\d\d/.test(String(XHR.status))) {
        console.log("Unsuccessful Request")
        setErrorOccurred(true);
        console.log(XHR);
      }
    };

    // Set up our request
    XHR.open("POST", process.env.MODEL_SERVICE_URL + "/predict");

    XHR.setRequestHeader("Content-type", "application/json");

    console.log(XHR);

    // Send our object; HTTP headers are set automatically
    XHR.send(JSON.stringify(reviewData));

    // Set form variables to false again to handle new submits
    setValidForm(false)
    setValidated(false)
  };

  const sendAccuracy = (accuracyData) => {
    console.log(accuracyData);
    const XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
      // Check if we get a successful response to our request
      if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
        console.log("Successful Request");
        console.log(XHR.responseText);
      }
      // If we get a server of client error show error message
      if (/(4|5)\d\d/.test(String(XHR.status))) {
        console.log("Unsuccessful Request")
        setErrorOccurred(true);
        console.log(XHR);
      }
    };

    // Set up our request
    XHR.open("POST", process.env.MODEL_SERVICE_URL + "/model-accuracy");

    XHR.setRequestHeader("Content-type", "application/json");

    console.log(XHR);

    // Send our object; HTTP headers are set automatically
    XHR.send(JSON.stringify(accuracyData));
  };

  // Function that handles when submit is pressed on the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (form.checkValidity() === true) {
      // If the form is valid we change the state
      setValidForm(true);
    }
    setValidated(true);
  };

  const handleAccuracy = (event) => {
    if (!accuracyGiven) {
      let accurate = null;
      if (event.target.id == "bad") {
        accurate = false;
        document.getElementById("bad").classList.add("btn-accuracy-clicked");
      } else {
        accurate = true;
        document.getElementById("good").classList.add("btn-accuracy-clicked");
      }
      setAccuracyGiven(true);
      sendAccuracy({
        prediction: sentiment ? 1 : 0,
        accurate: accurate,
        restaurantName: restaurantName, 
      });
    }
  };

  // If the state validForm is changed and it is set to true then send the review
  React.useEffect(
    function onChange() {
      if (validForm) {
        sendReview({ 
          review: review,
          restaurantName: restaurantName, 
        });
      }
    },
    [validForm]
  );

  return (
    <div className="mx-auto col-10 col-md-8 col-lg-4">
      <div className="alert alert-danger" role="alert" hidden={!errorOccured}>
        An error occurred
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="reviewFormName">
          <Form.Label>Full name</Form.Label>
          <Form.Control required placeholder="Your name" />
          <Form.Control.Feedback type="invalid">
            Please provide your full name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-2" controlId="reviewFormEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="name@mail.com" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-2" controlId="reviewFormReview">
          <Form.Label>Leave your review here</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid review.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-2" controlId="reviewFormCheck">
          <Form.Check type="checkbox" label="Agree to terms and conditions." />
          <Form.Control.Feedback type="invalid">
            You must agree before submitting.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" id="submit" className="btn btn-review my-2">
          Submit
        </Button>
      </Form>

      <div hidden={!sentimentReceived} className="row">
        <p className="h2 text-center my-4" id="requestResult">
          {sentiment ? goodReview : badReview}
        </p>

        <div className="col-sm-12 text-center">
          <p className="mb-0">
            For our validation, is the sentiment correctly analyzed:
          </p>
          <ButtonGroup onClick={handleAccuracy}>
            <Button
              id="good"
              disabled={accuracyGiven}
              className="btn btn-accuracy"
            >
              👍
            </Button>
            <Button
              id="bad"
              disabled={accuracyGiven}
              className="btn btn-accuracy"
            >
              👎
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

type RestaurantType = {
  restaurantName: string
  urlToImage: string
}

const ReviewPage = () => {
  // Get the restaurant properties from the restaurant picker state
  const location = useLocation()
  const { restaurantName, urlToImage }: RestaurantType = location.state

  const imageWidthHeight = 100

  //Todo add image support
  return <div>
      {/* <div className='imageContainer mt-2'>
      <Image height={imageWidthHeight} width={imageWidthHeight} className='logo mx-3 text-center' src={require("" + urlToImage)} />
      </div> */} 
      <div className="row mx-3 mb-3">
        <h1 className="text-center">Please leave your review of {restaurantName}:</h1>
        <ReviewForm restaurantName={restaurantName}/>
      </div>
  </div>
}

export default ReviewPage
