# Portfolio – Esma Sara Ak

Meine persönliche Portfolio-Seite, gebaut **ohne Framework** mit reinem HTML, CSS und JavaScript.

## Features

- **Responsive Design** mit CSS Grid, Flexbox und Media Queries (Desktop, Tablet, Handy)
- **Dark Mode**: folgt der Systemeinstellung und merkt sich die eigene Wahl (`localStorage`)
- **Projektfilter**: Projektkarten werden per JavaScript aus einer Datenliste erzeugt und nach Kategorie gefiltert
- **Formularvalidierung** im Browser mit eigenen Fehlermeldungen
- **Barrierearm**: semantisches HTML, `aria`-Attribute, Bedienung per Tastatur
- **BEM-Namenskonvention** und CSS-Variablen für ein einheitliches Design

## Aufbau

```
portfolio/
├── index.html      # Struktur der Seite
├── css/style.css   # Gestaltung, Light/Dark-Theme, Responsive
└── js/main.js      # Projektkarten, Filter, Dark Mode, Menü, Formular
```

## Entstehung

Das Grundgerüst habe ich mit KI-Unterstützung aufgesetzt, um mich schneller einzuarbeiten. Alle weiteren Features und Anpassungen sind in der Commit-Historie nachvollziehbar.

## Lokal starten

Einfach `index.html` im Browser öffnen. Alternativ in VS Code mit der Erweiterung *Live Server*.

## Online stellen (GitHub Pages)

1. Repository auf GitHub anlegen und den Code hochladen
2. *Settings → Pages → Branch: `main` / Ordner: `/ (root)`* auswählen
3. Nach ca. einer Minute ist die Seite unter `https://42esmmaa.github.io/portfolio/` erreichbar
