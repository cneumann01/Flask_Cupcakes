# Flask_Cupcakes

This is a web application that allows users to manage and display a collection of cupcakes. Users can view the list of cupcakes, add new cupcakes, update existing cupcakes, and delete cupcakes.

## Features

- View a list of cupcakes with their flavors, sizes, ratings, and images.
- Add a new cupcake with flavor, size, rating, and optional image.
- Update an existing cupcake's details.
- Delete a cupcake from the collection.

## Technologies Used

- Flask: a Python web framework for building the backend server.
- PostgreSQL: a relational database management system for storing cupcake data.
- SQLAlchemy: an ORM (Object-Relational Mapping) library for working with databases in Python.
- HTML/CSS: for building the user interface and styling the application.
- Bootstrap: a CSS framework for creating responsive and visually appealing web pages.
- JavaScript/AXIOS: for handling client-side interactions and making API requests.

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/your-username/cupcake-shop.git
  ```

2. Create a virtual environment and activate it:

  ```bash
  cd cupcake-shop
  python3 -m venv .venv
  source .venv/bin/activate
  ```
  
3. Install the required dependencies:

```bash
pip install -r requirements.txt
```

4. Set up the PostgreSQL database:
* Create a new PostgreSQL database.
* Update the SQLALCHEMY_DATABASE_URI in the app.py file with the connection URL of your database.

5. Run the application:

```bash
flask run
```
Open your web browser and visit http://localhost:5000 to access the Cupcake Shop application.

## Usage
* Upon visiting the homepage, you will see a list of cupcakes (initially empty) and a form to add new cupcakes.
* Fill out the form fields (flavor, size, rating, and optional image) and click the "Add Cupcake" button to add a new cupcake.
* The newly added cupcake will appear in the cupcake list.
* Updating
* The cupcake list will update dynamically to reflect any changes made via axios calls to the custom flask api.
