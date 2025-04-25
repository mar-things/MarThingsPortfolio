document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get("id"), 10); // Convert id to a number

    fetch("projects.json")
        .then((response) => response.json())
        .then((projects) => {
            const project = projects[projectId];

            if (!project) {
                document.getElementById("project-container").innerHTML =
                    "<p>Project not found.</p>";
                return;
            }

            document.getElementById("project-container").innerHTML = `
                <h2><a href="project.html?id=${projectId}">${project.title}</a></h2>
                <img src="${project.image}" alt="${project.title}">
                <p>${project.detailedDescription}</p>
                <h3>Categories:</h3>
                <ul>${project.labels
                    .map((label) => `<li>${label}</li>`)
                    .join("")}</ul>
            `;
        })
        .catch((error) =>
            console.error("Error loading project:", error)
        );
});
