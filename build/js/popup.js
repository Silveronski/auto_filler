// show user info
chrome.storage.local.get(INPUT_FIELDS, (data) => {
  INPUT_FIELDS.forEach((field) => {
    document.getElementById(field).textContent = data[field] || "(not set)";
  });
});

// show edit user info section
document.getElementById("editInfoBtn").addEventListener("click", () => {
  showInfoSection();
  chrome.storage.local.get(INPUT_FIELDS, (data) => {
    INPUT_FIELDS.forEach((field) => {
      if (field === "resume")
        document.getElementById(`${field}Label`).textContent = data[field];
      else document.getElementById(`${field}Input`).value = data[field] || "";
    });
  });
});

// save user details
document.getElementById("saveInfoBtn").addEventListener("click", () => {
  const data = {};
  INPUT_FIELDS.forEach((field) => {
    if (field === "resume") return;
    data[field] = document.getElementById(`${field}Input`).value;
  });
  chrome.storage.local.set(data, () => {
    hideFormSection();
    Object.keys(data).forEach((key) => {
      document.getElementById(key).textContent = data[key] || "(not set)";
    });
  });
});

document.getElementById("switchInput").addEventListener("change", (e) => {
  chrome.storage.local.set({ allowAutoFill: e.target.checked });
  document.getElementById("fillFormBtn").disabled = !e.target.checked;
});

document.getElementById("resumeInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Please upload a PDF file");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const base64Resume = reader.result;
    chrome.storage.local.set(
      { resume: file.name, resumeFile: base64Resume },
      () => {
        document.getElementById("resume").textContent = file.name;
        document.getElementById("resumeLabel").textContent = file.name;
      }
    );
  };

  reader.readAsDataURL(file);
});

// auto fill form
document.getElementById("fillFormBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["js/const.js", "js/autoFillForm.js"],
  });
});

// clear form
document.getElementById("clearFormBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["js/clearForm.js"],
  });
});

// close form section
document.getElementById("closeFormBtn").addEventListener("click", () => {
  hideFormSection();
});

document.addEventListener("DOMContentLoaded", async () => {
  const { allowAutoFill } = await chrome.storage.local.get("allowAutoFill");
  if (allowAutoFill === undefined) {
    chrome.storage.local.set({ allowAutoFill: true });
  } else {
    document.getElementById("switchInput").checked = !!allowAutoFill;
    document.getElementById("fillFormBtn").disabled = !allowAutoFill;
  }
});

const showInfoSection = () => {
  formInputs.style.display = "block";
  saveInfoBtn.style.display = "block";
  closeFormBtn.style.display = "block";
  userInfoSection.style.display = "none";
  fillFormBtn.style.display = "none";
  clearFormBtn.style.display = "none";
  editInfoBtn.disabled = true;
};

const hideFormSection = () => {
  formInputs.style.display = "none";
  saveInfoBtn.style.display = "none";
  closeFormBtn.style.display = "none";
  userInfoSection.style.display = "block";
  fillFormBtn.style.display = "block";
  clearFormBtn.style.display = "block";
  editInfoBtn.disabled = false;
};
