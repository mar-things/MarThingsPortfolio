document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const project = projects[projectId];

            if (!project) {
                document.getElementById("project-container").innerHTML = "<p>Project not found.</p>";
                return;
            }

            document.getElementById("project-container").innerHTML = `
                <h2>${project.title}</h2>
                <img src="${project.image}" alt="${project.title}">
                <p>${project.description}</p>
                <h3>Categories:</h3>
                <ul>${project.labels.map(label => `<li>${label}</li>`).join("")}</ul>
            `;
        })
        .catch(error => console.error("Error loading project:", error));
});
