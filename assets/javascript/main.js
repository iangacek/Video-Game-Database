$(document).ready(function () {
    var search = null;
    var newSearch = function () {
        event.preventDefault();
        search = $("#game-search").val().trim();
        $("#game-search").val("");
    };
    var videoSearch = function (term) {

        var apiKey = "AIzaSyDS5gScl0gc9l5iiew-r_2n8CZXPeNBM-Y";
        var queryUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + term + "&key=" + apiKey + "";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(queryUrl)
            console.log(response);
            for (var i = 0; i < 4; i++) {
                var ytLink = "https://www.youtube.com/embed/";
                var vidId = response.items[i].id.videoId;
                var ytVideo = ytLink + vidId;
                console.log(ytVideo);
                var vidEmbed = $("<iframe>");
                vidEmbed.attr("src", ytVideo);
                $("#game-search-result").append(vidEmbed);
            }



        })
    }
    var searchGame = function (term) {
        //need to change url

        var key = "52e79fca4d325c1ee085a289f1703202d6089c8e";
        var queryURL = "https://www.giantbomb.com/api/search?api_key=" + key + "&format=json&query=" + term + "&resources=game";
        console.log(queryURL);
        console.log("test");

        $.ajax({
            url: "https://api.giantbomb.com/search/",
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
            .then(function (response) {
                if (response.results != null) {
                    console.log(response.results[0]);
                    for (var i = 0; i < response.results.length; i++) {
                        //this div containts everything
                        //
                        var itemDiv = $("<div>");
                        itemDiv.addClass("col-md-6");
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
                        var info1 = $("<th>");
                        info1.attr("scope", "col");
                        info1.text("Title");
                        var info2 = $("<th>");
                        info2.attr("scope", "col");
                        info2.text(response.results[i].name);
                        tr0.append(info1);
                        tr0.append(info2);
                        itemHead.append(tr0);
                        itemTable.append(itemHead);
                        var itemBody = $("<tbody>");
                        var tr1 = $("<tr>");
                        var info1 = $("<th>");
                        info1.attr("scope", "row");
                        info1.text("Abstract");
                        var info2 = $("<th>");
                        info2.attr("scope", "row");
                        info2.text(response.results[i].deck);
                        tr1.append(info1);
                        tr1.append(info2);
                        var tr2 = $("<tr>");
                        var info1 = $("<th>");
                        info1.attr("scope", "row");
                        info1.text("Release Date");
                        var info2 = $("<th>");
                        info2.attr("scope", "row");
                        var date = response.results[i].original_release_date;
                        date = date.split(' ')[0];
                        info2.text(date);
                        tr2.append(info1);
                        tr2.append(info2);
                        var tr3 = $("<tr>");
                        var info1 = $("<th>");
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
                    }
                };
            });
    }
    $("#game-query").on("click", function (event) {
        event.preventDefault();
        $("#game-container").empty();
        // change to sidebar when created
        $("#game-search-result").empty();

        if ($("#game-search").val() != "") {
            var a = $("#game-search").val();
            searchGame(a);
            videoSearch(a);
            newSearch();
        };
    });
    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    function openNav() {
        $("#mySidebar").css("width", 250);
        $("#main").css("margin-left", 250);;
    }

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    function closeNav() {
        $("#mySidebar").css("width", 0);
        $("#main").css("margin-left", 0);
    }
    openNav();
    closeNav();
});


