from flask import Flask, request, send_file, jsonify
import os
import subprocess
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = '/tmp/uploads'
CONVERTED_FOLDER = '/tmp/converted'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CONVERTED_FOLDER, exist_ok=True)

# Formats supportés par LibreOffice
ALLOWED_EXTENSIONS = {'doc', 'docx', 'odt', 'rtf', 'txt', 'pdf'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/convert', methods=['POST'])
def convert_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Aucun fichier envoyé.'}), 400
    file = request.files['file']
    output_format = request.form.get('format')
    if not file or file.filename == '':
        return jsonify({'error': 'Aucun fichier sélectionné.'}), 400
    if not allowed_file(file.filename):
        return jsonify({'error': 'Format de fichier non supporté.'}), 400
    if output_format not in ALLOWED_EXTENSIONS:
        return jsonify({'error': 'Format de sortie non supporté.'}), 400

    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(input_path)

    # Conversion avec LibreOffice
    try:
        subprocess.run([
            'libreoffice', '--headless', '--convert-to', output_format, '--outdir', CONVERTED_FOLDER, input_path
        ], check=True)
    except subprocess.CalledProcessError:
        return jsonify({'error': 'Erreur lors de la conversion.'}), 500

    base, _ = os.path.splitext(filename)
    converted_file = os.path.join(CONVERTED_FOLDER, f"{base}.{output_format}")
    if not os.path.exists(converted_file):
        return jsonify({'error': 'Fichier converti introuvable.'}), 500

    return send_file(converted_file, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
