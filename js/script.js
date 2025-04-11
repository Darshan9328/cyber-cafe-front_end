// ----- Contact Form Submission -----
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(
      "https://cyber-cafe-backend-izxu.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      alert("Message sent successfully!");
      document.querySelector("form").reset();
    } else {
      alert("Failed to send message. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});

// ----- Dynamic Carousel Image Loader -----
document.addEventListener("DOMContentLoaded", async () => {
  const carouselInner = document.querySelector(
    "#carouselExampleIndicators .carousel-inner"
  );
  const carouselIndicators = document.querySelector(
    "#carouselExampleIndicators .carousel-indicators"
  );

  const BACKEND_URL = "https://cyber-cafe-backend-izxu.onrender.com"; // your local Express server

  try {
    const res = await fetch(`${BACKEND_URL}/api/images`);
    const data = await res.json();
    console.log("data>>>>", data);

    if (!data || data.length === 0) return;

    data.forEach((filename, index) => {
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
      indicator.setAttribute("data-bs-slide-to", index);
      if (index === 0) indicator.classList.add("active");
      carouselIndicators.appendChild(indicator);

      // Create image slide
      const div = document.createElement("div");
      div.className = "carousel-item" + (index === 0 ? " active" : "");
      div.innerHTML = `
        <img src="${BACKEND_URL}${filename.url}" 
             class="d-block w-100" 
             alt="Slide ${index + 1}">
      `;
      carouselInner.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load carousel images:", err);
  }
});

