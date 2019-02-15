let $guessForm = $("#guess-form")
let $highScore = $("#high-score")
let $gameCount = $("#game-count")

class Game {
    constructor(){
        this.currScore = 0;
        this.guessList = new Set();
    }

    async checkGuess(){
        // getting guess
        let $guess = $("#guess").val()

        // checking if already counted
        if(this.guessList.has($guess)){
            return {"result":"repeated word"}
        }

        // adding to list of guessed words
        this.guessList.add($guess)

        // sending guess, getting back result
        let response = await $.post("/check-guess", {"guess" : $guess})

        return response;
    }

    displayResult(resultRes){
        // update score if result is "ok"
        if (resultRes.result === "ok"){
            this.currScore += $guess.length
            $("#score").text(this.currScore)
        }

        // display result message in page
        $("#result-div").text(resultRes.result)
    }

    async endGame(){
        // turn off listener
        $guessForm.off()

        // tell them they're out of time
        console.log("Out of time!")

        // turn on new listener to prevent refreshing
        $guessForm.on("submit", async function(evt) {
            evt.preventDefault();
        })

        // get the final score
        let finalScore = this.currScore;

        // send server final score
        let response = await $.post("/stats", {"final_score":finalScore});

        // update high score and game count in DOM
        $highScore.text(response.high_score);
        $gameCount.text(response.game_count);
    }
}

currentGame = new Game();

$guessForm.on("submit", async function(evt) {
    evt.preventDefault();

    currentGame.displayResult(await currentGame.checkGuess());
})


setTimeout(async function(){
    currentGame.endGame()
}, 60000)


