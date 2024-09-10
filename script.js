// Sample Anime data
const animeList = [
    { title: "Naruto", type: "Shonen", genres: ["Action", "Adventure"], image: "https://cdn.myanimelist.net/images/anime/1141/142503.jpg", description: "Ninja adventure", rating: 4.5 },
    { title: "One Piece", type: "Shonen", genres: ["Action", "Adventure", "Comedy"], image: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg", description: "Pirate adventure", rating: 4.7 },
    { title: "Demon Slayer", type: "Shonen", genres: ["Action", "Supernatural"], image: "https://cdn.myanimelist.net/images/anime/1765/135099.jpg", description: "Demon-slaying adventure", rating: 4.8 },
    { title: "Spy x Family", type: "Shonen", genres: ["Action", "Comedy"], image: "https://cdn.myanimelist.net/images/anime/1506/138982.jpg", description: "Spy family comedy", rating: 4.6 },
    { title: "Hunter x Hunter", type: "Shonen", genres: ["Action", "Adventure"], image: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg", description: "Hunter adventure", rating: 4.9 },
    { title: "One Punch Man", type: "Seinen", genres: ["Action", "Comedy"], image: "https://cdn.myanimelist.net/images/anime/12/76049.jpg", description: "Overpowered hero comedy", rating: 4.7 },
    { title: "Jujutsu Kaisen", type: "Shonen", genres: ["Action", "Supernatural"], image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", description: "Cursed spirits battle", rating: 4.8 },
    { title: "Attack on Titan", type: "Shonen", genres: ["Action", "Dark Fantasy"], image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", description: "Humanity vs. Titans", rating: 4.9 },
    { title: "Fairy Tail", type: "Shonen", genres: ["Action", "Fantasy"], image: "https://cdn.myanimelist.net/images/anime/1536/93863.jpg", description: "Wizard guild adventures", rating: 4.5 },
    { title: "Blue Lock", type: "Shonen", genres: ["Sports", "Psychological"], image: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg", description: "Competitive soccer training", rating: 4.6 },
    { title: "Fruits Basket", type: "Shojo", genres: ["Romance", "Supernatural"], image: "https://cdn.myanimelist.net/images/anime/1447/99827.jpg", description: "Zodiac family romance", rating: 4.7 },
    { title: "Pokemon", type: "Kodomomuke", genres: ["Adventure", "Fantasy"], image: "https://cdn.myanimelist.net/images/anime/1787/140239.jpg", description: "Pocket monster adventures", rating: 4.4 },
    { title: "Berserk", type: "Seinen", genres: ["Action", "Dark Fantasy"], image: "https://cdn.myanimelist.net/images/anime/1384/119988.jpg", description: "Dark medieval fantasy", rating: 4.8 },
    { title: "Chihayafuru", type: "Josei", genres: ["Sports", "Drama"], image: "https://cdn.myanimelist.net/images/anime/3/35749.jpg", description: "Competitive karuta playing", rating: 4.6 },
];

const animeTypes = ["Kodomomuke", "Shonen", "Shojo", "Seinen", "Josei"];
const genreList = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "Sci-Fi", "Sports", "Supernatural", "Psychological", "Horror", "Dark Fantasy"];

// Function to create filter checkboxes
function createFilters() {
    const typeFiltersSection = document.getElementById('type-filters');
    const genreFiltersSection = document.getElementById('genre-filters');
    
    animeTypes.forEach(type => createCheckbox(type, typeFiltersSection));
    genreList.forEach(genre => createCheckbox(genre, genreFiltersSection));
}

function createCheckbox(value, container) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = value;
    checkbox.value = value;
    
    const label = document.createElement('label');
    label.htmlFor = value;
    label.textContent = value;
    
    container.appendChild(checkbox);
    container.appendChild(label);
}

// Function to display Anime cards
function displayAnime(animeToDisplay) {
    const animeListElement = document.getElementById('anime-list');
    animeListElement.innerHTML = '';
    
    animeToDisplay.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <div class="rating">${'★'.repeat(Math.round(anime.rating))}</div>
            <p>${anime.description}</p>
            <p><strong>Type:</strong> ${anime.type}</p>
            <p><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
        `;
        animeListElement.appendChild(animeCard);
    });
}

// Function to filter Anime based on selected types and genres
function filterAnime() {
    const selectedTypes = Array.from(document.querySelectorAll('#type-filters input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    const selectedGenres = Array.from(document.querySelectorAll('#genre-filters input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const filteredAnime = animeList.filter(anime => 
        (selectedTypes.length === 0 || selectedTypes.includes(anime.type)) &&
        (selectedGenres.length === 0 || selectedGenres.some(genre => anime.genres.includes(genre)))
    );
    
    displayAnime(filteredAnime);
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    createFilters();
    displayAnime(animeList);
    
    document.getElementById('filters').addEventListener('change', filterAnime);
    document.getElementById('clear-filters').addEventListener('click', () => {
        document.querySelectorAll('#filters input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        displayAnime(animeList);
    });

    // Add dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.textContent = 'Toggle Dark Mode';
    darkModeToggle.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeToggle);
});

// Function to sort anime
function sortAnime(criteria) {
    let sortedAnime;
    switch(criteria) {
        case 'rating':
            sortedAnime = animeList.sort((a, b) => b.rating - a.rating);
            break;
        case 'title':
            sortedAnime = animeList.sort((a, b) => a.title.localeCompare(b.title));
            break;
        // Add more sorting criteria as needed
    }
    displayAnime(sortedAnime);
}

// Add sorting functionality (you'll need to add UI elements to trigger this)
document.getElementById('sort-rating').addEventListener('click', () => sortAnime('rating'));
document.getElementById('sort-title').addEventListener('click', () => sortAnime('title'));