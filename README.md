McLaren Applied Technology Exercise
====================

## Install dependencies

- Install `node` and `npm`.
- Install JS dependencies from npm: `npm install`

## Build

*V1.0*

## BackEnd Structure

- Source code for the backend is located in the `server` folder
- Routes are declared in the `index.js` file inside the root folder
- Folders are arranged by their functionality - helpers and routes are therefore in the same folder
- MongoDB Database Implementation is used to store the patient data
- `.env` file included

```
---- How to start 'er up in dev mode on Localhost ------

1: npm i --save
2: cd to root directory of project
3: run 'npm run dev' - this will compress the code into bundle.js in the dist folder and keep the console logs
4: server located on localhost:9000

```

```
---- How to start 'er up in production mode on Localhost ------

1: run 'npm build' - this will compress the code into bundle.js in the dist folder but get rid of the console logs
2: run 'npm start' - this will start the server
3: server located on localhost:9000

```

```
---- How to run the tests (Mocha) ------

1: run 'npm test' - this will start the scripts to run the test
2: first test will see if adding patient to the database works correctly
3: second test will see if adding new definitions works correctly

```

## POSTMAN Endpoints

- Link will be sent to have access to the POSTMAN collection
- Collection will include end points to the basic backend functionality
- `/api/v1/allPatients` - GET request to get list of patients
- `/api/v1/allDefinitions` - GET request to get list of definitions
- `/api/v1/addPatients` - POST request to add more patients (JSON included in the body)
- `/api/v1/addDefinition` - POST request to add more defitions for activities (JSON included in the body)
- `/api/v1/addSummaries` - POST request to add activity summary for patients (JSON included in the body)