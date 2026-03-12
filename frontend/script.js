const inputsDiv = document.getElementById("inputs");
const scenarioSelector = document.getElementById("scenario");

scenarioSelector.addEventListener("change", showInputs);

function showInputs() {
  const val = scenarioSelector.value;
  inputsDiv.innerHTML = "";

  if (val === "1") {
    inputsDiv.innerHTML = `
      <input placeholder="Recipient Name" id="recipient" />
      <input placeholder="Event Name" id="event" />
      <input type="datetime-local" id="time" />
      <input placeholder="Event Location (city)" id="location" />
    `;
  } else if (val === "2") {
    inputsDiv.innerHTML = `
      <input placeholder="Recipient Name" id="recipient" />
      <select id="msgType">
        <option value="Invitation">Invitation</option>
        <option value="Thank You">Thank You</option>
        <option value="Business Inquiry">Business Inquiry</option>
        <option value="Follow-Up">Follow-Up</option>
      </select>
      <input placeholder="Subject or Context" id="subject" />
      <input placeholder="Key Detail (optional)" id="detail" />
    `;
  } else if (val === "3") {
    inputsDiv.innerHTML = `
      <input placeholder="Recipient Group or Role" id="group" />
      <select id="purpose">
        <option value="Campaign Launch">Campaign Launch</option>
        <option value="Reminder / Update">Reminder / Update</option>
        <option value="Task Assignment">Task Assignment</option>
        <option value="Newsletter">Newsletter</option>
        <option value="Meeting Summary">Meeting Summary</option>
      </select>
      <input placeholder="Key Message or Focus" id="focus" />
      <input placeholder="Call to Action (optional)" id="cta" />
    `;
  }
}

function generatePrompt() {
  const val = scenarioSelector.value;
  let prompt = "";

  if (val === "1") {
    const recipient = document.getElementById("recipient").value;
    const event = document.getElementById("event").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const formattedTime = new Date(time).toLocaleString();
    prompt = `Write a professional email.\n\nSubject: ${event}\nTo: ${recipient}\nSpecial Instructions: Please attend the event on ${formattedTime} at ${location}.\n\nEmail:\n`;
  }

  if (val === "2") {
    const recipient = document.getElementById("recipient").value;
    const msgType = document.getElementById("msgType").value;
    const subject = document.getElementById("subject").value;
    const detail = document.getElementById("detail").value;
    prompt = `Write a ${msgType} email.\n\nTo: ${recipient}\nSubject: ${subject}\n${detail ? "Key Detail: " + detail : ""}\n\nEmail:\n`;
  }

  if (val === "3") {
    const group = document.getElementById("group").value;
    const purpose = document.getElementById("purpose").value;
    const focus = document.getElementById("focus").value;
    const cta = document.getElementById("cta").value;
    prompt = `Write an email for ${group}.\nPurpose: ${purpose}\nKey Message: ${focus}\n${cta ? "Call to Action: " + cta : ""}\n\nEmail:\n`;
  }

  document.getElementById("gmailPrompt").textContent = "Generating...";

  fetch("https://email-ai-kg4f.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      if (data.email) {
        document.getElementById("gmailPrompt").textContent = data.email;
      } else {
        document.getElementById("gmailPrompt").textContent = "No email generated.";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("gmailPrompt").textContent = "Error generating email.";
    });
}

// Default view
showInputs();
