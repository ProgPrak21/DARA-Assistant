export const facebookRequest = () => {
  console.log("Executing Facebook Request!");
  return new Promise((resolve) => {
    setTimeout(() => {
      //Select all iframes
      Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
        if (iframe.contentWindow) {
          //Select Format
          Array.from(
            iframe.contentWindow.document.body.querySelectorAll("label")
          )
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
    }, 2000);
    resolve("done");
  });
};

export const facebookCheck = () => {
  return new Promise((resolve) => {
    console.log("Executing Facebook Check!");
    setTimeout(() => {
      let result;
      let pending = Array.from(document.querySelectorAll("iframe")).map(
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

      let ready = Array.from(document.querySelectorAll("iframe")).map(
        (iframe) =>
          iframe.contentWindow &&
          Array.from(
            iframe.contentWindow.document.body.querySelectorAll(
              'div[data-hover="tooltip"]'
            )
          ).find((e) => e.textContent?.startsWith("Download"))
      );

      if (!pending.includes(undefined) && pending.length === 1) {
        console.log("Request is pending!");
        //alert("Pending!");
        result = "fb_request_pending";
      }
      if (!ready.includes(undefined) && ready.length === 1) {
        console.log("Request is Ready");
        //alert("Ready!");
        result = "facebook_request_ready";
      } else {
        result = "facebook_request_none";
      }
      resolve(result);
    }, 2000);
  });
};

export const facebookDownload = () => {
  console.log("Executing Facebook Download!");
  return new Promise((resolve) => {
    setTimeout(() => {
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
      resolve("done");
    }, 2000);
  });
};
