class Game {
    constructor(){
        this.currScore = 0;
        this.guessList = new Set();
        this.gameState = true;
    }

    async checkGuess(){
        // check if game still in progress
        if(!this.gameState){
            return {"result":"game over"}
        }

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
            this.currScore += $("#guess").val().length
            $("#score").text(this.currScore)
        }

        // display result message in page
        $("#result-div").text(resultRes.result)
    }

    async endGame(){
        // update game state
        this.gameState = false;

        // get the final score
        let finalScore = this.currScore;

        // send server final score
        let response = await $.post("/stats", {"final_score":finalScore});

        // update high score and game count in DOM
        $("#high-score").text(response.high_score);
        $("#game-count").text(response.game_count);
    }
}

const currentGame = new Game();

$("#guess-form").on("submit", async function(evt) {
    evt.preventDefault();

    currentGame.displayResult(await currentGame.checkGuess());
})

setTimeout(async function(){
    currentGame.endGame()
}, 60000)


