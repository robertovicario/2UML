# =========================
# Dependencies
# =========================

from flask import Blueprint, jsonify, render_template, request
import requests
import base64

# =========================
# Flask
# =========================

index_bp = Blueprint('index', __name__)

# =========================
# Templates
# =========================

@index_bp.route('/')
def page():
    return render_template('pages/home.html')

# =========================
# APIs
# =========================

@index_bp.route('/api/display/generate-diagram', methods=['POST'])
def generate_diagram():

    # Preparing UML code
    data = request.get_json()
    code_uml = data['code_uml'].strip()
    if not code_uml:
        code_uml = '@startuml\n@enduml'

    try:

        # Sending request to Kroki API
        response = requests.post(
            'https://kroki.io/plantuml/png',
            data=code_uml.encode('utf-8'),
            headers={'Content-Type': 'text/plain'},
            timeout=10
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 502
    encoded_png = base64.b64encode(response.content).decode('utf-8')

    # -------------------------

    return jsonify({'image_base64': encoded_png})
