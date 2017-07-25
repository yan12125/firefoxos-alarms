// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  var lock = window.navigator.requestWakeLock('cpu');
  console.log(lock);

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

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

    var data1 = {name: "alarm1", interval: 10},
        data2 = {name: "alarm2", interval: 10};
    var arr = [];

    navigator.mozAlarms.add(timeOffset(data1.interval, -2.5), "ignoreTimezone", data1);
    navigator.mozAlarms.add(timeOffset(data2.interval, 0), "ignoreTimezone", data2);

    navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
      console.log("alarm fired at " + new Date().getTime() + ": " + JSON.stringify(mozAlarm.data));
      var sdcard = navigator.getDeviceStorage("sdcard");

      console.log("before loop " + new Date().getTime());
      var data = "";
      for (var i = 0; i < 100000; i++) {
          for (var j = 0; j < 100000; j++) {
              data += Math.sin(i * j % 48497);
          }
      }
      console.log("after loop " + new Date().getTime());

      arr.push(new Date().getTime());
      console.log(arr.length);
      console.log(arr[arr.length - 1]);
      navigator.mozAlarms.add(timeOffset(mozAlarm.data.interval, 0), "ignoreTimezone", mozAlarm.data);
      // ScreenManager.turnScreenOn();
    });
  }
});
