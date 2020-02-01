function displayResults(scrapedData) {

    $("#new").empty();
    // Then, for each entry of that json...
    scrapedData.forEach(function (data) {
        // Append each of the animal's properties to the table
        var newDiv = $("#new").append($("#imgLink").text(data.title),
            $("#title").text(data.imgLink)
        );
        $("#new").append(newDiv);
    });
}

//   function setActive(selector) {
//     // remove and apply 'active' class to distinguish which column we sorted by
//     $("th").removeClass("active");
//     $(selector).addClass("active");
//   }


// 1: On Load
// ==========
// First thing: ask the back end for json with all animals
// $.getJSON("/all", function (data) {
//     // Call our function to generate a table body
//     displayResults(data);
// });

// 2: Button Interactions
// ======================
// When user clicks the weight sort button, display modal

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
// var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
$("#note").on("click", function () {
    modal.style.display = "block";
});
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// When user clicks the name sort button, display the table sorted by name
$("#deleteSaved").on("click", function () {
    // Set new column as currently-sorted (active)
    setActive("#animal-name");
    // Do an api call to the back end for json with all books sorted by name
    $.getJSON("/name", function (data) {
        // Call our function to generate a table body
        displayResults(data);
    });
});