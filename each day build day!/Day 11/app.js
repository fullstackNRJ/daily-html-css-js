const dropRegion = document.getElementById('drop-region');
const imagePreviewRegion = document.getElementById('image-preview');
const overlay = document.createElement("div");
let imagetoUpload;
// open file selector when clicked on the drop region
const fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*"; //multiple values like image/png, image/jpeg.
fakeInput.multiple = true;


dropRegion.addEventListener('click', function () {
    fakeInput.click();
});

fakeInput.addEventListener("change", function () {
    const files = fakeInput.files;
    handleFiles(files);
});



function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}

/* 
The Drag & Drop API defines 8 events: 4 events for the draggable element and 4 events for the droppable element. We will only need the latter 4 when developing a drag & drop image uploading.

    dragenter: a dragged item enters a valid drop target.
    dragleave: a dragged item leaves a valid drop target.
    dragover: a dragged item is being dragged over a valid drop target. Triggered every few hundred milliseconds.
    drop: an item is dropped on a valid drop target.

*/
dropRegion.addEventListener('dragenter', preventDefault, false);
dropRegion.addEventListener('dragleave', preventDefault, false);
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', preventDefault, false);

//handle drop event
function handleDrop(e) {
    const dt = e.dataTransfer,
        files = dt.files;

    if (files.length) {

        handleFiles(files);

    } else {

        // check for img
        const html = dt.getData('text/html'),
            match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
            url = match && match[1];



        if (url) {
            uploadImageFromURL(url);
            return;
        }

    }


    function uploadImageFromURL(url) {
        let img = new Image;
        let c = document.createElement("canvas");
        let ctx = c.getContext("2d");

        img.onload = function () {
            c.width = this.naturalWidth;     // update canvas size to match image
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);       // draw in image
            c.toBlob(function (blob) {        // get content as PNG blob

                // call our main function
                handleFiles([blob]);

            }, "image/png");
        };
        img.onerror = function () {
            alert("Error in uploading");
        }
        img.crossOrigin = "";              // if from different origin
        img.src = url;
    }

}

dropRegion.addEventListener('drop', handleDrop, false);

/*
handleFiles() function which gets a File List and upload each item.

*/
function handleFiles(files) {
    for (let i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i]))
            previewImage(files[i]);
            
    }

    imagetoUpload = [...files];
}

/* 
check if the file is 'MIME' type and file size is < 10MB
--> validation on client-side equals better user XP
*/
function validateImage(image) {
    // check the type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validTypes.indexOf(image.type) === -1) {
        alert("Invalid File Type");
        return false;
    }

    // check the size
    const maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
        alert("File too large");
        return false;
    }

    return true;
}


/*
Previewing
1. after upload
2. before upload -> fast and efficient
*/

function previewImage(image) {

    // container
    const imgView = document.createElement("div");
    imgView.className = "image-view";
    imagePreviewRegion.appendChild(imgView);

    // previewing image
    const img = document.createElement("img");
    imgView.appendChild(img);

    // progress overlay
    
    overlay.className = "overlay";
    imgView.appendChild(overlay);

    // read the image...
    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
    }
    reader.readAsDataURL(image);

    //Uploading to the server, create a FormData Object and use Ajax or fetch   
    
 return image;
}



function upload(imagetoUpload){
    console.log('function called')
    // create FormData
    const formData = new FormData();
    formData.append('image', imagetoUpload);
 
    // upload the image
    const uploadLocation = 'UPLOAD_LOCATION';
 
    const ajax = new XMLHttpRequest();
    ajax.open("POST", uploadLocation, true);
 
    ajax.onreadystatechange = function(e) {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                // done!
            } else {
                // error!
            }
        }
    }
 
    ajax.upload.onprogress = function(e) {
 
        // change progress
        // (reduce the width of overlay)
 
        const perc = (e.loaded / e.total * 100) || 100,
            width = 100 - perc;
 
        overlay.style.width = width;
    }
 
    ajax.send(formData);
}


//for detecting file upload

dropRegion.addEventListener('dragenter', highlight, false);
dropRegion.addEventListener('dragover', highlight, false);
dropRegion.addEventListener('dragleave', unhighlight, false);
dropRegion.addEventListener('drop', unhighlight, false);    

function highlight() {
    dropRegion.classList.add('highlighted');
}
function unhighlight() {
    dropRegion.classList.remove("highlighted");
}


//for no bowser support	
function detectDragDrop() {
    const div = document.createElement('div');
    return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)
}
 
// change the message
const dragSupported = detectDragDrop();
if (!dragSupported) {
    document.getElementsByClassName("drop-message")[0].innerHTML = 'Click to upload';
}
