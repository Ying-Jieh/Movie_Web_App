const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1313e8558d2c8e544a67c40816d884ea&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=1313e8558d2c8e544a67c40816d884ea&query=';

const section = document.getElementById("section");
const form = document.getElementById("form");
const query = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
    fetch(url).then(response => response.json())
    .then(data => {
        console.log(data.results);
        data.results.forEach(element => {
            if (element.poster_path === null) {
                return;
            }
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            
            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_col = document.createElement('div');
            div_col.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('id', 'image');
            image.setAttribute('class', 'thumbnail');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            title.innerHTML = `${element.title}`;
            image.src = IMG_PATH + element.poster_path;

            div_card.appendChild(image);
            div_card.appendChild(title);
            div_col.appendChild(div_card);
            div_row.appendChild(div_col);
            section.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    section.innerHTML = '';
    const searchItem = query.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        query.value = '';
    }
})