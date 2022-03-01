# Create API of ML model using flask

'''
This code takes the JSON data while POST request an performs the prediction using loaded model and returns
the results in JSON format.
'''

# Import libraries
import os
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import os
import json
import logging
logging.warning('Watch out!')



app = Flask(__name__)
cors = CORS(app,resources={r'/api/cluster': {"origins": "*"}})

#cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Get hostname
cf_app_env = os.getenv('VCAP_APPLICATION')
if cf_app_env is not None:
    host = json.loads(cf_app_env)['application_uris'][0]
else:
    host = 'localhost'


# Load the model
print('Hello server.py v2')
# Load the model
model = pickle.load(open('pickle_cluster_model.pkl', 'rb'))

logging.warning('Watch out! again')
@app.route('/api/cluster', methods=['POST'])
@cross_origin(origin='any')
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)

    #a = json.loads(data)
    print(" unformatted data ->" , data)
    logging.warning(" data ->" , data)

    list_of_floatsa = []
    list_of_floatsa = np.asarray(json.loads(data['post']), dtype=np.float32)


    #for item in data['post']:
    #   list_of_floatsa.append(float(item))

    print("list_of_floats after conversion:", list_of_floatsa)
    score_0 = list_of_floatsa

     # Make prediction using model loaded from disk as per the data.
    prediction0 = model.predict([score_0])
    # do some converstions for serialization
    resultList = prediction0.tolist()
    result = resultList[0]
    print("prediction:", result)
    return jsonify({'cluster':result})

# run app
if __name__ == "__main__":
    if os.environ.get('VCAP_SERVICES') is None:  # running locally
        PORT = 8081
        DEBUG = True
    else:                                       # running on CF
        PORT = int(os.getenv("PORT"))
        DEBUG = False

app.run(host='0.0.0.0', port=PORT, debug=DEBUG)
