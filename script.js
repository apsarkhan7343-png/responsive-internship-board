
const container = document.getElementById("internshipContainer");
const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");

// Step 5.3: Get result count element
const resultCount = document.getElementById("resultCount");

let internships = [];


// Load internship data
async function loadInternships() {

    try {

        const response = await fetch("internships.json");

        if (!response.ok) {
            throw new Error("Unable to load internship data");
        }

        internships = await response.json();

        if (!Array.isArray(internships)) {
            throw new Error("Invalid internship data");
        }

        renderInternships(internships);

    } catch (error) {

        console.error(error);

        container.innerHTML = "";

        emptyMessage.hidden = true;

        // Step 5.3: Update error result count
        resultCount.textContent = "Internships unavailable";

        errorMessage.hidden = false;
    }
}


// Display internship cards
function renderInternships(data) {

    container.innerHTML = "";

    errorMessage.hidden = true;

    // Empty state
    if (data.length === 0) {

        emptyMessage.hidden = false;

        // Step 5.3: Display zero results
        resultCount.textContent = "0 internships found";

        return;
    }

    emptyMessage.hidden = true;

    // Step 5.3: Display result count
    resultCount.textContent =
        `${data.length} internship(s) found`;


    // Create internship cards
    data.forEach(internship => {

        const card = document.createElement("article");

        card.className = "internship-card";

        const title = document.createElement("h3");

        title.textContent = internship.title;

        const company = document.createElement("p");

        company.textContent = "Company: " + internship.company;

        const duration = document.createElement("p");

        duration.textContent = "Duration: " + internship.duration;

        const location = document.createElement("p");

        location.textContent = "Location: " + internship.location;

        const domain = document.createElement("span");

        domain.className = "domain";

        domain.textContent = internship.domain;

        card.append(
            title,
            company,
            duration,
            location,
            domain
        );

        container.appendChild(card);

    });

}


// Search and domain filtering
function filterInternships() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedDomain = domainFilter.value;

    const filteredData = internships.filter(internship => {

        const matchesSearch =
            internship.title.toLowerCase().includes(searchText) ||
            internship.company.toLowerCase().includes(searchText);

        const matchesDomain =
            selectedDomain === "all" ||
            internship.domain === selectedDomain;

        return matchesSearch && matchesDomain;

    });

    renderInternships(filteredData);

}


// Event listeners
searchInput.addEventListener("input", filterInternships);

domainFilter.addEventListener("change", filterInternships);


// Start application
loadInternships();
