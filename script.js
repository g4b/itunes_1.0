$(document).ready(function(){
    function execute(){
        var term = $("#artist").text();
        $.ajax({
            url: "http://itunes.apple.com/search?term=" + term,
            type: "GET",
            crossDomain: true,
            dataType: "jsonp",
            success: function(data){
                processResults(data);
                console.log(data);
                console.log(data.numResults);
            },
            error: function(){
                $("#output").html("Sorry, that didn't work. Please try again.");
            }
        });
    }
});

function processResults(data){
    var output = $("#output").html();
    data.numResults = $("#results").val();
    for (var i = 0; i < data.numResults; i++){
        output += ("<td>" + i + ":" + data.results[i].artistName + "," + data.results[i].trackName +
            "<audio controls><source src=" + data.results[i].previewUrl + "type='audio/ogg'></audio></td><td>" +
            data.results[i].collectionName + "</td><img src=" + data.results[i].artworkUrl60 + "/>");
    }
    console.log(output);
    $("#output").html(output);
}