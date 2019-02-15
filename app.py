from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "whatever!"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route("/")
def view_board():
    """ Shows board """
    # make the board 
    # save it to session 
    # send the board to session
    # render_template(html, board=board)
    # another thing not here
    
    session["boggle_board"] = boggle_game.make_board()
    
    if not session.get("high_score"):
        session["high_score"] = 0
    
    if not session.get("game_count"):
        session["game_count"] = 0

    return render_template('board.html',
        boggle_board=session["boggle_board"],
        high_score=session["high_score"],
        game_count=session["game_count"])

@app.route("/check-guess", methods=["POST"])
def check_guess():
    """ Check guess and return result """

    # get the guess
    guess = request.form.get('guess')

    # get the board from session
    boggle_board = session["boggle_board"]

    result = boggle_game.check_valid_word(boggle_board, guess)
    
    # check if word valid in board
    return jsonify({"result":result})


@app.route("/stats", methods=["POST"])
def make_stats():
    """ Make and update stats """

    # get the score
    final_score = int(request.form.get("final_score"))

    # see if highest
    if final_score > int(session["high_score"]):
        session["high_score"] = final_score

    # add 1 to game count
    game_count = int(session["game_count"])
    game_count += 1
    session["game_count"] = game_count

    # send highest score  
    # send game count
    return jsonify({
        "high_score": session["high_score"],
        "game_count": session["game_count"]})