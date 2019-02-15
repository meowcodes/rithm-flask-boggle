let $guessForm = $("#guess-form");

setTimeout(function(){
    $guessForm.off()
    $guessForm.on("submit", async function(evt) {
        evt.preventDefault();
        console.log("Out of time!")
    })
    console.log("Out of time!")
}, 60000)

$guessForm.on("submit", async function(evt) {
    evt.preventDefault();

    // getting guess
    let $guess = $("#guess").val()

    // sending guess, getting back result
    let response = await $.post("/check-guess", {"guess" : $guess})

    if (response.result === "ok"){
        let curr_score = Number($('#score').text())
        curr_score += $guess.length
        $("#score").text(curr_score)
    }
    // displaying result in page
    $("#result-div").text(response.result)
})

