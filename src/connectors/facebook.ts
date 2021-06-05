export const request = () => {
  console.log("Executing Facebook Request!");
  //Select all iframes
  Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
    if (iframe.contentWindow) {
      //Select Format
      Array.from(iframe.contentWindow.document.body.querySelectorAll("label"))
        ?.find((e) => e?.textContent?.startsWith("Format"))
        ?.querySelector("a")
        ?.click();

      //Find The json button in the menu
      let arr = Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'a[role="menuitemcheckbox"]'
        )
      );

      let json: HTMLElement = arr?.find(
        (e) => e.textContent === "JSON"
      ) as HTMLElement;

      json.click();

      //Click on Create File button
      iframe.contentWindow &&
        Array.from(
          iframe.contentWindow.document.body.querySelectorAll("button")
        )
          ?.find((el) => el.textContent === "Create File")
          ?.click?.();
    }
  });
};

export const check = async () => {
  console.log("Executing Facebook Check!");

  const pause = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  //Get all the iframes, and filter out the ads
  const getIframes = () => {
    return Array.from(document.querySelectorAll("iframe")).filter(
      (e) => !e.src.includes("common/referer_frame.php")
    );
  };

  let allIframes = getIframes();

  //check if the iframes are loaded, and retry for 5 times if not
  if (!allIframes.length) {
    for (let i = 0; i < 5; i++) {
      allIframes = getIframes();
      await pause(2000);
      if (allIframes.length) break;
    }
  }

  let result;

  let pending = allIframes.map(
    (iframe) =>
      iframe.contentWindow &&
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'div[role="heading"]'
        )
      ).find((e) =>
        e.textContent?.startsWith(
          "A copy of your information is being created."
        )
      )
  );

  let ready = allIframes.map(
    (iframe) =>
      iframe.contentWindow &&
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'div[data-hover="tooltip"]'
        )
      ).find((e) => e.textContent?.startsWith("Download"))
  );

  result = "none";
  if (!pending.includes(undefined) && pending.length === 1) {
    result = "pending";
  }
  if (!ready.includes(undefined) && ready.length === 1) {
    result = "ready";
  }
  console.log(`Request is ${result}!`);
  // Send message to background that our request is ready
  chrome.runtime.sendMessage({ requestState: result });
};

export const download = () => {
  console.log("Executing Facebook Download!");
  let downloadBtn: HTMLElement = Array.from(
    document.querySelectorAll("iframe")
  ).map(
    (iframe) =>
      iframe.contentWindow &&
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'div[data-hover="tooltip"]'
        )
      )?.find((e) => e?.textContent?.startsWith("Download"))
  )[0] as HTMLElement;

  downloadBtn.click();
};
