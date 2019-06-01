$(document).ready(function () {
    var newSearch = function () {
        search = $("#game-search").val().trim();
        $("#game-search").val("");
    };

    var searchGame = function (term) {

        var key = "52e79fca4d325c1ee085a289f1703202d6089c8e";
        var queryURL = "https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search/?api_key=" + key + "&format=json&query=" + term + "&resources=game";
        //https://www.giantbomb.com/api/search/?api_key=52e79fca4d325c1ee085a289f1703202d6089c8e&format=json&query="metroid prime"&resources=game/
        console.log("TARGET: "+"https://www.giantbomb.com/api/search/?api_key=52e79fca4d325c1ee085a289f1703202d6089c8e&format=json&query=" + term + "&resources=game");
        console.log("With PROXY: "+queryURL);
        //var queryURL = "https://www.giantbomb.com/api/search?api_key=52e79fca4d325c1ee085a289f1703202d6089c8e&field_list=name%2Cdeck%2Coriginal_release_date%2Cimage&query=war&resources=game/"
        // console.log(queryURL);
        // console.log("test");
        var marker;
        $.ajax({
            url: queryURL,
            type: 'GET',
            dataType: "json",
            headers:{
                "Access-Control-Allow-Origin": "*",
                "x-requested-with": "xhr",
                //"format": "json",
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





        return false;
    }
    $("#game-query").on("click", function () {
        $("#game-container").empty();
        if ($("#game-search").val() != "") {
            var a = $("#game-search").val();
            searchGame(a);
            newSearch();
        };
        return false;
    });
});


