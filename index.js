const selector = document.querySelector('.movie_informations');
const btnSearch = document.getElementById('btn_search');
const btnApiKey = document.getElementById('apikey');
let key;

const showMovie = (selector, name, year, poster, code) => {
  selector.innerHTML += `
    <div class="card card-row shadow-light-lg m-5">
      <div class="row no-gutters">
        <img src="${poster}" alt="movie poster">
        <div class="col-12 col-md-6 order-md-1">
          <!-- Body -->
          <div class="card-body">
            <blockquote class="blockquote mb-0 text-center">
              <!-- Text -->
              <h3>${name.toUpperCase()}</h3>
              <!-- Footer -->
              <footer class="blockquote-footer">
                <span><b>${year}</b></span>
              </footer>
            </blockquote>
            <div class="text-center">
              <input id="movie_display" type="submit" data-code="${code}" value="En voir plus" id="read_more" class="btn btn-info mt-5 ml-3">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="${code}" class="modal">
      <div class="modal-content">
        <div class="row">
          <div class="col-3 d-flex justify-content-center align-items-center">  
            <img src="${poster}" alt="movie poster">
          </div>
          <div class="col-9 d-flex flex-column justify-content-center">
            <h2 class="text-center"><b>${name.toUpperCase()}</b></h2>
            <p class="text-center">${year}</p>
            <p class="plot text-center"></p>
          </div>
        </div>
      </div>
    </div> 
  `;
};


const searchMovies = () => {
  selector.innerHTML = ""
  if (key == null) {
    alert("Veuillez saisir votre clé d'API afin de faire votre recherche")
  }
  const inputTitle = document.getElementById('findmovie').value;
  let URL = `https://www.omdbapi.com/?apikey=${key}&s=${inputTitle}`; 
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response
    })
    .then(response => {
      response.Search.forEach(movie => {
        showMovie(selector, movie.Title, movie.Year, movie.Poster, movie.imdbID);
      });
    document.querySelectorAll('#movie_display').forEach(btnmodal => {
      btnmodal.addEventListener('click', readMore);
    });
    })
    .then(() => display())
    .catch((error) => console.error(error)); 
}

btnSearch.addEventListener('click', searchMovies)

const readMore = (movie) => {
  console.log(movie);
  let code = movie.target.dataset.code;
  const URL_ABOUT_MOVIE = `https://www.omdbapi.com/?apikey=${key}&i=${code}`;
  fetch(URL_ABOUT_MOVIE)
    .then((response) => response.json())
    .then((response) => {
      showModal(code, response.Plot);
    })
    .catch(error => console.error(error));
}

const showModal = (code, plot) => {
  let modal = document.getElementById(`${code}`);
  document.querySelector(`#${code} .plot`).innerHTML = plot;
  modal.style.display = "block";
  window.addEventListener('click', event => {
    if(event.target == modal) {
      modal.style.display = "none";
    }
  });
}

const getApi = () => {
  key = prompt("Veuillez saisir votre clé d'API")
  if (key == null) {
    return false;
  }
  let URL = `https://www.omdbapi.com/?apikey=${key}&s=test`;
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      response.Search.forEach(response => {
        console.log("La clé d'api est ok");
      })
      alert("La clé d'Api est fonctionnelle")
    })
    .catch((error) => {
      console.error(error);
      alert("Ta clé d'API n'a pas permis d'effectuer la recherche de test, il faut en saisir une autre !");
      token = null;
    });
}

btnApiKey.addEventListener('click', getApi);

const inputMovie = document.querySelector(".search_input");

inputMovie.addEventListener("keypress", (e) => {
  if (e.code === 'Enter' &&  inputMovie.value !== null) {
    searchMovies();
  }
});
