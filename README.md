###################        Requirement to run this app        ##################

Step 1.Install these libraries in ubuntu first using this command
---sudo apt-get install sqlite3 libsqlite3-dev

Step 2.Then install requirement.txt place in backend folder
---goto backend folder
---open terminal there
---then enter this command "pip install -r requirement.txt"

Step 3.Then install npm libraries
---goto frontend folder
---open terminal there
---then enter this command "npm install"


##################       First Run Django backend after complete above steps ####################

Step 1.Goto This folder backend->todo_list
---then open terminal and hit these commands
------"python manage.py makemigrations"
------"python manage.py migrate"
------"python manage.py collectstatic"
------"python manage.py runserver"


##################  Then Run front end Service build in angular after running backend service #################

Step 1.Goto this folder frontend->client
---then open terminal and hit these commands
------"ng serve"

################# How To  Use #######################

---open browser and go to this url "http://localhost:4200"
---Then signup for first use


########################### NOTE ##########################
I already embed angular app with django so you can directly access the To Do App after running backend services
---After running backend services go to this url for accessing app http://127.0.0.1:8000
