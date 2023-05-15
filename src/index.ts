const form = document.getElementById("reviewForm")
form.addEventListener("submit", onSubmit)
const reqResult = document.getElementById("requestResult");
const afterSubmit = document.getElementById("afterSubmit");
const badReview: string = "We are sorry to hear you had a bad experience. 🙁";
const goodReview: string = "We are glad to hear you had a good experience. 😀";

function onSubmit(event) {
  event.preventDefault()
  console.log(event)
  if(checkForms()){ 
    let review = (<HTMLInputElement>document.getElementById("reviewField")).value;
    sendData({ review: review });
    afterSubmit.style.visibility = "visible"
  }
}

function checkForms(): boolean {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementById('reviewForm')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }

        form.classList.add('was-validated')
      }, false)
    })
  return true
}

function sendData(data) {
  const XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    console.log(XHR);
    if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
      console.log("Successful Request");
      console.log(XHR.responseText);
      let prediction = JSON.parse(XHR.responseText).prediction;
      if (prediction == 0) {
        reqResult.textContent = badReview;
      } else {
        reqResult.textContent = goodReview;
      }
    } else {
      reqResult.textContent = "Error occurred.";
    }
  };

  // Set up our request
  XHR.open("POST", process.env.MODEL_SERVICE_URL);

  XHR.setRequestHeader("Content-type", "application/json");

  // Send our object; HTTP headers are set automatically
  XHR.send(JSON.stringify(data));
}
