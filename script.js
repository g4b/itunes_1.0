$(document).ready(function(){
    //$("#output").remove();
    $("#search").click(function(){
        var term = $("#artist").val();
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + term,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result){
                processResults(result);
                return result;
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
                data.results[i].collectionName +
                "<a href='detail.html?track=" + data.results[i] + "'>See More</a></td><br>");
        }
        console.log(output);
        $("#output").html(output);
    }
}