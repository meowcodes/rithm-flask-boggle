from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "whatever!"

boggle_game = Boggle()

@app.route("/")
def view_board():
    # make the board 
    # save it to session 
    # send the board to session
    # render_template(html, board=board)
    # another thing not here

    session["boggle_board"] = boggle_game.make_board()
    return render_template('board.html', boggle_board=session["boggle_board"])
