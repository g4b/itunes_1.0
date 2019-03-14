var term = $("#artist").html();

function execute(){
    $.ajax({
        url: "http://itunes.apple.com/search?term=" + term,
        type: 'GET',
        crossDomain: true,
        dataType: "jsonp",
        success: function(data){
            processResults(data);
        },
        error: function(){
            $("output").html("Sorry, that didn't work. Please try again.");
        }
    });
}

function processResults(data){
    var output = $("#output").html();
    var numResults = parseInt($("#results").find(":selected").html());
    for (var i = 0; i < numResults; i++){
        output += ("<td>" + i + ":" + data.result[i].artistName + "," + data.result[i].trackName +
            "<audio controls><source src=" + data.result[i].previewUrl + "type='audio/ogg'></audio></td><td>" +
            data.result[i].collectionName + "</td><img src=" + data.result[i].artworkUrl60 + "/>");
    }
    console.log(output);
    $("#output").html(output);

}