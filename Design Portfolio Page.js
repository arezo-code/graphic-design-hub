const tabs = document.querySelectorAll(".tab");
const cards = [...document.querySelectorAll(".project-card")];
const searchInput = document.getElementById("topSearch");
const sortSelect = document.getElementById("sortSelect");
const emptyState = document.getElementById("emptyState");
const projectGrid = document.getElementById("projectGrid");
const modal = document.getElementById("projectModal");
const form = document.getElementById("projectForm");
const toast = document.getElementById("toast");
let activeFilter = "all";
let nextDate = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function updateProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const sorted = [...projectGrid.querySelectorAll(".project-card")];
  sorted.sort((a, b) => sortSelect.value === "az"
    ? a.dataset.name.localeCompare(b.dataset.name)
    : Number(b.dataset.date) - Number(a.dataset.date));
  sorted.forEach(card => projectGrid.appendChild(card));
  let visible = 0;
  sorted.forEach(card => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.toLowerCase().includes(query) ||
      card.querySelector(".project-info p").textContent.toLowerCase().includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
    if (!card.hidden) visible++;
  });
  emptyState.hidden = visible > 0;
}
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(item => item.classList.remove("active"));
  tab.classList.add("active");
  activeFilter = tab.dataset.filter;
  updateProjects();
}));
searchInput.addEventListener("input", updateProjects);
sortSelect.addEventListener("change", updateProjects);

document.getElementById("addProjectBtn").addEventListener("click", () => {
  modal.hidden = false;
  document.getElementById("newTitle").focus();
});
function closeModal() { modal.hidden = true; form.reset(); }
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = document.getElementById("newTitle").value.trim();
  const category = document.getElementById("newCategory").value;
  if (!title) return;
  const labels = {branding:"Branding · Visual identity",uiux:"UI/UX · Design concept",illustration:"Illustration · Digital art",social:"Social Media · Campaign"};
  const colors = {branding:["#f2e9d9","#355340"],uiux:["#e4e9de","#34483d"],illustration:["#f4dce7","#753b59"],social:["#f1d5bd","#50352b"]};
  const art = document.createElement("div");
  art.className = "project-art";
  art.style.background = colors[category][0];
  art.style.color = colors[category][1];
  const artText = document.createElement("strong");
  artText.textContent = title;
  artText.style.cssText = "font:italic 27px Georgia,serif;text-align:center;padding:20px;overflow-wrap:anywhere";
  art.appendChild(artText);
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = category;
  card.dataset.name = title;
  card.dataset.date = String(10 + (++nextDate));
  const info = document.createElement("div");
  info.className = "project-info";
  const detail = document.createElement("div");
  const h3 = document.createElement("h3"); h3.textContent = title;
  const p = document.createElement("p"); p.textContent = labels[category];
  detail.append(h3,p);
  const more = document.createElement("button"); more.className = "more-btn"; more.setAttribute("aria-label","Project options");
  more.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
  info.append(detail,more);
  const meta = document.createElement("div"); meta.className = "project-meta";
  meta.innerHTML = '<span><i class="fa-regular fa-eye"></i> 0 views</span><span><i class="fa-regular fa-heart"></i> 0</span><span class="status draft">Draft</span>';
  card.append(art,info,meta);
  projectGrid.prepend(card);
  document.getElementById("projectCount").textContent = Number(document.getElementById("projectCount").textContent) + 1;
  closeModal();
  activeFilter = "all";
  tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.filter === "all"));
  searchInput.value = "";
  updateProjects();
  showToast("Project added to your portfolio.");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 820) sidebar.classList.toggle("mobile-open");
  else {
    sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-collapsed");
  }
});
document.querySelector(".help-button").addEventListener("click", () => showToast("Need help? Contact the GraphicDesignHUB support team."));
document.querySelectorAll(".more-btn").forEach(button => button.addEventListener("click", () => showToast("Project options will be available in a future update.")));
document.querySelector(".text-action").addEventListener("click", () => showToast("You are viewing a demo portfolio page."));
updateProjects();
