from flask import Flask
import secrets

from .routes.index import index_bp

# -------------------------

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)
app.register_blueprint(index_bp)

# -------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860)
