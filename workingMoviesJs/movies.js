// fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2e325618")

// #######################################################################################
// this section shows the movie title in the .html file 
const searchedTitleYear = document.querySelector('.movieTitle__Year');
// const searchedYear = document.querySelector('.year');
const searchInput = document.getElementById('search-form');
// const search = document.getElementById('searchInput');

searchInput.addEventListener('submit', async (event) => {
    event.preventDefault(); //this will prevent the page from reloadin

    const searchQuery = searchInput.querySelector('input[name="query"]').value.trim();

    if (!searchQuery) return
    searchedTitleYear.innerHTML = '<p>Loading...</p>';

    try {
        const apiKey = '2e325618';
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${apiKey}`);

        if (!response.ok) throw new Error('Network response failed');
       
        const data = await response.json();

        if (data.Error === 'False') {
            searchedTitleYear.innerHTML = `<p>${data.Error}</p>`;
            return;
        }
        displayResults(data.Search);
    }
    catch (error) {
        console.error('Fetch error', error);
        searchedTitleYear.innerHTML = '<p>Something went wrong.  Please try again.</p>';
    }
});

function displayResults(items) {
    searchedTitleYear.innerHTML = items.map(item =>
        `<div class="movieResults">            
                ${item.Poster !== 'N/A' ? `<img src="${item.Poster}" alt="${item.Title}">` : 
                ''}            
                <h3>Movie Title: ${item.Title}</h3>            
                <h3> Movie Year: ${item.Year}</h3>
        </div>
    `).join('')
}

