$(document).ready(function () {
    //var favList = [];
    var search = null;
    var newSearch = function () {
        event.preventDefault();
        search = $("#input").val().trim();
        //localStorage.clear();
        //localStorage.setItem("searchlist", JSON.stringify(resultList));
        $("#input").val("");
    };
    var searchGame = function (term) {
        //need to change url
        //var key = "c3jwjWyqTWqKljMuLXLRmxYXuZfrT7iD";
        //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=" + key;
        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (response) {
            if (response.data != null) {
                var results = response.data;
                for (var i = 0; i < 10; i++) {
                    //this div containts everything
                    var itemDiv = $("<div>");
                    itemDiv.addClass("itemId");
                    itemDiv.attr("id", response.data[i].title);
                    //this div is image
                    var imageBody = $("<img>");
                    imageBody.addClass("imageBody");
                    imageBody.attr("id", term + i);
                    imageBody.attr("src", response.data[i].image);
                    var title = $("<div>");
                    title.addClass("title");
                    title.text(response.data[i].title);
                    var description = $("<div>");
                    description.addClass("description");
                    description.text();
                    var rating = $("<div>");
                    rating.addClass("rating");
                    rating.text(response.data[i].rating);
                    var price = $("<div>");
                    price.addClass("price");
                    price.text(response.data[i].price);
                    var linkVideo = $("<div>");
                    linkVideo.addClass("linkVideo");
                    linkVideo.text("link");
                    var linkAmz = $("<div>");
                    linkAmz.addClass("linkVideo");
                    linkAmz.text("link");
                    //gifDiv.append(t);
                    $("#resultList").append(gifDiv);
                }
            };
        });
    }
    $("#submit").on("click", function () {
        if ($("#input").val() != "") {
            newSearch();
            searchGame(search);
        };
    });
});


