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

            // List of projects still in progress
            const projectsInProgress = ["Self-Driving Robot", "ESP32 Smart Light 'Death Star'", "Dev boy board", "Load Cell tester / Operational Amplifier", "Enderwire - 3D Printer conversion", "MartinLoren Oscilloscope Manufacturing", "Monitor Stand", "Dev boy board", "Home Server - Raspberry Pi", "Frigate - Home Surveillance", "NAS- Network Attached Storage using samba share and OpenVaultMedia (OMV)", "Desk Lightbar", "Custom wall mounted bedroom lamp", "Machine learning & Stock Market", "e-sim Handbrake", "Multimeter / Oscilloscope", "TwoTrees TTC 450 pro - CNC", "3D Printers", "Crimping Tools", "Label Printer", "Solidworks & Fusion 360", "GeekForGeeks & 3SCHOOLS", "Cube/espressif/eclipse/VS/Arduino ide's", "Vs Code", "PlatformIO", "GIT", "C/C++/Python/Java/js/sql/HTML/CSS/PHP/Arduino/ESP-IDF/Free"];

            projects.forEach((project, index) => {
                project.labels.forEach(label => {
                    if (sections[label]) {
                        const projectElement = document.createElement("div");
                        projectElement.classList.add("project");
                        projectElement.innerHTML = `
                            <a href="project.html?id=${index}">
                                <img src="${project.image}" alt="${project.title}">
                                ${project.title}
                            </a>
                            <p>${project.description}</p>
                        `;

                        // Add "Still working on it!" banner if the project is in progress
                        if (projectsInProgress.includes(project.title)) {
                            const banner = document.createElement("div");
                            banner.className = "work-in-progress";
                            banner.innerText = "Work in progress!";
                            projectElement.appendChild(banner);
                        }

                        sections[label].appendChild(projectElement);
                    }
                });
            });
        })
        .catch(error => console.error("Error loading projects:", error));

    // Social media links data
    const socialMediaLinks = [
        
        { name: "LinkedIn", url: "https://www.linkedin.com/in/martín-gomez-179439206", icon: "media/icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/mar-things", icon: "media/icons/github.png" },
        { name: "Resume", url: "https://drive.google.com/file/d/1V90Q1lXYB6p2z3H-QKgqAfkrb1BaQYcA/view?usp=drive_link", icon: "media/Icons/personal-profile.png" },
        { name: "Thingiverse", url: "https://www.thingiverse.com/marthings/designs", icon: "media/Icons/Thingiverse.svg" , style:"background-color:#0082C9"},
        { name: "FormulaStudent", url: "https://sites.google.com/view/lithuanianspeedforce/home", icon: "media/Icons/racing-car.png" }
    ];

    // Populate social media links dynamically
    const socialMediaContainer = document.getElementById("social-media-links");
    socialMediaLinks.forEach(link => {
        const linkElement = document.createElement("a");
        linkElement.href = link.url;
        linkElement.target = "_blank"; // Open in a new tab
        linkElement.classList.add("social-media-link");
        linkElement.innerHTML = `
            <img src="${link.icon}" alt="${link.name} Icon" title="${link.name}" style="${link.style}">
        `;
        socialMediaContainer.appendChild(linkElement);
    });

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
