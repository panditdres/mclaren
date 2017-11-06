McLaren Applied Technology Exercise
====================

## Install dependencies

- Install `node` and `npm`.
- Install JS dependencies from npm: `npm install`

## Build

*V1.0*

## Link

*https://mclaren-applied-tech.herokuapp.com/*

## Overall Structure

- `gulpfile.js` includes all the code to gulp and minify all .js and .scss files
- All configurations are stored in `config` folder - using `.env` file to store all config variables

## FrontEnd Structure

- Source code for the frontend is located in the `public` folder
- FrontEnd build in `AngularJS` with `HTML/SaSS`
- Folders are arranged by page - will include HTML and .js file
- All folders that has HTML or .js files are in the `app` folder
- `_services` folder include `DataService.service` which is in charge of fetching data from the Database
- `templates` folder includes all the HTML for the modal in this instance
- `home` folder includes all the functionality of the home page which is the overall template/parent of the whole application
- `grid` folder includes the child of home (i.e home.grid) - includes all the functionality of the actual table. The modal controller is also included in the folder since this modal in particular is shown on the grid page.
- All stylistic/.scss files are in the `style` folder
- Any assets/icons/images ar ein the `assets` folder
- `dist` folder includes the minified code for both .js and .css

## BackEnd Structure

- Source code for the backend is located in the `server` folder
- Backend implemented in `Node.js`
- Routes are declared in the `index.js` file inside the root folder
- Folders are arranged by their functionality - helpers and routes are therefore in the same folder
- MongoDB Database Implementation is used to store the patient data
- Models are stored in the `models` server inside the `server` folder
- `.env` file included

```
---- How to start 'er up in dev mode on Localhost ------

1: npm i --save
2: cd to root directory of project
3: run 'npm run dev' - this will compress the code into bundle.js in the dist folder and keep the console logs
4: server located on localhost:9000

---- How to start 'er up in production mode on Localhost ------

1: run 'npm run build' - this will compress the code into bundle.js in the dist folder but get rid of the console logs
2: run 'npm start' - this will start the server
3: server located on localhost:9000

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

## Database Access

- Credentials for the database access will be provided 