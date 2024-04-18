function handleRedirect(url) {
  console.log(url);
  window.location.href = url + ".html";
}

let nameInputWrapper = document.getElementById("nameInputWrapper");
let editNameWrapper = document.getElementById("editNameWrapper");
editNameWrapper.style.display = "none";

// save button functionality
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", () => {
  nameInputWrapper.style.display = "none";
  document.getElementById("displayName").innerText = `Hello ${
    document.getElementById("nameInput").value
  }`;
  editNameWrapper.style.display = "block";
});

// change name functionality
changeNameButton = document.getElementById("changeNameBtn");
changeNameBtn.addEventListener("click", () => {
  nameInputWrapper.style.display = "flex";
  editNameWrapper.style.display = "none";
});
