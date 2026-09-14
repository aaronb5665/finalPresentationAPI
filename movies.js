// fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2e325618")

// #######################################################################################
// this section shows the movie title in the .html file 
const searchedTitle = document.querySelector('.movie__title');
const searchInput = document.getElementById('.search-form');
// const search = document.getElementById('searchInput');

searchInput.addEventListener('submit', async (event) => {
    event.preventDefault(); //this will prevent the page from reloadin

    const searchQuery = searchInput.querySelector('input[name="query"]').value.trim();

    if (!searchQuery) return;

    searchedTitle.innerHTML = '<p>Loading...</p>';

    try {
        // const apiKey = '2e325618';
        const response = await fetch(`http://www.omdbapi.com/?s=$(encodeURIComponent${searchQuery})&apikey=2e325618`);

        if (!response.ok) throw new Error('Network response failed');
       
        const data = await response.json();

        if (data.Error === 'False') {
            searchedTitle.innerHTML = `<p>${data.Error}</p>`;
            return;
        }
    }
    catch (error) {
        console.error('Fetch error', error);
        searchedTitle.innerHTML = '<p>Something went wrong.  Please try again.</p>';
    }
});

function displayResults(items) {
    searchedTitle.innerHTML = items.map(item =>
        `<div class="resultsCard">
            <h3>${item.Title} {item.Year}</h3>
            ${item.Poster !== 'N/A' ? `<img src="${item.Poster}" alt="${item.Title}">` : 
            ''}
        </div>
    `).join('')
}

// fetch(`http://www.omdbapi.com/?s=${reponse}&apikey=${apiKey}`).then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//         searchedTitle.innerHTML = data.Search[0].Title;
//         // console.log(searchInput)
//     })    
// })
// #######################################################################################

// fetch("http://www.omdbapi.com/?s=batman&apikey=2e325618").then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//         searchedMovie.innerHTML = data.Search[0].imdbID;
//     })    
// })

// function fetchMovies() {
//     console.log('searchedMovie');
// }

// fetchMovies();