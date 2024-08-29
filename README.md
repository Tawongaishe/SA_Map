## Running virtual environment 
python3 -m venv venv
source venv/bin/activate venv
## install dependencies into venv
pip install -r requirements.txt

## Viewing the postgres database
psql sa_startup_map
\dt
SELECT * FROM startup;
# for the geospatial data
SELECT id, name, ST_AsText(location) FROM startup;

## add a new requirements 
pip freeze -r > requirements.txt

## running backend 
cd into backend 
python run.py