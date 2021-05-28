// This file is injected as a content script
import {
  facebookRequest,
  facebookCheck,
  facebookDownload,
} from "./scripts/facebook";
console.log("Hello from content script!");

chrome.runtime.onMessage.addListener((message: any) => {
  console.log("message received in content script", message);
  console.log(message);
  if (message.host === "www.facebook.com") {
    message.type === "request" && facebookRequest();
    message.type === "check" && chrome.runtime.sendMessage(facebookCheck());
    message.type === "download" && facebookDownload();
  }
});
