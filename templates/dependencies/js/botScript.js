var synth = window.speechSynthesis;
var voices = synth.getVoices();
var conv_id = Date.now();
 
$(function() {
  $("#usrInput").keypress(function(e) {
    if(e.which == 13){
      e.preventDefault();
      //-------------------------Get the User Input-----------------------------------------------------------
      let ursInput = $('input[name="usrInput"]').val().toLowerCase();
      document.getElementById("usrInput").value = "";
      //-------------------------Process User Input------------------------------------------------------
      let botResponse = processUserRequest(ursInput);
      //------------------------Bot Response has been generated and is available------------------------------
      $("#output-area").text(botResponse);
      textToSpeech(botResponse);
    }
  });
});

const automateCodesDictionary = {
  '000' : ['wisdom open twitter'],
  '001' : ['wisdom open mail'],
  '010' : ['wisdom set timer'],
  '011' : ['wisdom open todo'],
  '100' : ['wisdom set remainder'],
  '101' : ['wisdom play a song'],
  '110' : ['wisdom write a note'],
  '111' : ['wisdom open notifications'],
  'x000' : ['wisdom click a picture']
};

const defaultResponses = [
  'I am basically good @ understanding Binary, Hex, Decimal, Octal, and English :)',
  'You should drink 8 glasses of water everyday to keep yourself hyderated...',
];

const processUserRequest = (rawData) => {
  let response;
  let x = document.getElementById("status");
  const serverOfflineMsg = "Wisdom Server Disconnected"
  if((automateCode = isAutomate(rawData)) != null){
    response = botAutomate(automateCode,rawData);
  }else{
    response = botChat(rawData);
  }
  if(response != '......'){
    x.style.display = "none";
    return response;
    hideDisplay();
  }else{
    x.style.display = "block";
    x.innerHTML = "<span>" + serverOfflineMsg + "</span>"
    showDisplay();
    return getDefaultResponse(rawData);
  }
};

const hideDisplay = () => {

}

const showDisplay = () => {
	
}

const isAutomate = (rawData) => {
  for(code in automateCodesDictionary){
      if(rawData == automateCodesDictionary[code][0]){
        return code;
      }
  }
  return null;
};

const botAutomate = (automateCode,rawData) => {
  // Communicate with the main process and render the specific process
  // Don't forget to change output text after the rendered process terminates
  return "......Processing your Request......";
};

//----------------------------------------------------------CHAT API-----------------------------------------------------------------
const botChat = (rawData) => {
  let response;
  const serverURL = "http://127.0.0.1:5000/?conv_id="+ conv_id +"&query="
  $.ajax({
    url: serverURL + rawData,
    type: 'GET',
    crossDomain: true,
    async: false,
    headers: {
                    'Access-Control-Allow-Origin': '*'
                },
    success: function(result){
      response = result;
    },
    error: function(e) { 
      console.log("There was an error connecting to Wisdom Server...."); 
    },
  })
  return response;
};

//----------------------------------------------------Default Response------------------------------------------------------------
const getDefaultResponse = (rawData) => {
  return defaultResponses[Math.floor((Math.random() * 10)%defaultResponses.length)]
};

//----------------------------------------------------SPEECH Module-------------------------------------------------------------------

textToSpeech = (botResponse) => {
  console.log(botResponse);
  var utterThis = new SpeechSynthesisUtterance(botResponse);
  var selectedOption = "Google US English";
  //var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  utterThis.pitch = 1
  utterThis.rate = 1
  synth.speak(utterThis);
};

speech_recog = () => {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  //recognition.continuous = false;
  recognition.start();
  recognition.onresult = function(event) {
  var speechToText = event.results[0][0].transcript;
   $("#output-area").text("You Said '' " + speechToText + " ''");
   let botResponse = processUserRequest(speechToText);
   $("#output-area").text(botResponse);
   textToSpeech(botResponse);
  }
  recognition.onspeechend = function() {
    recognition.stop();
  }
  recognition.onerror = function(event) {
    $("#output-area").text('Hmm.. Looks like there was an error in speech recognition: ' + event.error);
  }
};

getRandomColor = () => {
  colors_list = ['crimson','#9ACD32', 'white', '#20B2AA', ' #87CEFA', '#00FA9A', 
                 '#7B68EE', ' #9370DB','#ADFF2F', '#1E90FF','#00FFFF','#6495ED', 
                 '#008B8B', '#00CED1', '#00BFFF'];
  return colors_list[Math.floor((Math.random() * 10)%colors_list.length)];
}

var name_wisdom = document.getElementById("name_wisdom");

setInterval(function(){
if(name_wisdom){
  name_wisdom.style.color = getRandomColor();
}
},5000);



// json_data = {
// 	"intents" : [
// 		{
// 			"tag" : "products", //intent
// 			"patterns" : ['show me some products', 'products please', 'products'],
// 			"common_template": "od you want me to show some ",
// 			"responses" : ['t-shirts ?', 'pants ?', 'stationary ?']
// 		},
// 		{
// 			"tag" : "t-shirts",
// 			"patterns" : ['','any trending t-shirts offers ?'],
// 			"responses" : ["000168"]
// 		}
// 	]
// }



// def getReply(usr_data):
// 	for data in json_data['intents']:
// 		if usr_data in data['patterns']:
// 			if common_template:
// 				return common_template + random.choice(data['responses'])
// 			else:
// 				return random.choice(data['responses'])
// 		else:
// 			return defaultResponses()

// display(getReply("show me some products"))

// def display(data):
// 	if text then
// 		display text
// 	else check if it is automate code
// 		if it is automate code then 
// 			send it to automate Module
// 		else 
// 			return getDefaultResponse()
