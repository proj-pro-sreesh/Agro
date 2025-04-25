const input = document.querySelector("#imageUpload");
const preview = document.querySelector(".preview");
input.addEventListener("change", updateImageDisplay);
let loader = document.querySelector(".loader");
loader.hidden=true;
function updateImageDisplay() {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  
    const curFiles = input.files;
    if (curFiles.length === 0) {
      const para = document.createElement("p");
      para.textContent = "No files currently selected for upload";
      preview.appendChild(para);
    } else {
      for (const file of curFiles) {
        const para = document.createElement("p");
        if (validFileType(file)) {
          const image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.alt = image.title = file.name;
          image.className= "img-fluid m-2"
          preview.appendChild(image);
        } else {
          para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
          preview.appendChild(para);
        }
      }
    }
}
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
  ];
  
  function validFileType(file) {
    return fileTypes.includes(file.type);
}


document.getElementById('uploadForm').onsubmit = async (e) => {
    loader.hidden=false;
    e.preventDefault();
    const formData = new FormData(e.target);

    // Send the image to Express server
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    loader.hidden=true;
    document.getElementById('result').innerHTML = 'Prediction Result: ' + JSON.stringify(data);
}