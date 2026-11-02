const projects = [
  {
    title: "Portfolio-Seite",
    description:
      "Diese Seite: responsiver One-Pager mit Dark Mode, Projektfilter und Formularvalidierung – ohne Framework.",
    tech: ["HTML", "CSS", "JavaScript"],
    tags: ["frontend"],
    link: "https://github.com/42esmmaa/portfolio",
  },
  {
    title: "Bau-Website mit Next.js",
    description:
      "Website für ein fiktives Bauunternehmen mit Projektübersicht, Detailseiten und Kontaktformular.",
    tech: ["Next.js", "TypeScript", "CSS Modules"],
    tags: ["frontend"],
    link: "https://github.com/42esmmaa/bau-website",
  },
  {
    title: "Microservice „Blumenladen“",
    description:
      "REST-Service mit Spring Boot und PostgreSQL, Qualitätssicherung mit SonarQube, Deployment auf Kubernetes.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Kubernetes"],
    tags: ["backend", "devops"],
    link: "https://github.com/42esmmaa/blumenladen",
  },
  {
    title: "Fitnessstudio (Teamprojekt)",
    description:
      "Backend mit Python/FastAPI auf PostgreSQL; Zusammenarbeit im Team über Git und GitHub Projects.",
    tech: ["Python", "FastAPI", "PostgreSQL"],
    tags: ["backend"],
    link: "https://github.com/42esmmaa/fitnessstudio",
  },
];

// Einblenden beim Scrollen
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); // nur einmal einblenden
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".section__title, .about__text, .about__facts li, .filter, .skills__group, .contact__intro, .form, .contact__links")
  .forEach((el) => {
    el.classList.add("reveal");
    // Elemente in derselben Gruppe leicht versetzt einblenden
    if (el.matches(".about__facts li, .skills__group")) {
      el.style.setProperty("--i", [...el.parentElement.children].indexOf(el));
    }
    revealObserver.observe(el);
  });

const projectList = document.querySelector("#project-list");

// Elemente per createElement/textContent statt innerHTML, damit Projektdaten nie als HTML interpretiert werden
function renderProjects(filter, animate = false) {
  projectList.innerHTML = "";

  const visible =
    filter === "alle" ? projects : projects.filter((p) => p.tags.includes(filter));

  visible.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = project.title;

    const text = document.createElement("p");
    text.className = "card__text";
    text.textContent = project.description;

    const tags = document.createElement("ul");
    tags.className = "tags";
    project.tech.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      tags.appendChild(li);
    });

    const link = document.createElement("a");
    link.className = "card__link";
    link.href = project.link;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Code auf GitHub →";

    card.append(title, text, tags, link);

    // Beim Filtern sofort zeigen, beim ersten Laden erst beim Scrollen einblenden
    card.classList.add("reveal");
    card.style.setProperty("--i", index);
    if (animate) {
      requestAnimationFrame(() => card.classList.add("is-visible"));
    } else {
      revealObserver.observe(card);
    }

    projectList.appendChild(card);
  });
}

const filterButtons = document.querySelectorAll(".filter__btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProjects(button.dataset.filter, true);
  });
});

renderProjects("alle");

const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {
  // localStorage kann blockiert sein (z. B. privater Modus)
}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // siehe oben
  }
});

const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.querySelector("#contact-form");
const successMessage = document.querySelector("#form-success");

function setError(input, message) {
  const field = input.closest(".form__field");
  field.querySelector(".form__error").textContent = message;
  field.classList.toggle("has-error", message !== "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  let valid = true;

  if (name.value.trim() === "") {
    setError(name, "Bitte gib deinen Namen ein.");
    valid = false;
  } else {
    setError(name, "");
  }

  if (!isValidEmail(email.value.trim())) {
    setError(email, "Bitte gib eine gültige E-Mail-Adresse ein.");
    valid = false;
  } else {
    setError(email, "");
  }

  if (message.value.trim().length < 10) {
    setError(message, "Die Nachricht sollte mindestens 10 Zeichen lang sein.");
    valid = false;
  } else {
    setError(message, "");
  }

  if (valid) {
    // TODO: echten Versand anbinden – aktuell gibt es kein Backend
    successMessage.textContent = `Danke, ${name.value.trim()}! Deine Nachricht wurde geprüft.`;
    form.reset();
  } else {
    successMessage.textContent = "";
  }
});

// Interaktiver Hintergrund im Hero
const hero = document.querySelector(".hero");
const glow = document.querySelector(".hero__glow");
const canAnimate = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

if (hero && glow && canAnimate) {
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let running = false;

  hero.addEventListener("pointermove", (event) => {
    const rect = glow.getBoundingClientRect();
    target.x = event.clientX - rect.left;
    target.y = event.clientY - rect.top;
    if (!running) {
      running = true;
      requestAnimationFrame(follow);
    }
  });

  // Der Schein läuft der Maus weich hinterher, statt zu springen
  function follow() {
    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;
    glow.style.setProperty("--x", `${current.x}px`);
    glow.style.setProperty("--y", `${current.y}px`);

    if (Math.abs(target.x - current.x) > 0.5 || Math.abs(target.y - current.y) > 0.5) {
      requestAnimationFrame(follow);
    } else {
      running = false;
    }
  }

  // Startposition: Mitte des sichtbaren Hero-Bereichs
  const rect = glow.getBoundingClientRect();
  const heroRect = hero.getBoundingClientRect();
  current.x = target.x = heroRect.left - rect.left + heroRect.width / 2;
  current.y = target.y = heroRect.height * 0.4;
  glow.style.setProperty("--x", `${current.x}px`);
  glow.style.setProperty("--y", `${current.y}px`);
}

document.querySelector("#year").textContent = new Date().getFullYear();
