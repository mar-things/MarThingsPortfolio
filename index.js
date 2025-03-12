document.addEventListener("DOMContentLoaded", function() {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const categories = {
                robotics: document.getElementById("robotics-projects"),
                embedded: document.getElementById("embedded-projects"),
                automation: document.getElementById("automation-projects"),
                tools: document.getElementById("tools-projects")
            };

            projects.forEach(project => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project");
                projectElement.innerHTML = `
                    <h3><a href="project-details.html?id=${projects.indexOf(project)}">${project.title}</a></h3>
                    <img src="${project.image}" alt="${project.title}">
                    <p>${project.description}</p>
                `;

                // Assign projects to categories based on labels
                project.labels.forEach(label => {
                    if (categories[label.toLowerCase()]) {
                        categories[label.toLowerCase()].appendChild(projectElement);
                    }
                });
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});
