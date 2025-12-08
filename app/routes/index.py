# =========================
# Dependencies
# =========================

from flask import Blueprint, jsonify, request
from huggingface_hub import InferenceClient
from loguru import logger
import base64
import os
import requests

# =========================
# Configuration
# =========================

logger.add('logs/app.log', rotation='2 MB')

# -------------------------

index_bp = Blueprint('index', __name__, url_prefix='/api')

# -------------------------

MODEL = 'openai/gpt-oss-20b'
LLM = InferenceClient(
    provider='groq',
    api_key=os.environ['HF_TOKEN__2UML'],
)
PROMPT = """
You are an expert assistant in generating PlantUML diagrams based on user requirements. Follow these rules:

1. Understand the user input and convert it into a valid PlantUML diagram code.
2. Supported diagram types: activity, class, state, sequence, use-case.
    - If the user does not specify a diagram type, choose the type that best fits the input, defaulting to sequence if unsure.
3. Supported UML elements: actor, boundary, collections, control, database, entity, participant, queue.
4. The output must always start with @startuml and end with @enduml, enclosing the PlantUML code.
5. If the user input is unclear or does not provide enough information for a diagram, generate a minimal sequence diagram with placeholder elements indicating missing details, instead of leaving it empty.
6. Do not include 'skinparam' settings.
7. Only output the PlantUML code—avoid explanations, extra text, or markdown formatting.
"""

# =========================
# Methods
# =========================

@index_bp.route('/llm/generate-code', methods=['POST'])
def generate_code():

    # Requesting completion
    user_msg = request.json.get('prompt')
    completion = LLM.chat.completions.create(
        model=MODEL,
        messages=[
            { 'role': 'system', 'content': PROMPT },
            { 'role': 'user', 'content': user_msg }
        ]
    )
    bot_msg = completion.choices[0].message.content

    # -------------------------

    logger.debug(f"Reasoning: {completion.choices[0].message.reasoning!r}")
    logger.debug(f"Content: {bot_msg!r}")

    # -------------------------

    lines = bot_msg.splitlines()
    if len(lines) > 2:
        bot_msg_tmp = [lines[0]] + [f"\t{line}" for line in lines[1:-1]] + [lines[-1]]
    else:
        bot_msg_tmp = lines

    bot_msg = '\n'.join(bot_msg_tmp)

    # -------------------------

    return jsonify({'bot_msg': bot_msg}), 200

@index_bp.route('/display/generate-diagram', methods=['POST'])
def generate_diagram():

    # Preparing request
    data = request.get_json()
    code_uml = data['code_uml'].strip()
    if not code_uml:
        code_uml = '@startuml\n@enduml'

    # -------------------------

    try:

        # Sending request
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

    return jsonify({'image_base64': encoded_png}), 200
