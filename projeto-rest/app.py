from flask import Flask, jsonify, abort, make_response, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

projects = [ {
    "name": "P1",
    "url": "https://github.com/JRobsonJr/p1",
    "commits": 30,
    "project_id": 0
}]

id_atual = 1

@app.route('/project', methods=['GET'])
def get_projects():
    return jsonify(projects)

@app.route('/project/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = [project for project in projects if project['project_id'] == project_id]
    if len(project) == 0:
        abort(404)
    return jsonify(project[0])

@app.route('/project', methods=['POST'])
def criar_project():
    global id_atual
    if not request.json:
        abort(400)
    project = request.get_json()
    project["project_id"] = id_atual
    id_atual += 1
    projects.append(project)
    return jsonify(project), 201

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)