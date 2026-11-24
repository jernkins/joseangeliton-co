const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.getElementById("pageTitle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("activityDrawer");
const modal = document.getElementById("deploymentModal");
const toast = document.getElementById("toast");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    pageTitle.textContent = item.dataset.view;
    if (window.innerWidth <= 820) closeMobileMenu();
  });
});

function closeMobileMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
}

document.getElementById("menuButton").addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
});

overlay.addEventListener("click", () => {
  closeMobileMenu();
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
});

document.getElementById("notificationButton").addEventListener("click", () => {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
});

document.getElementById("closeDrawer").addEventListener("click", () => {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("visible");
});

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("projectSelect").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("newDeployment").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.getElementById("deploymentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const project = document.getElementById("projectSelect").value;
  const environment = document.getElementById("environmentSelect").value;
  closeModal();
  document.getElementById("toastDetail").textContent = `${project} is deploying to ${environment}`;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 3800);
});

document.getElementById("globalSearch").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".deployment-row").forEach((row) => {
    row.style.display = !query || row.textContent.toLowerCase().includes(query) ? "grid" : "none";
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("globalSearch").focus();
  }
  if (event.key === "Escape") {
    closeModal();
    closeMobileMenu();
  }
});

document.getElementById("timeFilter").addEventListener("click", (event) => {
  const ranges = ["Last 24 hours", "Last 7 days", "Last 30 days"];
  const current = event.currentTarget.textContent.trim();
  const next = ranges[(ranges.indexOf(current) + 1) % ranges.length];
  event.currentTarget.firstChild.textContent = `${next} `;
});

document.querySelectorAll(".row-menu").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = button.textContent === "•••" ? "···" : "•••";
  });
});
