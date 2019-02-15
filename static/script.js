let $guessForm = $("#guess-form");
let $highScore = $("#high-score")
let $gameCount = $("#game-count")




setTimeout(async function(){
    $guessForm.off()
    $guessForm.on("submit", async function(evt) {
        evt.preventDefault();
        console.log("Out of time!")
    })
    console.log("Out of time!")

    // get the score
    finalScore = Number($('#score').text());

    // send server score and make it count a game
    let response = await $.post("/stats", {"final_score":finalScore});

    // update high score and game count
    $highScore.text(response.high_score);
    $gameCount.text(response.game_count);

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

