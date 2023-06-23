import json
from sqlalchemy.exc import IntegrityError
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os

# from models import (whatever we name models) 

from config import app, db, api

if __name__ == '__main__':
    app.run(port=5555, debug=True)