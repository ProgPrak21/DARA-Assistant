import * as React from "react";

export const StatusInfo = () => {
  const [status, setStatus] = React.useState<string | undefined>("");

  // Listen to messages by runtime.sendMessages
  chrome.runtime.onMessage.addListener((request) => {
    console.log("Message in StatusInfo", request);
    if (request.includes("facebook_request")) {
      const result = request.split("_")[2];
      setStatus(result);
    }
  });

  return (
    <div>
      {status
        ? `Your data request is ${status}!`
        : `Click CHECK to check the status of your request`}
    </div>
  );
};
