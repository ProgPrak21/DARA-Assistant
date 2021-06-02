// This file is injected as a content script
import {
  facebookRequest,
  facebookCheck,
  facebookDownload,
} from "./scripts/facebook";
console.log("Hello from content script!");

chrome.runtime.onMessage.addListener(async (message: any) => {
  console.log("message received in content script", message);
  console.log(message);

  //Check for which service
  if (message.host === "www.facebook.com") {
    if (message.type === "request") facebookRequest();

    if (message.type === "check") {
      console.log("Sending Message via runtime");
      let result = await facebookCheck();
      console.log("result ===> ", result);
      chrome.runtime.sendMessage(result);
    }

    if (message.type === "download") await facebookDownload();
  }
});
