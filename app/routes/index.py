from flask import Blueprint, render_template

# -------------------------

index_bp = Blueprint('index', __name__)

# -------------------------

@index_bp.route('/')
def page():
    return render_template('pages/home.html')
