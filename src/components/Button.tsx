import * as React from "react";
import { Button } from "@material-ui/core";

type props = {
  action: string;
};

export const Btn: React.FC<props> = ({ action }) => {
  const onClick = () => {
    chrome.runtime.sendMessage({ action: action });
  };

  return (
    <div className="buttonContainer">
      <Button
        style={{ width: 100, height: 35 }}
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {action}
      </Button>
    </div>
  );
};
