from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "whatever!"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route("/")
def view_board():
    # make the board 
    # save it to session 
    # send the board to session
    # render_template(html, board=board)
    # another thing not here

    if not session["boggle_board"]:
        session["boggle_board"] = boggle_game.make_board()

    return render_template('board.html', boggle_board=session["boggle_board"])

@app.route("/check-guess", methods=["POST"])
def check_guess():

    # get the guess
    guess = request.form.get('guess')

    # get the board from session
    boggle_board = session["boggle_board"]

    result = boggle_game.check_valid_word(boggle_board, guess)

    # check if word valid in board
    return result