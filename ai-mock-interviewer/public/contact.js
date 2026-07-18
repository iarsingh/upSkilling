const contactForm = document.querySelector("#contactForm");
const contactSubmit = document.querySelector("#contactSubmit");
const contactStatus = document.querySelector("#contactStatus");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  contactStatus.className = "contact-status";
  contactStatus.textContent = "";
  if (!contactForm.reportValidity()) return;

  contactSubmit.disabled = true;
  contactSubmit.classList.add("is-busy");
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.querySelector("#contactName").value.trim(),
        email: document.querySelector("#contactEmail").value.trim(),
        subject: document.querySelector("#contactSubject").value,
        message: document.querySelector("#contactMessage").value.trim(),
        website: document.querySelector("#contactWebsite").value
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not send your message.");
    contactForm.reset();
    contactStatus.classList.add("success");
    contactStatus.textContent = data.message || "Thanks! Your message has been received.";
  } catch (error) {
    contactStatus.classList.add("error");
    contactStatus.textContent = error.message;
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.classList.remove("is-busy");
  }
});
