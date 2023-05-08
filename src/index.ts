const btn = document.getElementById("submit");
const reqResult = document.getElementById("requestResult");
const badReview: string = "I'm sorry to hear you had a bad experience.";
const goodReview: string = "I'm glad to hear you had a good experience.";

btn.addEventListener("click", () => {
  let review = (<HTMLInputElement>document.getElementById("review")).value;
  sendData({ review: review });
});

function sendData(data) {
  const XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
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
