/* ==========================================================================
   projects.js — renders project cards (index.html) and project pages
   (blog/project.html) from window.PROJECTS in projects-data.js.
   Markup/classes are the same ones already used in theme.css, so the look
   is unchanged. Nothing to edit here when adding a project.
   ========================================================================== */
(function () {
    // "" on index.html, "../" on blog/project.html (set with data-root on <body>)
    const ROOT = document.body.dataset.root || '';
    const url = (p) => (/^(https?:|mailto:|#)/.test(p) ? p : ROOT + p);
    const list = (a) => a || [];
    const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '');
    const all = window.PROJECTS || [];

    /* ---------- Card on index.html ---------- */
    const cardHTML = (p) => `
        <div id="projects_${p.id}" class="col-md-6 col-lg-4">
            <div class="card tech-card h-100">
                <img src="${url(p.poster)}" class="card-img-top" alt="${p.card.title}">
                <div class="card-body d-flex flex-column px-4">
                    <h5 class="card-title fw-bold">${p.card.title}</h5>
                    <p class="card-text text-muted" style="text-align: justify;">${p.card.text}</p>
                    <a href="${url('blog/project.html')}?id=${p.id}" class="btn btn-outline-accent mt-auto">
                        View Project <i class="bi bi-arrow-right ms-2"></i>
                    </a>
                </div>
            </div>
        </div>`;

    /* ---------- Full page on blog/project.html ---------- */
    const pageHTML = (p) => {
        const o = p.overview, d = p.details, s = p.skills;
        return `
        <section class="py-5 page-hero hero-glow" id="hero">
            <div class="container py-5">
                <div class="row align-items-center gy-5">
                    <div class="col-lg-6 pe-5">
                        <p class="eyebrow mb-2">${p.eyebrow}</p>
                        <h1 class="display-5 fw-bold">${p.title}</h1>
                        <p class="lead text-muted" style="text-align: justify;">${p.hero.lead}</p>
                        <div class="d-flex gap-3 flex-wrap mt-4">
                            <a class="btn btn-accent px-4" href="${url('index.html')}"><i class="bi bi-arrow-left me-2"></i>Back to portfolio</a>
                            ${d ? `<a class="btn btn-outline-accent px-4" href="#${d.id}">${p.hero.buttonLabel}</a>` : ''}
                        </div>
                    </div>
                    <div class="col-lg-6 text-center">
                        <img src="${url(p.poster)}" alt="${p.posterAlt}" class="img-fluid rounded-5 poster-img">
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5 section-alt" id="${o.id}">
            <div class="container">
                <div class="row gy-4">
                    <div class="col-lg-8">
                        <h2 class="fw-semibold display-6">${o.heading}</h2>
                        ${list(o.paragraphs).map((t) => `<p class="text-muted pe-5" style="text-align: justify;">${t}</p>`).join('')}
                        ${list(o.links).length ? `<div class="mt-3 d-flex flex-wrap gap-2">${o.links.map((l) =>
                            `<a class="btn btn-outline-accent px-4" href="${url(l.href)}"${ext(l.href)}>${l.label}</a>`).join('')}</div>` : ''}
                    </div>
                    <div class="col-lg-4">
                        <div class="card tech-card h-100">
                            <div class="card-body p-4">
                                ${list(o.sidebar).map((x, i) => `
                                <h5 class="card-title fw-bold${i ? ' mt-4' : ''}">${x.label}</h5>
                                <p class="card-text text-muted px-3" style="text-align: justify;">${x.text}</p>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        ${d ? `
        <section class="py-5" id="${d.id}">
            <div class="container">
                <div class="row gy-4">
                    <div class="col-lg-6 pe-5">
                        <h2 class="fw-semibold display-6">${d.left.heading}</h2>
                        <p class="text-muted" style="text-align: justify">${d.left.intro}</p>
                        <ul class="list-group list-group-flush text-muted" style="text-align: justify">
                            ${list(d.left.bullets).map((b, i) =>
                                `<li class="list-group-item bg-transparent${i ? '' : ' border-top-0'}">${b}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <h2 class="fw-semibold display-6">${d.right.heading}</h2>
                        <p class="text-muted" style="text-align: justify">${d.right.intro}</p>
                        <div class="row row-cols-1 row-cols-md-2 g-3">
                            ${list(d.right.cards).map((c) => `
                            <div class="col">
                                <div class="tech-card info-card p-4 h-100">
                                    <h6 class="fw-semibold">${c.title}</h6>
                                    <p class="mb-0 text-muted" style="text-align: justify">${c.text}</p>
                                </div>
                            </div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>` : ''}

        ${s ? `
        <section class="py-5 section-alt" id="skills">
            <div class="container py-3">
                <div class="row gy-4 align-items-center">
                    <div class="col-lg-8 pe-5">
                        <h2 class="fw-semibold display-6">${s.heading}</h2>
                        ${list(s.paragraphs).map((t) => `<p class="text-muted" style="text-align: justify">${t}</p>`).join('')}
                    </div>
                    <div class="col-lg-4">
                        <div class="tech-card info-card p-4">
                            <h5 class="fw-bold">${s.panelTitle}</h5>
                            <ul class="list-unstyled text-muted mb-0">
                                ${list(s.items).map((i) => `<li>• ${i}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>` : ''}`;
    };

    /* ---------- Run ---------- */
    // index.html: cards go BEFORE the static "New Builds in Progress" card
    const grid = document.getElementById('project-cards');
    if (grid) {
        grid.insertAdjacentHTML('afterbegin', all.filter((p) => !p.hidden).map(cardHTML).join(''));
    }

    // blog/project.html?id=...
    const page = document.getElementById('project-root');
    if (page) {
        const id = new URLSearchParams(location.search).get('id');
        const p = all.find((x) => x.id === id);
        if (p) {
            document.title = `${p.title} | Project Blog`;
            page.innerHTML = pageHTML(p);
            if (location.hash) {
                const target = document.querySelector(location.hash);
                if (target) target.scrollIntoView();
            }
        } else {
            page.innerHTML = `
            <section class="py-5"><div class="container py-5 text-center">
                <h1 class="display-6 fw-bold">Project not found</h1>
                <p class="text-muted">No project matches “${id || ''}”.</p>
                <a class="btn btn-accent px-4" href="${url('index.html')}">Back to portfolio</a>
            </div></section>`;
        }
    }
})();
