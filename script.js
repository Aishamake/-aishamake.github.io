/* CodeCraft Innovation — shared site interactions */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu") || document.getElementById("navLinks");

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-controls", "navMenu");

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            });
        });

        document.addEventListener("click", event => {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                navMenu.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    const yearElements = document.querySelectorAll("[data-current-year], #currentYear, .current-year");
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Highlight the current page even if the HTML active class is omitted.
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-menu a, .nav-links a").forEach(link => {
        const target = link.getAttribute("href");
        if (target && target.split("#")[0].split("?")[0] === currentFile) {
            link.classList.add("active");
        }
    });
});
