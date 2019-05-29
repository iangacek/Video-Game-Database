$(document).ready(function () {
    //var favList = [];
    var search = null;
    var newSearch = function () {
        event.preventDefault();
        search = $("#game-search").val().trim();
        //localStorage.clear();
        //localStorage.setItem("searchlist", JSON.stringify(resultList));
        $("#game-search").val("");
    };
    var searchGame = function (term) {
        //need to change url

        var key = "52e79fca4d325c1ee085a289f1703202d6089c8e";
        var queryURL = "https://www.giantbomb.com/api/search?api_key=" + key + "&format=json&query=" + term + "&resources=game";
        console.log(queryURL);
        console.log("test");

        $.ajax({
            url: "http://api.giantbomb.com/search/",
            dataType: "jsonp",
            jsonp: "json_callback",
            data: {
                api_key: "52e79fca4d325c1ee085a289f1703202d6089c8e",
                query: term,
                format: "jsonp",
                //we can change searched item here
                //field_list: "name, deck",
                //field_list: "deck",
                //field_list: "original_release_date",
                //field_list: "image",
                resources: "game",
            },
        })
        // .then(function (response) {
        //     //test
        //     console.log("test success");
        //     console.log(response.results[0]);
        // })
        .then(function (response) {
            if (response.results != null) {
                console.log(response.results[0]);
                for (var i = 0; i < response.results.length ; i++) {
                    //this div containts everything
                    //
                    var itemDiv = $("<div>");
                    itemDiv.addClass("col-md-3");
                    //
                    var itemResTable = $("<div>");
                    itemResTable.addClass("table-responsive");
                    itemDiv.append(itemResTable);
                    //
                    var itemTable = $("<table>");
                    itemTable.addClass("table");
                    itemResTable.append(itemTable);
                    //
                    var itemHead = $("<thead>");
                    itemHead.addClass("thead-dark");
                    //
                    var tr0 = $("<tr>");
                    var info1 =$("<th>");
                    info1.attr("scope", "col");
                    info1.text("Title");
                    var info2 =$("<th>");
                    info2.attr("scope", "col");
                    info2.text(response.results[i].name);
                    tr0.append(info1);
                    tr0.append(info2);
                    itemHead.append(tr0);
                    itemTable.append(itemHead);
                    var itemBody = $("<tbody>");
                    var tr1 = $("<tr>");
                    var info1 =$("<th>");
                    info1.attr("scope", "row");
                    info1.text("Abstract");
                    var info2 =$("<th>");
                    info2.attr("scope", "row");
                    info2.text(response.results[i].deck);
                    tr1.append(info1);
                    tr1.append(info2);
                    var tr2 = $("<tr>");
                    var info1 =$("<th>");
                    info1.attr("scope", "row");
                    info1.text("Release Date");
                    var info2 =$("<th>");
                    info2.attr("scope", "row");
                    info2.text(response.results[i].original_release_date);
                    tr2.append(info1);
                    tr2.append(info2);
                    var tr3 = $("<tr>");
                    var info1 =$("<th>");
                    info1.attr("scope", "row");
                    info1.text("img");
                    var info2 = $("<th>");
                    info2.attr("scope", "row");
                    var image = $("<img>")
                    image.attr("src", response.results[i].image.original_url);
                    image.css("max-width", "100%");
                    info2.append(image);
                    tr3.append(info1);
                    tr3.append(info2);
                    itemBody.append(tr1);
                    itemBody.append(tr2);
                    itemBody.append(tr3);
                    itemTable.append(itemBody);
                    $("#game-container").append(itemDiv);
                    console.log("item added");


                    //itemDiv.attr("id", response.data[i].title);
                    //this div is image
                    // var imageBody = $("<img>");
                    // imageBody.addClass("imageBody");
                    // imageBody.attr("id", term + i);
                    // imageBody.attr("src", response.data[i].image);
                    // var name = $("<div>");
                    
                    // title.addClass("title");
                    // title.text(response.data[i].title);
                    // var description = $("<div>");
                    // description.addClass("description");
                    // description.text();
                    // var rating = $("<div>");
                    // rating.addClass("rating");
                    // rating.text(response.data[i].rating);
                    // var price = $("<div>");
                    // price.addClass("price");
                    // price.text(response.data[i].price);
                    // var linkVideo = $("<div>");
                    // linkVideo.addClass("linkVideo");
                    // linkVideo.text("link");
                    // var linkAmz = $("<div>");
                    // linkAmz.addClass("linkVideo");
                    // linkAmz.text("link");
                    // //gifDiv.append(t);
                    // $("#resultList").append(gifDiv);
                }
            };
        });
    }
    $("#game-query").on("click", function () {
        if ($("#game-search").val() != "") {
            var a = $("#game-search").val();
            searchGame(a);
            newSearch();

        };
    });
});


