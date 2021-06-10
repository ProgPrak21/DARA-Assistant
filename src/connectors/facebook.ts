export const name = 'facebook';
export const hostname = 'facebook.com';
export const requestUrl = 'https://www.facebook.com/dyi/?referrer=yfi_settings';
export const actions = ['request', 'download']


export const request = async () => {
  console.log("Executing Facebook Request!");

  const pause = (time: number) =>
    new Promise(
      (resolve) => setTimeout(resolve, time)
    );

  //Get all the iframes, and filter out the ads
  const getIframes = () => {
    return Array.from(document.querySelectorAll("iframe")).filter(
      (e) => !e.src.includes("common/referer_frame.php")
    );
  };

  let allIframes = getIframes();
  console.log('Got Iframes:', allIframes);

  //check if the iframes are loaded, and retry for 5 times if not
  if (!allIframes.length) {
    for (let i = 0; i < 5; i++) {
      console.log('Iframes still not loaded, trying again.');
      allIframes = getIframes();
      await pause(2000);
      if (allIframes.length) break;
    }
  }

  allIframes.forEach((iframe) => {
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
  chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};

export const download = async () => {
  console.log("Executing Facebook Download!");

  const pause = (time: number) =>
    new Promise(
      (resolve) => setTimeout(resolve, time)
    );

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
      console.log('Iframes still not loaded, trying again.');
      allIframes = getIframes();
      await pause(2000);
      if (allIframes.length) break;
    }
  }

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

  let downloadBtn: HTMLElement = allIframes.map(
    (iframe) =>
      iframe.contentWindow &&
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'div[data-hover="tooltip"]'
        )
      )?.find((e) => e?.textContent?.startsWith("Download"))
  )[0] as HTMLElement;

  if (typeof(downloadBtn) !== undefined) {
    downloadBtn.click();
    chrome.runtime.sendMessage({ actionResponse: "Your data request is ready to download." });
  } else if (!pending.includes(undefined) && pending.length === 1) {
    chrome.runtime.sendMessage({ actionResponse: "Your data request is still pending." });
  }
};
