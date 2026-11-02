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

const projectList = document.querySelector("#project-list");

// Elemente per createElement/textContent statt innerHTML, damit Projektdaten nie als HTML interpretiert werden
function renderProjects(filter) {
  projectList.innerHTML = "";

  const visible =
    filter === "alle" ? projects : projects.filter((p) => p.tags.includes(filter));

  visible.forEach((project) => {
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
    projectList.appendChild(card);
  });
}

const filterButtons = document.querySelectorAll(".filter__btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProjects(button.dataset.filter);
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

document.querySelector("#year").textContent = new Date().getFullYear();
