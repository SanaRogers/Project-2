# from flask_pymongo import PyMongo
# from flask import Flask, render_template, redirect

# app = Flask(__name__)
# mongo = PyMongo(app,uri='mongodb://localhost:27017/project2_db')

# @app.route('/')
# def home():
#     data = mongo.db.restaurantes.find_one()
#     return render_template('index.html', restaurantes=data)

# if __name__=='__main__':
#     app.run(debug=True)

import pandas as pd
from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect, jsonify, Response
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config["MONGO_URI"] = 'mongodb://localhost:27017/project2_db'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

mongo = PyMongo(app)
#db = mongo.project2_db
print(mongo)
restaurantes = mongo.db.retaurantes

@app.route('/', methods=["POST", "GET"])
def home():
    return ("sample")
    #return render_template('index.html')

@app.route('/api/v1.0/restaurantes', methods=["POST", "GET"])
@cross_origin(origin='*')
def get_data():
    data = restaurantes.find()
    # data = restaurantes.find({'City': 'Orlando '})
    #print(data)
    #df = pd.DataFrame(data).to_dict(orient='record')
    #print(df)

    data_list = []
    for document in data:
        document['_id'] = str(document['_id'])
        data_list.append(document)
    return jsonify(data_list)
    #return Response(json.dumps(data_list), mimetype='application/json')

if __name__=='__main__':
    app.run(debug=True)