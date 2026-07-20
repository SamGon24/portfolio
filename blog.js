/* =============================================
   blog.js — loads posts.json, renders cards,
   handles tag filtering and post modal
   ============================================= */

const grid    = document.getElementById("posts-grid");
const empty   = document.getElementById("posts-empty");
const filter  = document.getElementById("tag-filter");
const modal   = document.getElementById("post-modal");

let allPosts = [];
let activeTag = "all";

/* ---- Load posts ---- */
async function loadPosts() {
  try {
    const res = await fetch("posts.json");
    if (!res.ok) throw new Error("Could not load posts.json");
    allPosts = await res.json();

    // Sort newest first
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    buildTagFilter();
    renderPosts(allPosts);
  } catch (err) {
    grid.innerHTML = `<p style="color:var(--text-2)">Could not load posts. Make sure posts.json is in the same folder.</p>`;
    console.error(err);
  }
}

/* ---- Build tag buttons from unique tags ---- */
function buildTagFilter() {
  const tags = [...new Set(allPosts.flatMap(p => p.tags))].sort();
  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.dataset.tag = tag;
    btn.textContent = tag;
    filter.appendChild(btn);
  });

  filter.addEventListener("click", e => {
    const btn = e.target.closest(".tag-btn");
    if (!btn) return;
    activeTag = btn.dataset.tag;
    filter.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filtered = activeTag === "all"
      ? allPosts
      : allPosts.filter(p => p.tags.includes(activeTag));
    renderPosts(filtered);
  });
}

/* ---- Render post cards ---- */
function renderPosts(posts) {
  grid.innerHTML = "";
  empty.hidden = posts.length > 0;

  posts.forEach((post) => {
    const card = document.createElement("button");
    card.className = "post-card";
    card.setAttribute("aria-label", `Read: ${post.title}`);

    card.innerHTML = `
      <div class="post-card-left">
        <div class="post-card-meta">
          <span class="post-card-date">${formatDate(post.date)}</span>
          <div class="post-card-tags">
            ${post.tags.map(t => `<span class="post-card-tag">${t}</span>`).join("")}
          </div>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-excerpt">${post.excerpt}</p>
      </div>
      <span class="post-card-arrow" aria-hidden="true">→</span>
    `;

    card.addEventListener("click", () => openModal(post));
    grid.appendChild(card);
  });
}

/* ---- Modal open / close ---- */
function openModal(post) {
  document.getElementById("modal-title").textContent = post.title;
  document.getElementById("modal-date").textContent = formatDate(post.date);
  document.getElementById("modal-tags").innerHTML =
    post.tags.map(t => `<span class="post-card-tag">${t}</span>`).join("");

  // Render content: split by \n\n into paragraphs
  const body = document.getElementById("modal-body");
  body.innerHTML = post.content
    .split(/\n\n+/)
    .map(p => `<p>${p.trim()}</p>`)
    .join("");

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

// Close button
modal.querySelector(".modal-close").addEventListener("click", closeModal);

// Close on backdrop click
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);

// Close on Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

/* ---- Date formatter ---- */
function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });
}

/* ---- Init ---- */
loadPosts();
