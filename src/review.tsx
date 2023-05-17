import ReactDOM from 'react-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import { ButtonGroup } from 'react-bootstrap';

// Set types of sentiment
const badReview: string = "We are sorry to hear you had a bad experience. 🙁";
const goodReview: string = "We are glad to hear you had a good experience. 😀";

// React component that includes the form
const ReviewForm = () => {

  // review is state that contains the current review left by the user
  const [review, setReview] = React.useState("")
  // sentiment is the current sentiment of the review
  const [sentiment, setSentiment] = React.useState(true)
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
        // We received a sentiment without errors so we change the state
        setSentimentReceived(true)
      } 
      // If we get a server of client error show error message
      if (/(4|5)\d\d/.test(String(XHR.status))) {
        setErrorOccurred(true)
      }
    };
  
    // Set up our request
    XHR.open("POST", process.env.MODEL_SERVICE_URL+"predict");
  
    XHR.setRequestHeader("Content-type", "application/json");

    console.log(XHR)
  
    // Send our object; HTTP headers are set automatically
    XHR.send(JSON.stringify(reviewData));
  }

  const sendAccuracy = (accuracyData) => {
    console.log(accuracyData)
    const XHR = new XMLHttpRequest();
  
    XHR.onreadystatechange = function () {
      // console.log(XHR);
      // Check if we get a successful response to our request
      if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
        // console.log("Successful Request");
        // console.log(XHR.responseText);
      } 
      // If we get a server of client error show error message
      if (/(4|5)\d\d/.test(String(XHR.status))) {
        setErrorOccurred(true)
        console.log(XHR)
      }
    };
  
    console.log("opening...")
    // Set up our request
    XHR.open("POST", process.env.MODEL_SERVICE_URL+"model-accuracy");
  
    XHR.setRequestHeader("Content-type", "application/json");

    console.log(XHR)

    console.log("sending...")
    // Send our object; HTTP headers are set automatically
    XHR.send(JSON.stringify(accuracyData));
  }

  // Function that handles when submit is pressed on the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } 
    if (form.checkValidity() === true) {
      // If the form is valid we change the state
      setValidForm(true)
    }
    setValidated(true);
  };

  const handleAccuracy = (event) => {
    if(!accuracyGiven) {
      let accuracy = null;
      if(event.target.id == "bad") {
        accuracy = false;
        document.getElementById("bad").classList.add("btn-accuracy-clicked");
      } else {
        accuracy = true;
        document.getElementById("good").classList.add("btn-accuracy-clicked")
      }
      setAccuracyGiven(true);
      sendAccuracy({
        prediction: sentiment ? 1 : 0,
        accuracy: accuracy
      })
    }
  }

  // If the state validForm is changed and it is set to true then send the review
  React.useEffect(
    function onChange() {
      if (validForm) {
        sendReview({ review: review });
      }
    },
    [validForm]
  )

  return(
    <div className="mx-auto col-10 col-md-8 col-lg-4">
      <div className="alert alert-danger" role="alert" hidden={!errorOccured}>
        An error occurred
      </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group className='my-2' controlId='reviewFormName'>
            <Form.Label>Full name</Form.Label>
            <Form.Control required placeholder='Your name'/>
            <Form.Control.Feedback type='invalid'>Please provide your full name.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="reviewFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="name@mail.com" />
            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="reviewFormReview">
            <Form.Label>Leave your review here</Form.Label>
            <Form.Control required as="textarea" rows={3} value={review} onChange={(e) => setReview(e.target.value)}/>
            <Form.Control.Feedback type="invalid">Please provide a valid review.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="reviewFormCheck">
            <Form.Check type="checkbox" label="Agree to terms and conditions."/>
            <Form.Control.Feedback type="invalid">You must agree before submitting.</Form.Control.Feedback>
          </Form.Group>

          <Button type='submit' id='submit' className='btn btn-review my-2'>Submit</Button>

        </Form>

        <div hidden={!sentimentReceived} className='row'>

          <p className="h2 text-center my-4" id="requestResult">{sentiment ? goodReview : badReview}</p>

          <div className="col-sm-12 text-center">
              <p className="mb-0">For our validation, is the sentiment correctly analyzed:</p>
              <ButtonGroup onClick={handleAccuracy}>
                <Button id="good" disabled={accuracyGiven} className="btn btn-accuracy">👍</Button>
                <Button id="bad" disabled={accuracyGiven} className="btn btn-accuracy">👎</Button>
              </ButtonGroup>
          </div>
        </div>
      </div>
  )

}


ReactDOM.render(<ReviewForm />, document.getElementById('reviewForm'))