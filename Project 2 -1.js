document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const loginPage = document.getElementById("login-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const toggleSidebarBtn = document.getElementById("toggle-sidebar");
    const sidebar = document.getElementById("sidebar");
    const logoutBtn = document.getElementById("logout-btn");

    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            loginPage.classList.remove("active");
            dashboardPage.classList.add("active");
            window.scrollTo(0, 0);
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            dashboardPage.classList.remove("active");
            loginPage.classList.add("active");
        });
    }

    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener("click", function() {
            sidebar.classList.toggle("collapsed");
        });
    }

    const menuItems = document.querySelectorAll(".menu-item, .list-name");
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(i => i.classList.remove("clicked-effect"));
            this.classList.add("clicked-effect");
        });
    });

    const detailsButtons = document.querySelectorAll(".details-btn");
    detailsButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            this.classList.toggle("clicked-btn");
        });
    });
});