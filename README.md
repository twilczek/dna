# dna task

###1. Requirements 
The project requires `mongod` to spawn a local instance of mongo db:
```
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#installing-mongodb-4.4-edition-edition
```

###2. Running the project
```
npm install;
npm run start-local-mongo;
npm run dev
```

###3. Test

```
npm run test
```

###4. API

#### Create user

```
POST http://localhost:3000/users/create
with body: 
{
    "name": "TW", 
    "password": "pass", 
    "login": "login"
}
```

#### Find user

```
GET http://localhost:3000/users/{userId}
```

#### Update user

```
PATCH http://localhost:3000/users/{userId}
with body: `{ name: "new" }`
```

#### Remove user

```Remove user DELETE http://localhost:3000/users/{userId}```

#### Save offer

```
POST http://localhost:3000/offers/save
with body  {
    "category": "IT",
    "startDate": "2010-10-10",
    "endDate": "2010-10-11",
    "username": "Blah"
 }
```
