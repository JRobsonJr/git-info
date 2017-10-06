from flask import Flask, jsonify, abort, make_response, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

projetos = [ {
    "nome": "P1",
    "url": "https://github.com/JRobsonJr/p1",
    "commits": 30,
    "projeto_id": 0
}]

id_atual = 1

@app.route('/projetos', methods=['GET'])
def get_projetos():
    return jsonify(projetos)

@app.route('/projetos/<int:projeto_id>', methods=['GET'])
def get_projeto(projeto_id):
    projeto = [projeto for projeto in projetos if projeto['projeto_id'] == projeto_id]
    if len(projeto) == 0:
        abort(404)
    return jsonify(projeto[0])

@app.route('/projetos', methods=['POST'])
def criar_projeto():
    global id_atual
    if not request.json:
        abort(400)
    projeto = request.get_json()
    projeto["projeto_id"] = id_atual
    id_atual += 1
    projetos.append(projeto)
    return jsonify(projeto), 201

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)