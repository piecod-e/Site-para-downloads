const toggleDark = document.getElementById("toggleDark");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const overlay = document.getElementById("overlay");
const socialOverlay = document.getElementById("socialOverlay");

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  toggleDark.textContent = "Modo Claro";
}

toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  toggleDark.textContent = isDark ? "Modo Claro" : "Modo Escuro";
  localStorage.setItem("darkMode", isDark);
});

function filtrarDownloads() {
  const query = searchInput.value.trim().toLowerCase();
  const items = document.querySelectorAll(".download-item");
  if (query === "") {
    items.forEach((item) => (item.style.display = "flex"));
    return;
  }
  items.forEach((item) => {
    const title = item
      .querySelector(".download-title")
      .textContent.toLowerCase();
    item.style.display = title.includes(query) ? "flex" : "none";
  });
}
btnSearch.addEventListener("click", filtrarDownloads);
searchInput.addEventListener("input", filtrarDownloads);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    filtrarDownloads();
  }
});

const downloadBtns = document.querySelectorAll(".download-btn");
downloadBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("animate");
    overlay.classList.add("show");
    setTimeout(() => {
      btn.classList.remove("animate");
      overlay.classList.remove("show");
    }, 1500);
  });
});

document.querySelectorAll(".social").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const url = link.href;
    socialOverlay.classList.add("show");
    setTimeout(() => {
      socialOverlay.classList.remove("show");
      window.open(url, "_blank");
    }, 1200);
  });
});
