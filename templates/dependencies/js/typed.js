var aText = new Array(
"Hello World !!!,","\n", 
"I'm Wisdom an artificial intelligent chatbot based search engine...",
"You can ask me anything and i will respond to you with an appropriate response or atleast close to it.", 
"I may still be in my early days of development but will eventually gain knowledge that is as vast as the internet itself.",
"I have a built in search engine feature that will help me in responding to queries of type - ` I didn't know that I don't know ` \
although i will also need to access the internet for some queries of the type - ' I know that I don't know' hence i need to connected \
to my server all the time for the best usage of my skills. Don't worry i will not end up using all of your bandwidth :) \
but i would like to get to know you better.... ",
"\n","Go ahead and chat with me !!!","\n"
);
var iSpeed = 40; 
var iIndex = 0; 
var iArrLength = aText[0].length; 
var iScrollAt = 20; 
 
var iTextPos = 0; 
var sContents = ''; 
var iRow; 
 
function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");
 
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 500);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
 }
}

typewriter();