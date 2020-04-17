# Installation steps
`npm install`

GET	 --> http://Localhost:5000/api/books   --> Return all the books

GET	--> http://localhost:5000/api/books/1 --> Return book with the given id

GET -->	http://localhost:5000/api/books/author/AID --> Return all the books for that author

POST --> http://localhost:5000/api/books --> Add a new book

PATCH --> http://localhost:5000/api/books/1  --> Update book with the given id

DELETE --> http://localhost:5000/api/books/1  --> Delete a book with given id




# Whenever you create a new project

1.	Create app.js
2.	npm init
3.	npm install express --save
4.	npm install nodemon --save-dev
5.  npm install body-parser --save
6.  npm install uuid --save
7.	 Create a npm start command for nodemon in package.json file
"start" : "nodemon app.js"




# To Run an existing project
`npm start`




