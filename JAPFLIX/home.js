const movieId = localStorage.getItem('movieId')
const requestURL = 'https://japceibal.github.io/japflix_api/movies-data.json'

let movies = []

const request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    movies = request.response
}

let form = document.getElementById("myForm");

function showInfo(e, movie) {
    document.getElementById("offcanvasTopLabel").innerHTML = movie.title
    document.getElementById("infoOverview").innerHTML = movie.overview
    document.getElementById("genreList").innerHTML = ""
    movie.genres.forEach(genre => {
        var il = document.createElement("li")
        il.innerHTML = genre.name
        document.getElementById("genreList").appendChild(il)
    });
    document.getElementById("infoYear").innerHTML = movie.release_date.substring(0,4)
    document.getElementById("infoRuntime").innerHTML = movie.runtime
    document.getElementById("infoBudget").innerHTML = '$' + movie.budget
    document.getElementById("infoRevenue").innerHTML = '$' + movie.revenue
}

function ingresarMovie(e){
    e.preventDefault()
    var movie = document.getElementById("inputBuscar").value;
    let htmlContentToAppend = "";

    if (movie.length >= 0){
        let foundMovies = movies.filter(m => {
            return (
                m.title.toLowerCase().includes(movie.toLowerCase()) ||
                m.tagline.toLowerCase().includes(movie.toLowerCase()) ||
                m.overview.toLowerCase().includes(movie.toLowerCase()) ||
                m.genres.map(a => a.name.toLowerCase()).includes(movie.toLowerCase())
            )
        })
        if(foundMovies){
            foundMovies.forEach(movie => {
                scoreText = ""
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.ceil(movie.vote_average/2)) {
                        scoreText += `<span class="fa fa-star checked"></span>`
                    }else{
                        scoreText += `<span class="fa fa-star"></span>`
                    }
                }
                var el = document.createElement("div")
                el.innerHTML =  
                `<div class="movieItem" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                    <div>
                        <h3>${movie.title}</h3>
                        <p>${movie.tagline}</p>
                    </div>
                    <p>${scoreText}</p>
                </div>`
                el.onclick = function( e ) {
                    showInfo(e, movie);
                }
                document.getElementById("movie-list-container").appendChild(el);
            });        
        }
        
    } 
}

form.addEventListener('submit', ingresarMovie);





    /*"budget"
    "genres"=
    "original_language"=
    "title"
    "overview"
    "popularity"
    "release_date"
    "revenue"
    "runtime"
    "tagline"
    "vote_average"*/