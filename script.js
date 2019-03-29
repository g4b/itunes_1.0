$(document).ready(function(){
    $("#search").click(function(){
        $("#output").empty();
        var term = $("#artist").val();
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + term,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: processResults,
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
                "<tr><td>" + "<img src='" + data.results[i].artworkUrl100 +
                "'/>" + (i + 1) + ":" + data.results[i].artistName + " -- " + data.results[i].trackName +
                "<audio controls='true' src=" + "'" + data.results[i].previewUrl + "'" + " type='audio/m4a'></audio><br>Album:" +
                data.results[i].collectionName + " " +
                "<a href='detail.html?term=" + term + "&trackNum=" + i + "'>See More</a></td></tr><br>");
        }
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
    var term = getQueryParameter("term");
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + term,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data){
            console.log(data);
            moreStats(data);
        },
        error: function(){
            $("#output2").html("Sorry, that didn't work. Please try again.");
        }
    });
}

function moreStats(data){
    var trackNum = getQueryParameter("trackNum");
    var output2 = $("#output2").html();
    output2 += ("<td>Song length: " + (data.results[trackNum].trackTimeMillis / 60000) + " minutes<br>Genre: " +
        data.results[trackNum].primaryGenreName + "<br>Explicit: " + isExplicit(data.results[trackNum]) + "<br><a id='appleLink' href='" +
        data.results[trackNum].previewUrl + "'>Apple Music Page</a></td>");
    $("#songTitle").html("More Info -- " + data.results[trackNum].trackName);
    $("#output2").html(output2);
}

function isExplicit(value){
    if(value.trackExplicitness == "explicit"){
        return "Yes";
    } else {
        return "No";
    }
}