import * as React from "react";

export const StatusInfo = () => {
  const [status, setStatus] = React.useState<string | undefined>("");

  // Listen to messages by runtime.sendMessages
  chrome.runtime.onMessage.addListener((message) => {
    console.log("Message in StatusInfo", message);
    if (message.requestState) {
      const result = message.requestState;
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
