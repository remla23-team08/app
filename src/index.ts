const btn = document.getElementById("submit");
const reqResult = document.getElementById("requestResult");
const badReview: string = "I'm sorry to hear you had a bad experience.";
const goodReview: string = "I'm glad to hear you had a good experience.";

btn.addEventListener("click", () => {
  let review = (<HTMLInputElement>document.getElementById("review")).value;
  sendData({ submission: review });
});

function sendData(data) {
  const XHR = new XMLHttpRequest();
  const FD = new FormData();

  // Push our data into our FormData object
  FD.append("review", data.submission);

  XHR.onreadystatechange = function () {
    if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
      console.log("Successful Request");
      console.log(XHR.responseText);
    } else {
      if (Math.random() > 0.5) {
        reqResult.textContent = badReview;
      } else {
        reqResult.textContent = goodReview;
      }
    }
  };

  // Define what happens on successful data submission
  XHR.addEventListener("load", (event) => {
    alert("Yeah! Data sent and response loaded.");
  });

  // Define what happens in case of an error
  XHR.addEventListener("error", (event) => {
    alert("Oops! Something went wrong.");
  });

  // Set up our request
  XHR.open("POST", process.env.MODEL_SERVICE_URL);

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(FD);
}
