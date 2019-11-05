function searchMovie() {
  $("#movies-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "94ad3b67",
      s: $("#search-input").val()
    },
    success: function(result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function(i, data) {
          $("#movies-list").append(
            `
            <div class="col-md-4">
              <div class="card mb-3">
                  <img class="card-img-top" src="` +
              data.Poster +
              `" alt="Card image cap">
                  <div class="card-body">
                  <h5 class="card-title">` +
              data.Title +
              `</h5>
                <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
                  <a href="#" data-toggle="modal" data-id="` +
              data.imdbID +
              `" data-target="#exampleModal" class="card-link see-detail">See Details</a>

                  </div>
              </div>
            </div>
              `
          );
        });

        $("#search-input").val("");
      } else {
        $("#movies-list").html(
          `<div class="col">
            <h1 class="text-center">` +
            result.Error +
            `</h1>
            </div>`
        );
      }
    }
  });
}

$("#search-button").on("click", function() {
  searchMovie();
});

$("#search-input").on("keyup", function(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$("#movies-list").on("click", ".see-detail", function() {
  console.log($(this).data("id"));
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "94ad3b67",
      i: $(this).data("id")
    },
    success: function(movie) {
      //console.log(movie);
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
          <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" src="` +
            movie.Poster +
            `">
                </div>
                <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3></li>
            <li class="list-group-item">` +
            movie.Released +
            `</li>
            <li class="list-group-item">Released: ` +
            movie.Released +
            `</li>
            <li class="list-group-item">Genre: ` +
            movie.Genre +
            `</li>
            <li class="list-group-item">Actors: ` +
            movie.Actors +
            `</li>
            <li class="list-group-item">IMDB Ratings: ` +
            movie.imdbRating +
            `</li>
                    </ul>
                </div>
            </div>
          </div>
          `
        );
      }
    }
  });
});
