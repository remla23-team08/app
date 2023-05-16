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
  const [sentiment, setSentiment] = React.useState("")
  // validated is the state that describes if the form is validated
  const [validated, setValidated] = React.useState(false);
  // while validForm is the state that describes if the form is valid
  const [validForm, setValidForm] = React.useState(false);
  // sentimentReceived describes if a sentiment was received from the API call
  const [sentimentReceived, setSentimentReceived] = React.useState(false);

  // Function that handles sending the review with an API call 
  const sendData = (data) => {
    const XHR = new XMLHttpRequest();
  
    XHR.onreadystatechange = function () {
      console.log(XHR);
      // Check if we get a successful response to our request
      if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
        console.log("Successful Request");
        console.log(XHR.responseText);
        let prediction = JSON.parse(XHR.responseText).prediction;
        if (prediction == 0) {
          setSentiment(badReview);
        } else {
          setSentiment(goodReview);
        }
        // We received a sentiment without errors so we change the state
        setSentimentReceived(true)
      } else {
        setSentiment("Error occurred.");
      }
    };
  
    // Set up our request
    XHR.open("POST", process.env.MODEL_SERVICE_URL);
  
    XHR.setRequestHeader("Content-type", "application/json");
  
    // Send our object; HTTP headers are set automatically
    XHR.send(JSON.stringify(data));
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

  // If the state validForm is changed and it is set to true then send the review
  React.useEffect(
    function onChange() {
      if (validForm) {
        sendData({ review: review });
      }
    },
    [validForm]
  )

  return(
    <div className="mx-auto col-10 col-md-8 col-lg-4">

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
            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2" controlId="reviewFormCheck">
            <Form.Check type="checkbox" label="Agree to terms and conditions."/>
            <Form.Control.Feedback type="invalid">You must agree before submitting.</Form.Control.Feedback>
          </Form.Group>

          <Button type='submit' id='submit' className='btn btn-review my-2'>Submit</Button>

        </Form>

        <div hidden={!sentimentReceived} className='row'>

          <p className="h2 text-center my-4" id="requestResult">{sentiment}</p>

          <div className="col-sm-12 text-center">
              <p className="mb-0">For our validation, is the sentiment correctly analyzed:</p>
              <ButtonGroup>
                <Button id="good" className="btn btn-validation">👍</Button>
                <Button id="bad" className="btn btn-validation">👎</Button>
              </ButtonGroup>
          </div>
        </div>
      </div>
  )

}


ReactDOM.render(<ReviewForm />, document.getElementById('reviewForm'))