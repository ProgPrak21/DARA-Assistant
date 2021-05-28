export const facebookRequest = () => {
  Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
    iframe.contentWindow &&
      Array.from(iframe.contentWindow.document.body.querySelectorAll("label"))
        ?.find((e) => e?.textContent?.startsWith("Format"))
        ?.querySelector("a")
        ?.click();

    iframe.contentWindow &&
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'a[role="menuitemcheckbox"]'
        )
      )
        ?.find((e) => e.textContent === "JSON")
        ?.querySelector("a")
        ?.click();

    iframe.contentWindow &&
      Array.from(iframe.contentWindow.document.body.querySelectorAll("button"))
        ?.find((el) => el.textContent === "Create File")
        ?.click?.();
  });
};

export const facebookCheck = () => {
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
    return "Pending!";
  }
  if (!ready.includes(undefined) && ready.length === 1) {
    console.log("Request is Ready");
    //alert("Ready!");
    return "Ready!";
  }
  return "unknown";
};

export const facebookDownload = () => {
  Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
    iframe.contentWindow &&
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll(
          'div[data-hover="tooltip"]'
        )
      )
        ?.find((e) => e?.textContent?.startsWith("Download"))
        ?.querySelector("a")
        ?.click();
  });
};
