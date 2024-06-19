document.addEventListener('DOMContentLoaded', () => {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // To check if data is being fetched correctly
            window.travelData = data; // Store data globally for easy access
            displayTravelRecommendations(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value.toLowerCase();
        searchTravelRecommendations(query);
    });

    document.getElementById('clear-button').addEventListener('click', clearResults);
});

function displayTravelRecommendations(data) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = ''; // Clear previous content

    // Display initial recommendations (optional)
}

function searchTravelRecommendations(query) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = ''; // Clear previous results

    const data = window.travelData;

    if (!data) return;

    // Helper function to create and append item elements
    const createItemElement = (parent, item) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const itemImage = document.createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.name;
        itemDiv.appendChild(itemImage);

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        itemDiv.appendChild(itemName);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemDiv.appendChild(itemDescription);

        parent.appendChild(itemDiv);
    };

    if (query === 'beach') {
        // Display Beaches
        if (data.beaches) {
            const beachDiv = document.createElement('div');
            beachDiv.classList.add('category');

            const beachTitle = document.createElement('h2');
            beachTitle.textContent = 'Beaches';
            beachDiv.appendChild(beachTitle);

            data.beaches.slice(0, 2).forEach(beach => {
                createItemElement(beachDiv, beach);
            });

            container.appendChild(beachDiv);
        }
    } else if (query === 'temple') {
        // Display Temples
        if (data.temples) {
            const templeDiv = document.createElement('div');
            templeDiv.classList.add('category');

            const templeTitle = document.createElement('h2');
            templeTitle.textContent = 'Temples';
            templeDiv.appendChild(templeTitle);

            data.temples.slice(0, 2).forEach(temple => {
                createItemElement(templeDiv, temple);
            });

            container.appendChild(templeDiv);
        }
    } else if (query === 'country') {
        // Display Countries and Cities
        if (data.countries) {
            data.countries.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.classList.add('category');

                const countryName = document.createElement('h2');
                countryName.textContent = country.name;
                countryDiv.appendChild(countryName);

                country.cities.slice(0, 2).forEach(city => {
                    createItemElement(countryDiv, city);
                });

                container.appendChild(countryDiv);
            });
        }
    }
}

function clearResults() {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = ''; // Clear the results container
    document.getElementById('search-input').value = ''; // Clear the search input
}
