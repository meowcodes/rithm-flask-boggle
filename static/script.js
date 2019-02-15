let $guessForm = $("#guess-form");

$guessForm.on("submit", async function(evt) {
    console.log("here")
    evt.preventDefault();

    // getting guess
    let $guess = $("#guess").val()

    // sending guess, getting back result
    let response = await $.post("/check-guess", {"guess" : $guess})

    // displaying result in page
    $("#result-div").text(response)
})