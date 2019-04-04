var synth = window.speechSynthesis;
var voices = synth.getVoices();

function suggestionResponse(xcode){
	var message = null;
	if(xcode==1){
		//Today's Weather
		let weatherTemplate = '';
		navigator.geolocation.getCurrentPosition((pos) => { 
      console.log('POS: ' + pos);
    }, (err) => {
      console.log('Geolocation error: ', err);
    }, {enableHighAccuracy: false});
		if(navigator.geolocation){
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position){
			currentPosition = position;
			var latitude = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;
			var url = "https://api.apixu.com/v1/current.json?key=dd37d0796730428dba8114458191801&q=" + latitude + "," + longitude;
			$.getJSON(url, function(data){
				var data = JSON.stringify(data);
				var json = JSON.parse(data);
				var temp = json.current.temp_c;
				var pressure = json.current.pressure_in;
				var humidity = json.current.humidity;
				var sunny = json.current.condition.text;
				var wspeed = json.current.wind_kph;
				var precip = json.current.precip_mm;
				weatherTemplate += "\
				<div class='weatherData'>\
				<h3>Here is your current Weather data</h3>\
				<table class='weatherDataTable' align='center'>\
				<tr><td><span><i class='fas fa-thermometer-three-quarters'></i></span> Temperature "+ temp +" 	&#8451;</td>\
				<td><span><i class='fas fa-thermometer-half'></i></span> Pressure " + pressure + " per inch</td></tr>\
				<tr><td><span><i class='fas fa-tint'></i></span> Humidity " +  humidity + "</td>\
				<td><span><i class='fas fa-cloud-sun'></i></span> Sky " + sunny  + "</td></tr>\
				<tr><td><span><i class='fas fa-wind'></i></span> Wind Speed " + wspeed  + " Kph</td>\
				<td><span><i class='fab fa-cloudversify'></i></i></span> Precipitation " + precip  + " mm</td></tr>\
				</table>\
				</div>\
				";
				message = "The temperature is about " + temp + " degree Centigrade with pressure of "+ pressure + " per inch and a \
				humidity of "+ humidity + ". The sky looks " + sunny + " with a wind speed of "+ wspeed + " Kph and precipitation level of "+ precip + " mm."; 
				$("#output-area").html(weatherTemplate);
      			textToSpeech(message);
			});
		});
		}else{
		$("#output-area").text("Geolocation is not supported by this browser.");
		}	
	}else if(xcode==2){
		// Disable chat mode
		var chatStatus = document.getElementById("chatEorD");
		if(chatStatus.innerHTML=="Disable Chat Mode"){
			chatStatus.innerHTML = "Enable Chat Mode";
		}else{
			chatStatus.innerHTML = "Disable Chat Mode";
		}
	}else if(xcode==3){
		// Weather next 7 days
		let weatherTemplate = '';
		if(navigator.geolocation){
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position){
			currentPosition = position;	
			var latitude = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;
			var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=4150154a3c1ad9d0ba5f67a3b2f7128a";
			$.getJSON(url, function(data){
				weatherTemplateList = data.list.map(arr => {
					return (
						"\
						<div class='weatherCardContainer'>\
						<div class='weatherIcon'>\
							<span class='dt_txt'>" + arr['dt_txt'] + "</span>\
						</div>\
					<div class='tempOrHumid'>\
						<div class='temps'><i class='fas fa-thermometer-three-quarters'> </i>" + getTemp(arr.main.temp) + " &#8451;</div> <div class='humid'><i class='fas fa-tint'> </i>"+ arr.main.humidity +" mm</div>\
					</div>\
					</div>\					\
						");
				});
				weatherTemplate += "\
				<div class='weatherForecastTemplate'>	\
					<h3>Weather Forecast in " + data.city.name + " for the next few days</h3>	\
					"+ getweatherTemplateList(weatherTemplateList) +"\
				</div>						\
				";
				message = "The weather forcast for the next few days is as follows"; 
				$("#output-area").html(weatherTemplate);
      			textToSpeech(message);
			});
		});
		}else{
		$("#output-area").text("Geolocation is not supported by this browser.");
		}
	}else if(xcode==4){
		// Tech News API
  		const serverURL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=48731fbbae324f56927f2b4c82965830";
  		let newsTemplate = '<h1><u>Top 10 Trending Tech News</u></h1>';
  		readNews = '';
  		count = 0;
  		$.ajax({
    		url: serverURL,
    		async: false,
    		success: function(result){
      		newsTemplateArray = result.articles.map( data => {
      			count +=1;
      			readNews += count + " , " + data.title ;
      			return ("\
					<div class='newsTemplate'>\
					 <span class='newsImage'>\
						 <img src='" + data.urlToImage + "'>\
			 		 </span>\
			 		 <span class='newsData'>\
						 <h4>" + data.title +"</h4>\
						 <p> " + processNewsContent(data.content) + " ... <a href='new.html#" + data.url + "' target='_blank'>(ReadMore)</a>" + "\
					 </span>\
					</div>\
      		");
      		});
      		for(item in newsTemplateArray){
      			if(newsTemplateArray[item] == undefined){
      				continue;
      			}
      			newsTemplate += "<br>" +  newsTemplateArray[item];
      		}
    	}
  		})
  		$("#output-area").html("<div class='news-container'>" + newsTemplate + "</div>");
  		const message = "Check out the top 10 trending tech news from around the world.";
  		textToSpeech(message);
  		textToSpeech(readNews);

	}else if(xcode==5){
		// Set Timer
		let timerTemplate = "\
				<div class='timerTemplate'>\
					 <h3>Wisdom Timer</h3>\
					  	<span id='hour'>00</span> : \
						 <span id='minute'>00</span> : \
						<span id='seconds'>00</span>\
    				<div>\
       				 <button class='startButton' onclick='startTimer()'>Start</button>\
        				<button class='pauseButton' id='pauseButton' onclick='pauseTimer()'>Pause</button>\
       				 <button class='stopButton' onclick='stopTimer()'>Stop</button>\
       				 <button class='resetButton' onclick='resetTimer()'>Reset</button>\
    				</div>\
				</div>\
					";
		$("#output-area").html(timerTemplate);
	}else if(xcode==6){
		// My location
		let err_bit = 0;
		 if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function(location) {
			var latitude = location.coords.latitude;
			var longitude = location.coords.longitude;
			var accuracy = location.coords.accuracy;
			let URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude +","+ longitude +"&sensor=false&key=AIzaSyAWkXhleDF6SseAPElBOQn06pKvyWfsM9g"
			 $.ajax({url: URL, 
			 	async: false,
			 	success: function(result){
			 	console.log(result);
    			message = "You location coordinates are - Latitude " + latitude + " \
    			and Longitude " + longitude + " with an accuracy of " + accuracy + ". Here are your location details " + result.plus_code.compound_code.slice(8);
 			 },
 			 error: function(err){
 			 	$("#output-area").text("Error accessing your location : " + err);
 			 	console.log("error accessing the location");
 			 	err_bit = 1;
 			 }
 			});
			 if(err_bit == 0){
			 	$("#output-area").text(message);
			 }
      		textToSpeech(message);
			});
  			} else {
   			 $("#output-area").text("Geolocation is not supported by this browser.");
 		 }
	}else if(xcode==7){
		// Play a joke
		$("#output-area").html(jokes_data[Math.floor((Math.random()*100))%(jokes_data.length)]);
	}else if(xcode==8){
		musicTemplate = "<iframe src='player.html' class='player-frame'></iframe>";
		$("#output-area").html(musicTemplate);
	}else if(xcode==9){
		// Open Youtube
		var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
		var URL = "https://www.youtube.com/";
		var win = window.open(URL, "_blank", strWindowFeatures);
	}else if(xcode==10){
		
	}else if(xcode==11){
		
	}else if(xcode==12){
		
	}else if(xcode==13){
		
	}
}

processNewsContent = data => {
	let content = data.split(" ");
  	let count = 0;
  	let temp = "";
  	while(count<=39){
  		temp +=  " " + content[count];
  		count++;
	}
	return temp;
};

textToSpeech = (botResponse) => {
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

var timeFlag = false;
var hour = 0;
var minute = 0;
var seconds = 0;
var timer;

startTimer = () => {
	if(timeFlag){
		return;
	}
	timeFlag = true;
 	 timer = setInterval(function(){
 		seconds += 1;
 		if(seconds==60){
 			seconds = 0;
 			minute +=1;
 		}else if(minute == 60){
 			minute = 0;
 			hour +=1;
 		}
 		document.getElementById("hour").innerHTML = convertTime(hour);
 		document.getElementById("minute").innerHTML = convertTime(minute);
 		document.getElementById("seconds").innerHTML = convertTime(seconds);
 	},950);
}

pauseTimer = () => {
	if(document.getElementById("pauseButton").innerHTML == "Pause"){
		clearInterval(timer);
		document.getElementById("pauseButton").innerHTML = "Resume";
	}else{
		timeFlag = false;
		startTimer();
		document.getElementById("pauseButton").innerHTML = "Pause";
	}
}


stopTimer = () => {
	clearInterval(timer);
}

resetTimer = () => {
	hour = 0;
	minute = 0;
	seconds = -1;
	document.getElementById("hour").innerHTML = "00";
 	document.getElementById("minute").innerHTML = "00";
 	document.getElementById("seconds").innerHTML = "00";
 	timeFlag = false;
}

convertTime = arg => {
	if(arg<10){
		return "0" + arg;
	}else{
		return arg
	}
}

getTemp = tdeg => {
	return Math.round(tdeg - 273.15);
}

getweatherTemplateList = weatherTemplateList => {
	let temp = '';
	for(item in weatherTemplateList){
		temp += weatherTemplateList[item];
	}
	return temp;
}

jokes_data = ["<p>Knock! Knock!</p><p>Who’s there?</p><p>Candice.</p><p>Candice who?</p><p>Candice door open, or am I stuck out here?</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Says.</p><p>Says who?</p><p>Says me, that’s who!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Voodoo.</p><p>Voodoo who?</p><p>Voodoo you think you are, asking all these questions?</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Mikey.</p><p>Mikey who?</p><p>Mikey isn’t working, can you let me in?</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Scold.</p><p>Scold who?</p><p>Scold outside, let me in!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Needle.</p><p>Needle who?</p><p>Needle little help getting in the door!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Dejav.</p><p>Dejav who?</p><p>Knock! Knock!</p><p> </p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Hike.</p><p>Hike who?</p><p>I didn’t know you liked Japanese poetry!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>I am.</p><p>I am who?</p><p>You tell me!!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Oink oink.</p><p>Oink oink who?</p><p>Make up your mind—are you a pig, or an owl?!</p>",
"<p>Q: Knock, knock.<br/>A: Who’s there?<br/>Q: Gladys.<br/>A: Gladys, who?<br/>Q: Gladys the weekend—no homework!</p>",
"<p>Q: Knock, knock.<br/>A: Who’s there?<br/>Q: Wooden shoe.<br/>A: Wooden shoe, who?<br/>Q: Wooden shoe like to know!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Figs.</p><p>Figs who?</p><p>Figs the doorbell, it’s broken!</p>",
"<p>Knock Knock!</p><p>Who’s There?</p><p>Snow!</p><p>Snow who?</p><p>Snow laughing matter.</p>",
"<p>Knock, knock!<br/>Who’s there?<br/>Wire.<br/>Wire who?</p><p>Wire you always asking ‘who’s there’?</p>",
"<p>Knock, knock!<br/>Who’s there?<br/>Abe.<br/>Abe who?</p><p>Abe CDEFJH…</p>",
"<p>Knock, Knock!<br/>Who’s there?<br/>Ken<br/>Ken who?</p><p>Ken I come in? It’s cold out here.</p>",
"<p>Knock, Knock!<br/>Who’s there?<br/>Witch.<br/>Witch who?</p><p>Witch one of you will give me some Halloween candy?</p>",
"<p>Knock, knock!</p><p>Who’s there?</p><p>Eysore</p><p>Eysore who?</p><p>Eysore do love you!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Candice.</p><p>Candice who?</p><p>Candice door open, or am I stuck out here?</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Says.</p><p>Says who?</p><p>Says me, that’s who!</p>",
"<p>Knock! Knock!</p>Who’s there?</p>Voodoo.</p>Voodoo who?</p>Voodoo you think you are, asking all these questions?</p>",
"<p>Knock, knock<br/>Who’s there?<br/>Leaf<br/>Leaf Who?<br/>Leaf Me Alone!</p>",
"<p>Knock! Knock!<br/>Who’s there?<br/>Radio.<br/>Radio who?<br/>Radio not, here I come!</p>",
"<p>Knock, Knock<br/>Who’s there?<br/>Cargo!<br/>Cargo who?<br/>Car go beep, beep!</p>",
"<p>Knock, knock<br/>Who’s there?<br/>Amarillo<br/>Amarillo who?<br/>Amarillo nice guy!</p>",
"<p>Knock, knock<br/>Who’s there?<br/>Nun<br/>Nun who?<br/>Nun of your business!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Wooden shoe.</p><p>Wooden shoe who?</p><p>Wooden shoe like to hear another joke?</p>",
"<p>Knock! Knock!<br/>Who’s there?<br/>A broken pencil.<br/>A broken pencil who?<br/>Never mind, it’s pointless.</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Robin.</p><p>Robin who?</p><p>Robin <em>you—</em>hand over the cash!</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Howl.</p><p>Howl who?</p><p>Howl you know if you don’t open the door?</p>",
"<p>Knock! Knock!</p><p>Who’s there?</p><p>Cash.</p><p>Cash who?</p><p>No thanks, I prefer peanuts.</p>",
"<p><strong>Knock! Knock!</strong></p><p>Who’s there?</p><p><strong>Owls say</strong></p><p>Owls say who?</p><p><strong>Yes, they do.</strong></p>",
"<p><strong>Knock! Knock!</strong></p><p>Who’s there?</p><p><strong>Art</strong></p><p>Art who?</p><p><strong>R2-D2, of course.</strong></p>",
"<p><strong>Knock! Knock!</strong></p><p>Who’s there?</p><p><strong>Kanga</strong></p><p>Kanga who?</p><p><strong>Actually, it’s kangaroo.</strong></p>",
"<p><strong>Knock! Knock!</strong></p><p>Who’s there?</p><p><strong>Déja</strong></p><p>Déja who?</p><p><strong>Knock! Knock!</strong></p>",
"<p><strong>Knock! Knock!</strong></p><p>Who’s there?</p><p><strong>No one</strong></p><p>No one who?</p><p><strong>*Remains silent*</strong></p>",
"<p><strong>Knock! Knock!</strong></p><p>Who’s there?</p><p><strong>Interrupting cow</strong></p><p>Interruptin-</p><p><strong>Mooooo!</strong></p>"]
