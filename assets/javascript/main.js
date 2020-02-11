$(document).ready(function () {
    var newSearch = function () {
        search = $("#game-search").val().trim();
        $("#game-search").val("");
    };

    // YouTube Video Search
    var videoSearch = function (term) {

        var YT_KEY = config.YT_KEY;
        var queryUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + term + "&key=" + YT_KEY + "";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(queryUrl)
            console.log(response);
            for (var i = 0; i < 8; i++) {
                var ytLink = "https://www.youtube.com/embed/";
                var vidId = response.items[i].id.videoId;
                var ytVideo = ytLink + vidId;
                console.log(ytVideo);
                var vidEmbed = $("<iframe>");
                vidEmbed.attr("src", ytVideo);
                $(".videos").append(vidEmbed);
            }
        })
    }
    var searchGame = function (term) {
        var GB_KEY = config.GB_KEY;
        var queryURL = "https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search/?api_key=" + GB_KEY + "&format=json&query=" + term + "&resources=game";
        console.log("With PROXY: "+queryURL);
        var marker;
        $.ajax({
            url: queryURL,
            type: 'GET',
            dataType: "json",
            headers:{
                "Access-Control-Allow-Origin": "*",
                "x-requested-with": "xhr",
            },
            success: function (response) {
                marker = JSON.stringify(this.url);
                console.log("AJAX Success: "+marker);
            },
        }).then(function (response) {
                console.log("AJAX call ");
                if (response.results != null) {
                    //console.log(response.results);

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
                        info1.text("Synopsis");
                        var info2 = $("<th>");
                        info2.attr("scope", "row");
                        info2.text(response.results[i].deck);
                        tr1.append(info1);
                        tr1.append(info2);
                        var tr2 = $("<tr>");
                        var info1 = $("<th>");
                        info1.attr("scope", "row");
                        info1.text("Release Date");
                        // var info2 = $("<th>");
                        // info2.attr("scope", "row");
                        // var date = response.results[i].original_release_date;
                        // date = date.split(' ')[0];
                        // info2.text(date);
                        // tr2.append(info1);
                        // tr2.append(info2);
                        var tr3 = $("<tr>");
                        var info1 = $("<th>");
                        info1.attr("scope", "row");
                       

                        info1.text("Game Art");

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
        $("#game-query").on("click", function () {
            $("#game-container").empty();

            $(".videos").empty();

            if ($("#game-search").val() != "") {
                var a = $("#game-search").val();
                searchGame(a);
                videoSearch(a);
                newSearch();
            };
        });
    });

    // Twitch API call for top 6 games
    var TTV_KEY = config.TTV_KEY;

    $.ajax({
        url: "https://api.twitch.tv/helix/games/top",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Client-ID', TTV_KEY);},

    }).then(function (response) {
        for (var i = 0; i < 6; i++) {
            var imgDiv = $("<div>");
            imgDiv.addClass("col-lg-2 col-md-3 col-sm-4 text-center");
            var image = $("<img>");
            var gameName = $("<p>").text(response.data[i].name);
            image.attr("src", response.data[i].box_art_url.replace('{width}', '173').replace('{height}', '230'));
            gameName.attr("src", response.data[i].name);
            console.log(response.data[i].box_art_url);
            console.log(response.data[i].name);
            imgDiv.append(image);
            imgDiv.append(gameName);
            $("#twitch-container").append(imgDiv);
            var urlSlug = encodeURI(response.data[i].name)
            $(image).wrap(`<a target="_blank" rel="noopener noreferrer" href=http://www.twitch.tv/directory/game/${urlSlug}></a>`);
        }
    });
});
var open = false;
function decide() {
    if (open === true) {
        closeNav();
        open = false;
        $("#main").css({ 'opacity' : 1 });
    } else {
        openNav();
        open = true;
        $("#main").css({ 'opacity' : 0 });
    }
}
decide();

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    $("#mySidebar").css("width", 0);
    $("#main").css("margin-left", 0);
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    $("#mySidebar").css("width", 380);
    $("#main").css("margin-left", 380);
}