let p = document.createElement('p');
const words = document.querySelector('.editor');
words.appendChild(p);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'hi-IN';


// eventlistener on recognition object
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');


    //add some easter eggs
    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    if(transcript.includes('download this')){
        console.log('download')
        convertToTextFile();
    }

});


recognition.addEventListener('end', recognition.start);

recognition.start();



function convertToTextFile(mimeType) {
    const text = document.querySelector('.editor p').innerHTML;
   
    console.log(text)
    const filename = `transcript-no-` + Math.round(Math.random() * 1000) + '.txt';
    let link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    if (navigator.msSaveBlob) { // IE 10+ 
        navigator.msSaveBlob(new Blob([text], { type: mimeType + ';charset=utf-8;' }), filename);
    } else {

        link.setAttribute('download', filename);
        link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(text));
        link.click();
    }

}
