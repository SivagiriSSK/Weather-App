// let galleryTemplate = null;
// let galleryList = [];

// get the response using fetch API
fetch("https://jsonplaceholder.typicode.com/photos?_limit=9")
  .then((res) => {
    console.log("Successfully Fetched the response");
    // get the response & convert to JSON
    return res.json();
  })
  .then((resInJson) => {
    // console.log(resInJson);
    // console.log(galleryList);
    console.log(resInJson);
    renderGalleryTemplate(resInJson);
  })
  // catch the error
  .catch((err) => {
    console.log("Inside the Catch");
  })
  .finally(() => {
    console.log("Fetch is over!");
  });

function renderGalleryTemplate(response) {
  let galleryTemplate = response
    .map((gallery) => {
      return `<div class="col">
        <div class="card shadow-sm">
        <img  width="100%" height="220" src=${gallery.thumbnailUrl}>
        <div class="card-body">
          <p class="card-text">${gallery.title}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small class="text-muted">9 mins</small>
          </div>
        </div>
        </div>
      </div>`;
    })
    .join("");
  document.getElementById("galleryTemplate").innerHTML = galleryTemplate;
}
// display it in html using JS

// we can get data via AJAY also
// const xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   console.log(this.readyState);
//   // get the data from the backend
//   if (this.readyState === 4) {
//     console.log(xhttp.response);
//     galleryList = JSON.parse(xhttp.response);

//     //display it in html using JS
//     console.log(galleryList);
//     renderGalleryTemplate();
//   }
// };
// xhttp.open("GET", "https://jsonplaceholder.typicode.com/photos?_limit=9", true);
// xhttp.send();
