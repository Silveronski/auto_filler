const userInfoSection = document.getElementById("userInfoSection");
const formInputs = document.getElementById("formInputs");
const saveInfoBtn = document.getElementById("saveInfoBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const fillFormBtn = document.getElementById("fillFormBtn");
const clearFormBtn = document.getElementById("clearFormBtn");
const editInfoBtn = document.getElementById("editInfoBtn");

INPUT_FIELDS.forEach((field, index) => {
  // userInfoSection
  const strong = document.createElement("strong");
  strong.textContent = HTML_INPUT_FIELDS_LABELS[index];

  const span = document.createElement("span");
  span.id = field;

  const paragraph = document.createElement("p");
  paragraph.appendChild(strong);
  paragraph.appendChild(span);

  userInfoSection.appendChild(paragraph);

  // formInputs
  const span2 = document.createElement("span");
  span2.textContent = HTML_INPUT_FIELDS_LABELS[index];

  const input = document.createElement("input");
  input.id = `${field}Input`;

  let resumeLabel = null;
  if (field === "resume") {
    input.type = "file";
    input.style.display = "none";
    resumeLabel = document.createElement("label");
    resumeLabel.htmlFor = "resumeInput";
    resumeLabel.id = "resumeLabel";
    resumeLabel.textContent = "Choose your resume";
  }

  const div = document.createElement("div");
  const label = document.createElement("label");

  label.appendChild(span2);
  label.appendChild(input);
  if (resumeLabel) label.appendChild(resumeLabel);

  div.appendChild(label);

  formInputs.appendChild(div);
});
