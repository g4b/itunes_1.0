$(document).ready(function(){
    $("#search").click(function(){
        $("#output").empty();
        var term = $("#artist").val();
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + term,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(data){
                processResults(data);
                return data;
            },
            error: function(){
                $("#output").html("Sorry, that didn't work. Please try again.");
            }
        });
    });
});

function processResults(data){
    console.log(data);
    var term = $("#artist").val();
    var output = $("#output").html();
    if (term == ""){
        alert("Error! You did not enter an artist name. Please try again.");
    } else {
        data.numResults = $("#results").val();
        for (var i = 0; i < data.numResults; i++){
            output += (
                "<td>" + "<img src='" + data.results[i].artworkUrl100 +
                "'/>" + (i + 1) + ":" + data.results[i].artistName + "," + data.results[i].trackName +
                "<audio controls><source src=" + data.results[i].previewUrl + "type='audio/m4a'></audio><br>Album:" +
                data.results[i].collectionName + " " +
                "<a href='detail.html?artist=" + data.results[i].artistName + "&track=" + data.results[i] + "'>See More</a></td><br>");
        }
        console.log(output);
        $("#output").html(output);
    }
}

function getQueryParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0;i < vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == name) {
            return pair[1];
        }
    }
    return false;
}

function secondPage(){
    var artist = getQueryParameter("artist");
    var track = getQueryParameter("track");
    $.ajax({
        url: "https://itunes.apple.com/search?artistName=" + artist + "&trackName=" + track,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data){
            console.log(data);
            moreStats(data);
            return data;
        },
        error: function(){
            $("#output").html("Sorry, that didn't work. Please try again.");
        }
    });
}

function moreStats(data){
    var output2 = $("#output2").html();
    output2 += "<td>Song length:" + data.results[i].trackTimeMillis + "Genre:" +
        data.results[i].primaryGenreName + "Explicit:" + isExplicit(data.results[i]) + "</td>"
}

function isExplicit(value){
    return value.
}