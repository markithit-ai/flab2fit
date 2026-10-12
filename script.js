/*
  FLAB2FIT CONFIGURATION
  1) Replace PAYMENT_LINK with your Razorpay Payment Link.
  2) In Razorpay, set the post-payment redirect to your deployed site URL + ?payment=success
     (example: https://your-domain.com/?payment=success).
  3) Create a Google Calendar Appointment schedule and copy its EMBED URL into CALENDAR_EMBED_URL.
     The public booking page URL can be added to CALENDAR_PUBLIC_URL as a fallback.
  Note: a static site cannot securely verify payment status or create calendar events through APIs.
  The redirect is a user-flow signal, not verified payment proof. For strict payment verification,
  use a backend/webhook before exposing the calendar booking step.
*/
const FLAB2FIT_CONFIG = {
  PAYMENT_LINK: "RAZORPAY_PAYMENT_LINK_HERE",
  CALENDAR_EMBED_URL: "GOOGLE_CALENDAR_APPOINTMENT_EMBED_URL_HERE",
  CALENDAR_PUBLIC_URL: "GOOGLE_CALENDAR_APPOINTMENT_PUBLIC_URL_HERE",
  WHATSAPP_URL: "https://wa.me/919860630123?text=START"
};

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const modal = document.getElementById("bookingModal");
const paymentStep = document.getElementById("paymentStep");
const calendarStep = document.getElementById("calendarStep");
const paymentLink = document.getElementById("paymentLink");
const calendarFrameWrap = document.getElementById("calendarFrameWrap");
const calendarFallback = document.getElementById("calendarFallback");

function isConfigured(value, prefix) {
  return value && !value.includes("_HERE") && value !== prefix;
}
function showModal(step = "payment") {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (step === "calendar") showCalendarStep();
  else showPaymentStep();
  modal.querySelector(".modal-close").focus();
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function showPaymentStep() {
  paymentStep.hidden = false;
  calendarStep.hidden = true;
  document.getElementById("modalTitle").textContent = "Let’s get your consultation booked.";
  document.getElementById("modalDescription").textContent = "First, complete the ₹99 payment. Once you return to this page, you can choose your appointment time in the calendar.";
  paymentLink.href = isConfigured(FLAB2FIT_CONFIG.PAYMENT_LINK) ? FLAB2FIT_CONFIG.PAYMENT_LINK : "#";
  paymentLink.onclick = event => {
    if (!isConfigured(FLAB2FIT_CONFIG.PAYMENT_LINK)) {
      event.preventDefault();
      alert("Add your Razorpay Payment Link in script.js first. See README.md for instructions.");
    }
  };
}
function showCalendarStep() {
  paymentStep.hidden = true;
  calendarStep.hidden = false;
  document.getElementById("modalTitle").textContent = "Choose your consultation time.";
  document.getElementById("modalDescription").textContent = "Select an available slot in the calendar below to schedule your appointment.";
  const embed = FLAB2FIT_CONFIG.CALENDAR_EMBED_URL;
  const publicUrl = FLAB2FIT_CONFIG.CALENDAR_PUBLIC_URL;
  if (isConfigured(embed)) {
    calendarFrameWrap.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.src = embed;
    iframe.title = "Google Calendar appointment booking";
    iframe.loading = "lazy";
    iframe.allow = "camera; microphone; fullscreen";
    calendarFrameWrap.appendChild(iframe);
  } else {
    calendarFrameWrap.innerHTML = '<div class="calendar-placeholder"><span class="calendar-symbol">▦</span><strong>Appointment calendar</strong><p>Add your Google Calendar appointment-schedule embed URL in <code>script.js</code> to show available slots here.</p></div>';
  }
  if (isConfigured(publicUrl)) {
    calendarFallback.href = publicUrl;
    calendarFallback.hidden = false;
  } else {
    calendarFallback.hidden = true;
  }
}
document.getElementById("bookButton").addEventListener("click", () => showModal("payment"));
document.getElementById("alreadyPaid").addEventListener("click", () => showModal("calendar"));
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });

// Razorpay Payment Link redirect: ?payment=success opens the calendar step automatically.
// Remove the query parameter from the visible URL after reading it.
const params = new URLSearchParams(window.location.search);
if (params.get("payment") === "success") {
  window.addEventListener("load", () => showModal("calendar"));
  window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
}
