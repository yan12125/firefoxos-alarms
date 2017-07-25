var arr = [];
// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var lock = window.navigator.requestWakeLock('cpu');
  console.log(lock);

  function alarmCall(data) {
      console.log("alarm fired at " + new Date().getTime() + ": " + JSON.stringify(data));

      var message2 = document.getElementById('message2');
      message2.textContent = "before loop " + (new Date().getTime());
      var data = 0;
      for (var i = 0; i < 2000; i++) {
          for (var j = 0; j < 2000; j++) {
              data += Math.sin(i * j % 48497);
          }
      }
      console.log("30");
      var message3 = document.getElementById('message3');
      message3.textContent = "after loop " + (new Date().getTime());
      console.log("33");

      arr.push(new Date().getTime());
      console.log(arr.length);
      console.log(arr[arr.length - 1]);
  }
  //alarmCall("Q_Q");


  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---


  function start() {

    var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    message.textContent = translate('message');

    function timeOffset(offset, start) {
      return new Date(new Date().getTime() + (offset + start) * 1000);
    }

    function transferFailed() {
    	console.log("XMLHttpRequest(): Failed!");
    }
    	
    function transferComplete() {
		console.log("XMLHttpRequest(): Complete!");
    } 

    function getHeaderTime () {
 		console.log("Last Modify" + this.getResponseHeader("Last-Modified"));  /* A valid GMTString date or null */
	}
    var data1 = {name: "FB-alarm", interval: 6};

    navigator.mozAlarms.add(timeOffset(data1.interval, 0), "ignoreTimezone", data1);

    navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
      console.log("alarm fired: " + JSON.stringify(mozAlarm.data));
      // http
      var theUrl = "http://www.president.gov.tw/";
      var xmlHttp = new XMLHttpRequest({mozSystem: true});
   	  
   	  xmlHttp.addEventListener("load", transferComplete, true);
   	  xmlHttp.addEventListener("error", transferFailed, true);
   	  
   	  xmlHttp.open("GET", theUrl ,true);
   	  xmlHttp.onload = getHeaderTime;
   	  xmlHttp.send();	

      alarmCall("Q_Q");

      navigator.mozAlarms.add(timeOffset(mozAlarm.data.interval, 0), "ignoreTimezone", mozAlarm.data);

    });
  }
});
