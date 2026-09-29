const phone = document.body.dataset.phone;
const phoneLabel = document.body.dataset.phoneLabel;
const instagram = document.body.dataset.instagram;

document.querySelectorAll("[data-tel]").forEach((link) => {
  link.href = `tel:+${phone}`;
  if (link.closest(".footer, .contacts")) link.textContent = phoneLabel;
});

document.querySelectorAll("[data-instagram]").forEach((link) => {
  link.href = instagram;
});

function refreshMessengerLinks() {
  const english = document.documentElement.lang === "en";

  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = waLink(link.dataset.wa);
  });

  document.querySelectorAll("[data-service]").forEach((link) => {
    const text = english
      ? `Hi! I'm interested in ${link.dataset.service} for ${link.dataset.price}. What times are available?`
      : `Привет! Меня интересует ${link.dataset.service} за ${link.dataset.price}. Подскажите свободное время?`;
    link.href = waLink(text);
  });

  document.querySelectorAll('a[href^="https://wa.me/"], a[href^="https://instagram.com"]').forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

refreshMessengerLinks();
document.addEventListener("neonshine:lang", refreshMessengerLinks);

function waLink(text) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

const contacts = document.querySelector(".contacts");
const callButton = document.querySelector(".header__phone");
const desktop = window.matchMedia("(min-width: 720px)");

function syncCallButton() {
  if (!callButton) return;
  if (desktop.matches && contacts) {
    callButton.setAttribute("aria-haspopup", "dialog");
    callButton.setAttribute("aria-controls", "contacts");
    return;
  }
  callButton.removeAttribute("aria-haspopup");
  callButton.removeAttribute("aria-controls");
}

syncCallButton();
desktop.addEventListener("change", syncCallButton);

callButton?.addEventListener("click", (event) => {
  if (!desktop.matches || !contacts) return;
  event.preventDefault();
  contacts.showModal();
});

contacts?.querySelector(".contacts__close")?.addEventListener("click", () => {
  contacts.close();
});

contacts?.addEventListener("click", (event) => {
  const rect = contacts.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;
  if (!inside) contacts.close();
});
