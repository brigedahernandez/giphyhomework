alert ("hello!")
//array for initial buttons
var characterArray = ["goku", "vegeta", "piccolo", "frieza", "bulma", "masterroshi"];

//for loop that cycles through the array
for (var i = 0; i < characterlArray.length; i++) {
    var newButtons = "<button character-name=" + characterArray[i] + ">" + characterArray[i] + "</button>";
    $("characterButtons").append(newButtons);
  }

// Adding click event listen listener to all buttons
$("button").on("click", function () {
    // Grabbing and storing the data-animal property value from the button
    var character = $(this).attr("data-character");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=vPa2dCrwtoOET9Ri0TzObcDsaLOI3X86&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var characterDiv = $("<div>");
                console.log(results[i]);
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var characterImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                characterImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the characterDiv
                characterDiv.append(p);
                characterDiv.append(characterImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(characterDiv);
            }
        })
});