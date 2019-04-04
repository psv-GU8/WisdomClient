var synth = window.speechSynthesis;
var voices = synth.getVoices();

function textToSpeech(event,outputTxt) {
  event.preventDefault();
  var utterThis = new SpeechSynthesisUtterance(outputTxt);
  var selectedOption = "Google US English";
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  utterThis.pitch = 1 
  utterThis.rate = 1
  synth.speak(utterThis);

  utterThis.onpause = function(event) {
    var char = event.utterance.text.charAt(event.charIndex);
    console.log('Speech paused at character ' + event.charIndex + ' of "' +
    event.utterance.text + '", which is "' + char + '".');
  }
}

function speech_recog(){
  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  //recognition.continuous = false;
  recognition.start();
  recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;
  diagnostic.textContent = 'Result received: ' + color + '.';
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
}

