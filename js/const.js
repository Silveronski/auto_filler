(() => {
  window.INPUT_FIELDS = [
    "firstName",
    "lastName",
    "email",
    "linkedIn",
    "phoneNumber",
    "address",
    "city",
    "resume",
  ];

  window.HTML_INPUT_FIELDS_LABELS = [
    "First Name: ",
    "Last Name: ",
    "Email: ",
    "LinkedIn URL: ",
    "Phone Number: ",
    "Address: ",
    "City: ",
    "Resume: ",
  ];

  window.INPUT_FIELDS_DICTIONARY = {
    [window.INPUT_FIELDS[0]]: ["first name", "firstname", "given-name"],
    [window.INPUT_FIELDS[1]]: [
      "last name",
      "lastname",
      "surname",
      "family-name",
    ],
    [window.INPUT_FIELDS[2]]: ["email", "e-mail"],
    [window.INPUT_FIELDS[3]]: ["linkedin", "linked-in"],
    [window.INPUT_FIELDS[4]]: ["phone", "phone number", "mobile phone"],
    [window.INPUT_FIELDS[5]]: ["address"],
    [window.INPUT_FIELDS[6]]: ["city"],
    [window.INPUT_FIELDS[7]]: ["resume", "cv"],
  };
})();
