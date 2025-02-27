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
cd into top level 
python -m backend.run



---


**MENTORS**
- Must be signed in to see any mentors 

DONE
python -m backend.run
- find a list of all the mentors
- click into one mentor based on mentor id
- add yourself as a mentor 

TO-DO
- remove yourself as a mentor
- filter mentors based on expertise, location 

NEXT STEPS
- edit your mentor profile 
- add a picture to your mentor profile 

**STARTUPS**
- All members can see a list of all the startups 
DONE
- find a list of all the startups 
- get a specific startup by its ID
- add a new startup information
TO-DO
- delete a startup addition 
- filter startups based on industry and locationb 
- edit startup addition 
NEXT STEPS
- think about how we will review a startup if we need to 

**CO-FOUNDERS**
This one is goung to require more detailed information to implement properly because 
you  need to be able tp access tje necessary information about the persoon you are looking for
okay it can be like an ad you are runningj= so lets do a little user painpoint analysis 

as someone with a new idea about a startup i need to choose a acofounder 
- what are the difficulties wiith findind s cofounder well 
- someone passionate 
- **someone with the right expertise**
- **someone you can workwith **
- someone accessible 

Honestly I feel like a Slack channel would be the best thibg where you can 
1. introduce yourself in the chat with what you do and post something about it 
2. You can get feedback on the initial idea you have from other people
3. You can get craft help on funding pitches
4. You can post about funds and opportunities you find  
5. You can find cofounders by doing the introduction thing 
6. you can chat in industry specific channels
7. You are required to fill out a bunch of information correctly before you can post

8. It quickly identifies abuse and flags the reviewers and people are removed 
9. it send notifications or explanations of how certain channels work 
10. it keeps people engaged with weekly challenges or something they can use 
11. Should it be exclusive? Not right nowm not yet it should one of the nly all-inclusive spaces for founders and techies in South Africa 


- Startup List 
- Mentor List 
- Funds List 
- Startup Community (find cofounders, friends, competitors and support )


# Upgrading db
- change the models file sand then cd in backend and ` flask db migrates -m "add in migration message" `
- Then ` flask db upgrade ` to apply the changes