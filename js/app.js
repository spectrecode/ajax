$(document).ready(function (){
	$("#search-form button").click(function(event){
		event.preventDefault();
		var term = cleanTerm($("#search-form input").val());
		var results = callItunesSearch(term, showResults);
	});

	function callItunesSearch(searchTerm, showResults){
		startLoading();
		// Pueden revisar el API en el link https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
		var root = 'https://itunes.apple.com/search?';
		$.ajax({
		// completa el ajax aquí
			url: root,
			method: "GET",
			data: {
				term: searchTerm,
				limit: 10,
			},
			succes: function(data){
				console.log("Tudo bem");
				showResults(JSON.parse(data));
			},
			// error: function(data){
			// 	console.log(data, status);
			// 	noResultsMessage();
			// },
			complete:function(data){
				stopLoading();
			},
        // }).then(function(data){
        // 	console.log();
        });
	}

  	// Imprime los resultados
	function showResults(data){
		console.log(data);
		data.results.map(function(cancion, index){
			var audio = new Audio();
			audio.src = cancion.previewUrl;
			audio.controls = true;
			var song  = document.createElement("div");
			$(song).addClass("song");
			var image = document.createElement("img");
			$(image).attr("src", cancion.artworkUrl30);
			$(song).append("audio");
			$(song).append("image");
			$("#search-results").append(song);
		});
	}
  
 	// function noResults(){
  //      	$("#search-results").html(song);
  //   }
  // 	function error(){console.log("Error")}
	
	function cleanTerm(term){
        term = $.trim(term);
		return term.replace(/s/g, "+");
	}

	function startLoading(){
		var div = $(document.createElement("div")).addClass("spinner");
		var dot2 = $(document.createElement("div")).addClass("dot2");
		var dot1 = $(document.createElement("div")).addClass("dot1");
		div.append(dot1);
		div.append(dot2);
		$("#search-results").html("").append(div);
	}

	function stopLoading(){
		$(".spinner").remove();
	}
});

