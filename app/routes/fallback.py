# =========================
# Dependencies
# =========================

from flask import Blueprint, render_template

# =========================
# Flask
# =========================

fallback_bp = Blueprint('fallback', __name__, url_prefix='/fallback')

# =========================
# Templates
# =========================

def error_page(error):
    err_code = getattr(error, 'code', 500)
    err_name = getattr(error, 'name', type(error).__name__)
    err_desc = getattr(error, 'description', str(error))    

    # -------------------------

    return render_template('pages/error.html',
                           err_code=err_code,
                           err_name=err_name,
                           err_desc=err_desc), err_code

@fallback_bp.app_errorhandler(Exception)
def handle_exception(error):
    return error_page(error)

# @fallback_bp.route('/maintenance')
# def maintainance_page():
#     return render_template('pages/maintenance.html')
