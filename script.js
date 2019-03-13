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
        output += ("<td>" + data.result[i].trackName +
        "</td><td>" + "<audio controls='true' src=" + data.result[i].previewUrl + "></audio></td>");
    }
    $("#output").html(output);

}