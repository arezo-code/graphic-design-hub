const rows = [...document.querySelectorAll("#assignmentRows tr")];
const searchInput = document.getElementById("assignmentSearch");
const globalSearch = document.getElementById("globalSearch");
const statusFilter = document.getElementById("statusFilter");
const tabs = [...document.querySelectorAll(".tab")];
const emptyState = document.getElementById("emptyState");
const showingText = document.getElementById("showingText");
const toast = document.getElementById("toast");
const modalBackdrop = document.getElementById("modalBackdrop");
let activeTab = "all";
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function filterRows() {
  const term = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  let shown = 0;
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const rowStatus = row.dataset.status;
    const rowTab = row.dataset.tab;
    const matchesSearch = !term || text.includes(term);
    const matchesStatus = status === "all" || rowStatus === status;
    const matchesTab = activeTab === "all" ||
      (activeTab === "active" && ["In Progress", "Overdue"].includes(rowStatus)) ||
      (activeTab === "submitted" && rowStatus === "Submitted") ||
      (activeTab === "completed" && rowStatus === "Completed");
    const visible = matchesSearch && matchesStatus && matchesTab;
    row.hidden = !visible;
    if (visible) shown++;
  });
  emptyState.hidden = shown !== 0;
  showingText.textContent = `Showing ${shown} assignment${shown === 1 ? "" : "s"} in this view`;
}

searchInput.addEventListener("input", filterRows);
statusFilter.addEventListener("change", filterRows);
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(item => item.classList.toggle("active", item === tab));
  activeTab = tab.dataset.tab;
  filterRows();
}));
globalSearch.addEventListener("input", () => {
  searchInput.value = globalSearch.value;
  filterRows();
});
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

function openAssignment(title) {
  const row = rows.find(item => item.innerText.includes(title));
  const status = row?.dataset.status || "In Progress";
  const courseCell = row?.children[1]?.innerText || "Design Class";
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent =
    status === "Completed" ? "This assignment is complete. You can review your work and instructor feedback." :
    status === "Submitted" ? "Your work has been submitted and is waiting for instructor feedback." :
    status === "Overdue" ? "This assignment is past its due date. Open it to continue working and submit it." :
    "Continue working on this assignment and upload your latest design when you are ready.";
  document.getElementById("modalCourse").textContent = courseCell;
  document.getElementById("modalStatus").textContent = status;
  document.getElementById("modalAction").textContent = status === "Completed" ? "Review assignment" : status === "Submitted" ? "View submission" : "Continue assignment";
  modalBackdrop.hidden = false;
}
document.querySelectorAll("[data-title]").forEach(button => {
  button.addEventListener("click", () => openAssignment(button.dataset.title));
});
document.getElementById("modalClose").addEventListener("click", () => modalBackdrop.hidden = true);
modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) modalBackdrop.hidden = true;
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") modalBackdrop.hidden = true;
});
document.getElementById("modalAction").addEventListener("click", () => {
  modalBackdrop.hidden = true;
  notify("Assignment workspace opened (demo).");
});
document.getElementById("newAssignmentBtn").addEventListener("click", () => {
  notify("New assignment request is a demo action.");
});
document.querySelectorAll(".pagination .page-number").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pagination .page-number").forEach(item => item.classList.remove("current"));
    button.classList.add("current");
    notify(`Page ${button.textContent} selected (demo).`);
  });
});
document.querySelector(".help-button").addEventListener("click", () => notify("Need help? Contact your course instructor."));
document.querySelectorAll(".nav-menu a:not(.active)").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    notify(`${link.innerText.trim()} page is outside this My Assignments demo.`);
  });
});
filterRows();
