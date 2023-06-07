"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG'] = True

connect_db(app)

@app.route('/')
def show_homepage():
    """Show the homepage"""
    return render_template('index.html')





"""API ROUTES"""
@app.route('/api/cupcakes')
def list_cupcakes():
    """Return JSON of all cupcakes"""
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """Return JSON of a single cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Create a cupcake and return JSON of that created cupcake"""
    flavor = request.json.get('flavor')
    size = request.json.get('size')
    rating = request.json.get('rating')
    image = request.json.get('image')

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize()), 201

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    """Update a cupcake and return JSON of that updated cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    cupcake.flavor = request.json.get('flavor')
    cupcake.size = request.json.get('size')
    cupcake.rating = request.json.get('rating')
    cupcake.image = request.json.get('image')

    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())    

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """Delete a cupcake with the specified cupcake_id"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")