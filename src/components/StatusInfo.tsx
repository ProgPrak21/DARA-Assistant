import * as React from "react";

export const StatusInfo = () => {
  const [status, setStatus] = React.useState<string | undefined>("");

  // Listen to messages by runtime.sendMessages
  chrome.runtime.onMessage.addListener((request) => {
    if (request === "Pending!") setStatus(request);
    if (request === "Ready!") setStatus(request);
  });

  return (
    <div>
      {status
        ? `Your data request is ${status}`
        : `Click CHECK to check the status of your request`}
    </div>
  );
};
