#Import libraries
import os
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import sys
import json

# Load the model
model = pickle.load(open('pickle_cluster_model.pkl','rb'))

#a = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
#print( 'Number of arguments:', len(sys.argv), 'arguments.')
#print('Argument List:', str(sys.argv))
#print('First param:'+sys.argv[1]+'#')


inPut = sys.argv[1]
a = json.loads(inPut)
list_of_floatsa = []
for item in a:
    list_of_floatsa.append(float(item))

score_0 = list_of_floatsa


# Make prediction using model loaded from disk as per the data.
#prediction = model.predict(np.array(data['post']).tolist())
#prediction = model.predict({   "input_data":[      {         "fields":[score_0]}]})
prediction0 = model.predict([score_0])
print(prediction0)

#print("Prediction 1 ->",prediction1)
def main():
    # calculate stuff
    #print("ABOUT to return:" , prediction0)
    return (prediction0)
main()