/* Article search, category filters and category links */
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("articleSearch");
    const searchButton = document.getElementById("searchButton");
    const cards = [...document.querySelectorAll(".article-card")];
    const filterButtons = [...document.querySelectorAll(".filter-btn")];
    const noArticles = document.getElementById("noArticles");

    if (!cards.length) return;

    let selectedCategory = "all";

    function filterArticles() {
        const term = (searchInput?.value || "").trim().toLowerCase();
        let visible = 0;

        cards.forEach(card => {
            const title = (card.dataset.title || card.querySelector("h2,h3")?.textContent || "").toLowerCase();
            const category = (card.dataset.category || "").toLowerCase();
            const content = card.textContent.toLowerCase();
            const matchesText = !term || title.includes(term) || content.includes(term);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;
            const show = matchesText && matchesCategory;

            card.hidden = !show;
            if (show) visible++;
        });

        if (noArticles) noArticles.hidden = visible !== 0;
    }

    function chooseCategory(category) {
        selectedCategory = category;
        filterButtons.forEach(button => {
            const active = button.dataset.category === category;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        filterArticles();
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => chooseCategory(button.dataset.category || "all"));
    });

    searchInput?.addEventListener("input", filterArticles);
    searchButton?.addEventListener("click", filterArticles);
    searchInput?.addEventListener("keydown", event => {
        if (event.key === "Enter") filterArticles();
    });

    const categoryFromURL = new URLSearchParams(window.location.search).get("category");
    if (categoryFromURL && filterButtons.some(button => button.dataset.category === categoryFromURL)) {
        chooseCategory(categoryFromURL);
    } else {
        chooseCategory("all");
    }
});
