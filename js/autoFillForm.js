(async () => {
  const { allowAutoFill } = await chrome.storage.local.get("allowAutoFill");
  if (allowAutoFill === true) {
    chrome.storage.local.get(INPUT_FIELDS, (data) => {
      // data is the user saved info
      document.querySelectorAll("input").forEach((input) => {
        const label =
          document
            .querySelector(`label[for='${input.id}']`)
            ?.innerText?.toLowerCase() || "";

        const allHints = [
          input.name,
          input.id,
          input.placeholder,
          input.ariaLabel,
          input.className,
          label,
        ]
          .map((hint) => hint?.toLowerCase() || "")
          .join(" ");

        for (const inputFieldKey in INPUT_FIELDS_DICTIONARY) {
          if (inputFieldKey === "resume") continue;
          if (
            INPUT_FIELDS_DICTIONARY[inputFieldKey].some((keyword) =>
              allHints.includes(keyword)
            )
          ) {
            input.value = data[inputFieldKey] || "";
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
            break;
          }
        }
      });
    });

    chrome.storage.local.get(
      ["resumeFile", "resume"],
      async ({ resumeFile, resume }) => {
        if (!resumeFile || !resume) return;
        try {
          const blob = await (await fetch(resumeFile)).blob();
          const file = new File([blob], resume, {
            type: "application/pdf",
          });

          const dt = new DataTransfer();
          dt.items.add(file);

          const fileInput = document.querySelector("input[type='file']");
          if (fileInput) {
            fileInput.files = dt.files;
            fileInput.dispatchEvent(new Event("change", { bubbles: true }));
          }
        } catch (err) {
          console.error("Failed to simulate file upload:", err);
        }
      }
    );
  }
})();
