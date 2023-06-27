from flask_migrate import Migrate
from flask import Flask

from config import app, db, api, Resource
from models import Gunpla, User, Collection, Wishlist, Theme

migrate = Migrate(app, db)

class GunplasByGrade(Resource):
    def get(self, grade):
        gunplas = [gunpla.to_dict() for gunpla in Gunpla.query.filter_by(grade=grade).all()]
        return gunplas, 200

api.add_resource(GunplasByGrade, '/gunplas/<string:grade>')
if __name__ == '__main__':
    app.run(port=5555, debug=True)
