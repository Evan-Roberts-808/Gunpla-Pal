from flask_migrate import Migrate
from flask import Flask, request, session, make_response, jsonify, redirect
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import app, db, api, Resource
from models import Gunpla, User, Collection, Wishlist, Theme, Comment
import ipdb


migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class GunplasByGrade(Resource):
    def get(self, grade):
        try:
            gunplas = [g.to_dict()
                       for g in Gunpla.query.filter(Gunpla.grade == grade).all()]
            return gunplas, 200
        except:
            return {'error:' 'grade not found'}, 404


api.add_resource(GunplasByGrade, '/gunplas/<string:grade>')


class UserProfile(Resource):
    @login_required
    def get(self, username):
        try:
            user = User.query.filter(
                User.username == username).first().to_dict()
            return user, 200
        except:
            return {'error': 'user not found'}, 404


api.add_resource(UserProfile, '/users/<string:username>')


class UserBio(Resource):
    @login_required
    def patch(self, username):
        data = request.get_json()
        try:
            user = User.query.filter(User.username == username).first()
            for attr in data:
                setattr(user, attr, data.get(attr))
            db.session.add(user)
            db.session.commit()
            return {user.to_dict(), 200}
        except:
            return {'error': 'could not update bio'}


api.add_resource(UserBio, '/users/<string:username>/bio')


class UserSkillLevel(Resource):
    @login_required
    def patch(self, username):
        data = request.get_json()
        try:
            user = User.query.filter(User.username == username).first()
            for attr in data:
                setattr(user, attr, data.get(attr))
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 200
        except:
            return {'error': 'could not select skill level'}


api.add_resource(UserSkillLevel, '/users/<string:username>/skill_level')


class CollectionsByUser(Resource):
    @login_required
    def get(self, username):
        try:
            user = User.query.filter(User.username == username).first()
            if user:
                collections = []
                for collection in user.collections:
                    collection_data = collection.to_dict()
                    gunpla = collection.gunpla.to_dict()
                    collection_data['gunpla'] = gunpla
                    collections.append(collection_data)
                return collections, 200
            return {'error': 'user not found'}, 404
        except:
            return {'error': 'user not found'}, 404


api.add_resource(CollectionsByUser, '/<string:username>/collections')


@app.route("/collections/add", methods=["POST"])
@login_required
def add_to_collection():
    data = request.get_json()
    gunpla_id = data.get("gunpla_id")

    user = current_user

    collection = Collection(user_id=user.id, gunpla_id=gunpla_id)
    db.session.add(collection)
    db.session.commit()
    return {"message": "added to collection"}, 201


@app.route("/collections/remove", methods=["DELETE"])
@login_required
def remove_from_collection():
    data = request.get_json()
    gunpla_id = data.get("gunpla_id")

    user = current_user

    collection = Collection.query.filter_by(
        user_id=user.id, gunpla_id=gunpla_id).first()
    if collection:
        db.session.delete(collection)
        db.session.commit()
        return {"message": "removed collection"}, 201
    else:
        return {"error": "not found"}, 404


class WishlistsByUser(Resource):
    @login_required
    def get(self, username):
        try:
            user = User.query.filter(User.username == username).first()
            if user:
                wishlists = []
                for wishlist in user.wishlists:
                    wishlist_data = wishlist.to_dict()
                    gunpla = wishlist.gunpla.to_dict()
                    wishlist_data['gunpla'] = gunpla
                    wishlists.append(wishlist_data)
                return wishlists, 200
            return {'error': 'user not found'}, 404
        except:
            return {'error': 'user not found'}, 404


api.add_resource(WishlistsByUser, '/<string:username>/wishlists')


@app.route("/wishlist/add", methods=["POST"])
@login_required
def add_to_wishlist():
    data = request.get_json()
    gunpla_id = data.get("gunpla_id")

    user = current_user

    wishlist = Wishlist(user_id=user.id, gunpla_id=gunpla_id)
    db.session.add(wishlist)
    db.session.commit()
    return {"message": "added to wishlist"}, 201


@app.route("/wishlist/remove", methods=["DELETE"])
@login_required
def remove_from_wishlist():
    data = request.get_json()
    gunpla_id = data.get("gunpla_id")

    user = current_user

    wishlist = Wishlist.query.filter_by(
        user_id=user.id, gunpla_id=gunpla_id).first()
    if wishlist:
        db.session.delete(wishlist)
        db.session.commit()
        return {"message": "removed wishlist"}, 201
    else:
        return {"error": "skill issue"}, 404
    
@app.route('/comments/add', methods=["POST"])
@login_required
def add_comment():
    data = request.get_json()
    gunpla_id = data.get("gunpla_id")
    comment_text = data.get('values', {}).get('comment')

    user = current_user
    comment = Comment(user_id=user.id, gunpla_id=gunpla_id, text=comment_text)
    db.session.add(comment)
    db.session.commit()
    return {"message": "added comment"}

class Comments(Resource):
    def get(self, gunpla_id):
        try:
            comments_dict = [c.to_dict() for c in Comment.query.filter(Comment.gunpla_id == gunpla_id).all()]
            return {"comments": comments_dict}
        except:
            return {"failed to get comment"}, 500


api.add_resource(Comments, '/comments/<int:gunpla_id>')


class Signup(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username=data['username'],
            name=data['name'],
            email=data['email'],
            profile_pic=data['profile_pic']
        )
        new_user.password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()

        # session['user_id'] = new_user.id
        login_user(new_user, remember=True)

        return new_user.to_dict(), 201


api.add_resource(Signup, '/signup')


class CheckSession(Resource):
    def get(self):
        if current_user.is_authenticated:
            user = current_user.to_dict()
            return user, 200
        return {"error": "unauthorized"}, 401


api.add_resource(CheckSession, '/check_session')


class Login(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                login_user(user, remember=True)
                return {'message': 'Login successful'}, 200
        return {'error': '401 Unauthorized'}, 401


api.add_resource(Login, '/login')


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return f'You have logged out. Goodbye'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
