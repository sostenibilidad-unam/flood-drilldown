from jinja2 import Environment, FileSystemLoader
import json
from pprint import pprint


from flask import Flask, make_response, request, send_from_directory
app = Flask(__name__)

env = Environment(loader=FileSystemLoader('templates'))

def load_agebs():
    agebs = {}
        
    with open('static/bayesianPreEnch.json') as geo:
        g = json.loads(geo.read())
        for f in g['features']:
            k = (f['properties']['FrecCateg'], f['properties']['PrecCateg'])
            if k in agebs:
                agebs[k].append(f['properties']['AGEB_ID'])
            else:
                agebs[k] = [f['properties']['AGEB_ID'], ]

    return agebs



agebs = load_agebs()


@app.route('/table/')
def table():
    template = env.get_template('table.html')
    return template.render()


@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


if __name__ == "__main__":
    app.run(host='0.0.0.0')


