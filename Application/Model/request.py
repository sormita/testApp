import requests

# URL
url = 'http://localhost:8081/api/cluster'
#url = 'https://tonye1-model-api.us-south.cf.appdomain.cloud/api/cluster'

# Change the value of experience that you want to test
r = requests.post(url,json={'post':[19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0],})
print(r.json())

