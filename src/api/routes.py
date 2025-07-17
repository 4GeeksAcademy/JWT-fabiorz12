"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)




@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Faltan campos requeridos"}), 400

    user_existente = User.query.filter_by(email=data["email"]).first()
    if user_existente:
        return jsonify({"msg": "El usuario ya existe"}), 400

    nuevo_usuario = User(
        email=data["email"],
        password=generate_password_hash(data["password"])
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Faltan credenciales"}), 400

    usuario = User.query.filter_by(email=data["email"]).first()

    if not usuario or not check_password_hash(usuario.password, data["password"]):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=usuario.id)
    return jsonify({"access_token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    return jsonify({"msg": f"Bienvenido, usuario con ID {current_user_id}"}), 200