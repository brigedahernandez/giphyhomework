alert("hello!")
//array for initial buttons
var characterArray = ["goku", "vegeta", "piccolo", "frieza", "bulma", "masterroshi"];

//for loop that cycles through the array
for (var i = 0; i < characterArray.length; i++) {
    var newButtons = "<button character-name=" + characterArray[i] + ">" + characterArray[i] + "</button>";
    $("#characterButtons").append(newButtons);
}

// Adding click event listen listener to all buttons
$("button").on("click", function () {
            // Grabbing and storing the data-animal property value from the button
            var character = $(this).attr("data-character");

            // Constructing a queryURL using the animal name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                characterArray + "&api_key=vPa2dCrwtoOET9Ri0TzObcDsaLOI3X86&limit=10";
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
                            var characterImage = $("<img class='generatedGif'" + "data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");


                            // Setting the src attribute of the image to a property pulled off the result item
                            characterImage.attr("src", results[i].images.fixed_height.url);

                            // Appending the paragraph and image tag to the characterDiv
                            characterDiv.append(p);
                            characterDiv.append(characterImage);

                            // Prependng the character Div to the HTML page in the "#gifs-appear-here" div
                            $("#gifs-appear-here").prepend(characterDiv);

                            // If a  gif is clicked then its state changes from a still gif to an animated gif
                            $(".generatedGif").on("click", function () {
                                        console.log("gif clicked");
                                        console.log(this);
                                        var state = $(this).attr("data-state");
                                        console.log(state);
                                        var animateURL = $(this).attr("data-animate");
                                        var stillURL = $(this).attr("data-still");
                                        if (state === "still") {
                                            console.log("Still confirmed");
                                            $(this).attr("src", animateURL);
                                            $(this).attr("data-state", "animate")
                                        } else {
                                            console.log("else triggered");
                                            $(this).attr("src", stillURL);
                                            $(this).attr("data-state", "still");
                                        }

                                     });
                                    
                                    

                                    }
                                });
                            
                            }) 