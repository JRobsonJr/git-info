from flask import Flask, jsonify, abort, make_response, request
from flask_cors import CORS
from git import Repo

app = Flask(__name__)

CORS(app)

projects = [ {
    "name": "ProjetoP2",
    "url": "https://github.com/marianabianca/projetop2",
    "path": "C:/Users/jrobs/Documents/CO/ProjetoP2 - Grupo de Rosbon/.git",
    "project_id": 0
}]

current_id = 1

def get_commit_number(path):
    repo = Repo(path)
    head = repo.heads[0]
    commit = head.commit
    commit_number = commit.count()
    return commit_number

print(get_commit_number("C:/Users/jrobs/Documents/CO/ProjetoP2 - Grupo de Rosbon/.git"))
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
def add_project():
    global current_id
    if not request.json:
        abort(400)
    project = request.get_json()
    project["project_id"] = current_id
    current_id += 1
    projects.append(project)
    return jsonify(project), 201

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)