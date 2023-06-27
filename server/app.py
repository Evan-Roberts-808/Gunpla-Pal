from flask_migrate import Migrate
from flask import Flask, request, session

from config import app, db, api, Resource
# from config import Config, app, db, api, Resource
from models import Gunpla, User, Collection, Wishlist, Theme


migrate = Migrate(app, db)


class GunplasByGrade(Resource):
    def get(self, grade):
        try:
            gunplas = [g.to_dict() for g in Gunpla.query.filter(Gunpla.grade==grade).all()]
            return gunplas, 200
        except:
            return {'error:' 'grade not found'}, 404

api.add_resource(GunplasByGrade, '/gunplas/<string:grade>')

class UserProfile(Resource):
    def get(self, username):
        try:
            user = User.query.filter(User.username == username).first().to_dict()
            return user, 200
        except:
            return {'error': 'user not found'}, 404

api.add_resource(UserProfile, '/users/<string:username>')

class CollectionsByUser(Resource):
    def get(self, username):
        try:
            collections = [c.to_dict() for c in Collection.query.filter(Collection.user.username == username).all()]
            return collections, 200
        except:
            return {'error': 'user not found'}, 404

api.add_resource(CollectionsByUser, '/<string:username>/collections')
#'/<string:username>/collections
#user profile route '/<string:username>

class Signup(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username = data['username'],
            name = data['name'],
            email = data['email'],
            profile_pic = data['profile_pic']
        )
        new_user.password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        return new_user.to_dict(), 201
    
api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)