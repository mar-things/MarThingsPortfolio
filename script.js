document.addEventListener("DOMContentLoaded", function() {
    // Fetch and populate projects
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const sections = {
                "Robotics": document.querySelector("#robotics .projects"),
                "Embedded Systems": document.querySelector("#embedded .projects"),
                "Home Automation": document.querySelector("#automation .projects"),
                "Tools": document.querySelector("#tools .projects")
            };

            projects.forEach((project, index) => {
                project.labels.forEach(label => {
                    if (sections[label]) {
                        const projectElement = document.createElement("div");
                        projectElement.classList.add("project");
                        projectElement.innerHTML = `
                            
                            <a href="project.html?id=${index}"><img src="${project.image}" alt="${project.title}">${project.title}
                            </a>
                            <p>${project.description}</p>
                            
                        `;
                        sections[label].appendChild(projectElement);
                    }
                });
            });
        })
        .catch(error => console.error("Error loading projects:", error));

    // Smooth scrolling
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            // Get the target section
            const targetSection = document.querySelector(this.getAttribute("href"));
            
            // Hide all sections
            document.querySelectorAll("section").forEach(section => {
                section.classList.remove("fade-in");
            });

            // Show the target section
            targetSection.classList.add("fade-in");

            // Scroll to the section
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Set default section to "About Me"
    document.querySelector("#about").classList.add("fade-in");

    // Fade-in animation on scroll
    const sectionsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll("section").forEach(section => {
        sectionsObserver.observe(section);
    });
});
