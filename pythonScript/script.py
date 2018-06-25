import requests

username = 'crsherbet'

response = requests.post('http://localhost:5000/api/git/info', data ={'username': username}).json()

print(response)