const form = document.querySelector("form");
const fileInput = document.getElementById("file");
let file;

handleAudioFile = (e) => {
  file = e.target.files;
  $("#src").attr("src", URL.createObjectURL(file[0]));
  document.getElementById("audio").load();
  for (let i = 0; i <= file.length - 1; i++) {
    file = file[i];
  }
};

fileInput.addEventListener("change", handleAudioFile);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("files", file);

  let res;
  fetch("http://localhost:8080/upload_file", {
    method: "post",
    body: formData,
  })
    .then((res) => {
      res = res;
      console.log(res);
    })
    .catch((err) => ("Error occurred", err));

  if (res) {
    document.getElementById("requestResult").innerHTML = res;
  } else {
    document.getElementById("requestResult").innerHTML = "Error occurred";
  }
});
