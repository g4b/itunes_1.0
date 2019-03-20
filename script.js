$(document).ready(function(){
    $("#search").click(function(){
        var term = $("#artist").html();
        $.ajax({
            url: "http://itunes.apple.com/search?term=" + term,
            type: "GET",
            crossDomain: true,
            dataType: "jsonp",
            success: function(result){
                processResults(result);
            },
            error: function(){
                $("#output").html("Sorry, that didn't work. Please try again.");
            }
        });
    });
});

function processResults(json){
    var output = $("#output").html();
    json.numResults = $("#results").val();
    for (var i = 0; i < json.numResults; i++){
        output += (
            "<td>" + i + ":" + json.results[i].artistName + "," + json.results[i].trackName +
            "<audio controls><source src=" + json.results[i].previewUrl + "type='audio/ogg'></audio></td><td>" +
            json.results[i].collectionName +
            "</td><img src=" + json.results[i].artworkUrl60 + "/>");
    }
    console.log(output);
    $("#output").html(output);
}