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
  if (message.host === "www.facebook.com") {
    message.type === "request" && facebookRequest();
    if (message.type === "check") {
      console.log("Sending Message via runtime");
      let res = await facebookCheck();
      console.log("res ===> ", res);
      chrome.runtime.sendMessage(res);
    }

    message.type === "download" && facebookDownload();
  }
});
