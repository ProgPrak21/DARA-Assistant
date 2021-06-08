import * as React from "react";

export const DownloadInfo = () => {
  const [status, setStatus] = React.useState<string | undefined>("");

  // Listen to messages by runtime.sendMessages
  chrome.runtime.onMessage.addListener( function onMessage (message) {
    if (message.requestState) {
      chrome.runtime.onMessage.removeListener(onMessage);
      setStatus(message.requestState);
    }
  });

  return (
    <div>
      {status
        ? `Your data request is ${status}!`
        : `Click DOWNLOAD to download your data when they are ready!`}
    </div>
  );
};