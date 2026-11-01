# Dhitya Nurhadi Portfolio

A personal portfolio website showcasing work, experiments, and projects in 3D modeling and animation. Built as a static website using HTML, CSS, and JavaScript, featuring a dark theme and visual elements inspired by the world of 3D.

## Pages

- `index.html` — the main portfolio page, profile, and featured projects.
- `all-project.html` — a project archive with gallery and list views. On Vercel, this page can be accessed through `/all-project` using an explicit rewrite. Select a project to view its details.

## Features

- Responsive layout for desktop and mobile devices.
- CSS and SVG animations and visual elements.
- Project gallery with gallery and list view options.
- Project detail dialog supporting images, descriptions, categories, years, and roles.
- Custom favicon for website branding.

## Project Structure

```text
.
├── index.html
├── all-project.html
├── assets/
│   ├── favicon.svg
│   └── images/
│       └── profile/
├── css/
│   ├── style.css
│   └── projects.css
├── js/
│   ├── main.js
│   └── projects.js
└── documents/
```

## Running Locally

Open `index.html` in a browser, or run the folder using an extension such as Live Server in Visual Studio Code. On Vercel, the main page uses the root domain, while the project archive page `/all-project` is explicitly routed to `all-project.html`.

## Adding Projects

Project content on the `all-project.html` page uses `data-*` attributes on gallery cards and list rows. When adding a project, update both views to keep the details, category, and status consistent.

Use `data-status="upcoming"` for unfinished projects. Other projects are counted as completed. Set `data-source` to the available source URL, or leave it empty if the source has not been shared. If a project has an image, set `data-image` to its image path.

The project summary on `index.html` is intentionally kept brief. Update the completed and upcoming project counts whenever a project status changes.

## Deployment

This website can be deployed as a static site using Vercel. If the GitHub repository is connected to a Vercel project, pushing to the deployment branch will automatically trigger a new deployment.
