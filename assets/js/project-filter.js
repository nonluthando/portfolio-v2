(() => {
  const buttons = Array.from(document.querySelectorAll(".skill-filter"));
  const projects = Array.from(document.querySelectorAll("[data-project]"));
  const rows = projects.filter((project) => project.tagName === "TR");
  const count = document.getElementById("project-count");
  const emptyMessage = document.getElementById("empty-filter-message");

  if (!buttons.length || !projects.length) {
    return;
  }

  const availableFilters = new Set(buttons.map((button) => button.dataset.filter));

  const applyFilter = (requestedFilter, updateUrl = true) => {
    const filter = availableFilters.has(requestedFilter) ? requestedFilter : "all";
    let visibleCount = 0;

    projects.forEach((project) => {
      const skills = (project.dataset.skills || "").split(/\s+/).filter(Boolean);
      const visible = filter === "all" || skills.includes(filter);

      project.hidden = !visible;
      // Table rows and gallery cards mirror each other, so count one set only.
      if (visible && (!rows.length || project.tagName === "TR")) {
        visibleCount += 1;
      }
    });

    buttons.forEach((button) => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (count) {
      count.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    }

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (filter === "all") {
        url.searchParams.delete("skill");
      } else {
        url.searchParams.set("skill", filter);
      }
      window.history.replaceState({}, "", url);
    }
  };

  const db = document.querySelector(".db");
  document.querySelectorAll(".db-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      db.dataset.view = tab.dataset.view;
      document.querySelectorAll(".db-tab").forEach((other) => {
        other.setAttribute("aria-pressed", String(other === tab));
      });
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  const requestedFilter = new URL(window.location.href).searchParams.get("skill") || "all";
  applyFilter(requestedFilter, false);
})();
