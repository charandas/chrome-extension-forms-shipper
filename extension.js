console.log('extension.js')

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "knockknock");
    port.onMessage.addListener(function(msg) {
      console.log('is_initial', msg.initial)
      console.log(msg.key)
      console.log(msg.value)
    });
  });