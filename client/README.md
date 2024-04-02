# What's For Dinner? Recipe Database


# Table Of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [How To Install](#how-to-install)
- [Using the App](#using-the-app)
- [Future Features](#future-features)
- [Why I Made This App](#why-i-made-this-app)

# Description

Welcome to our culinary universe, where food lovers unite to explore, share, and create an endless array of mouth-watering recipes! Our app is designed to revolutionize your cooking experience, offering a seamless blend of discovery and creativity in the kitchen. From the moment you log in, you're granted access to a world of features that empower you to contribute your own recipes, curate a collection of favorites, and manage your culinary creations with ease. Whether you're looking to broaden your palate, plan your meals with precision, or connect with a community that shares your passion for food, our app is your ultimate companion. Join us on this delicious journey and let's make every meal an adventure! 

[Back to Top](#table-of-contents)
## Prerequisites

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

This application combines a React frontend with a Flask-SQLAlchemy backend. Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en)

- [Python](https://www.python.org/)

[Back to Top](#table-of-contents)

## How To Install

1. Fork and clone this repository into your local environment. Open the directory into your chosen code editor, such as VS Code.

- Open a terminal window to setup the environment before the app can run.

2. Backend:

    - Run cd server in the backend terminal window to navigate to the backend directory.
    - Run flask db init, flask db migrate -m "initial migration", and flask db upgrade to create the database.
    - Run flask run or python app.py to start the server. Ensure it is running on port 5555.
    - If for any reason it is not, exit with Ctrl-C, run FLASK_RUN_PORT = 5555, then flask run again.

3. Frontend:
    - Open a second terminal window to be in charge of the frontend. Ensure you are in the main directory; if not, run cd ...
    - Change to the client directory by running cd client in the frontend terminal window to navigate to the frontend directory.
    - Run npm install && npm start to install necessary dependencies and start the application.

[Back to Top](#table-of-contents)
## Using the App

1. Welcome to [What's For Dinner?](#whats-for-dinner-recipe-database), your go-to recipe database! Whether you're here to browse our extensive collection of recipes or to contribute your culinary masterpieces, here's how to get started:

### Viewing Recipes
- No Account Needed: Everyone can view our full collection of recipes without creating an account. Simply navigate to the "Recipes" section to start exploring. You can enjoy browsing through a variety of dishes to find inspiration for your next meal.

### Signing Up
- Create a Free Account: To engage with our community and utilize the app's full potential, sign up for a free account. Here's how:
    1. Click on the "Sign Up" button on the top right corner of the homepage.
    2. Fill in the registration form with your username, password, first name, and last name.
    3. Submit the form to create your account. You'll then be able to log in and access enhanced features.

### Enhanced Features for Registered Users
Once you're logged in, you unlock a suite of features to enhance your recipe management experience:

 - **Add Recipes:**  Contribute your recipes to our database. Simply navigate to the "Add Recipe" section and fill out the form with your recipe details.

- **Favorite Recipes:** Keep track of your favorite dishes by favoriting them. You can review your favorites anytime in the "Favorites" tab.

- **Edit and Delete Your Recipes:** Have full control over your submitted recipes. You can edit details or delete them if you no longer wish to share them with the community.

- **Edit Your Profile:** Update your personal information anytime through the "Edit Profile" section.

- **Filtering Recipes** Make the most out of our recipe collection by using filters to find exactly what you're looking for:

    - **Categories:** Filter recipes by category to narrow down your search to specific types of dishes.

    - **Favorites:** Easily access your favorited recipes by selecting the "Favorites" filter.

    - **Your Recipes:** View a list of all the recipes you've added to the database by applying the "Your Recipes" filter.

Enjoy exploring and contributing to our vibrant community of food lovers!


[Back to Top](#table-of-contents)
## Future Features

Get ready to elevate your culinary journey with our exciting upcoming features! Our goal is to make your meal planning as effortless and enjoyable as possible. Here's a sneak peek at what's cooking:

 - **Random Recipe Generator:** Say goodbye to the mealtime monotony and hello to inspiration with just a click! The innovative recipe generator will serve up a delicious selection of recipes tailored to your preferences and dietary needs. No more endless scrolling or pondering over what to cook next. We're streamlining your weekly meal planning process, making it easier than ever to discover new favorites.

- **Interactive Meal Calendar:** Plan ahead and keep track of your culinary creations with the user-friendly meal calendar. Whether you're organizing your meals for the week or reminiscing about past dishes, our calendar is your perfect kitchen companion. It's designed to help you manage your meal plans efficiently, ensuring you're always prepared for your next delicious adventure.

- **Drag and Drop Meal Planning:** Simplify your meal prep with our intuitive drag-and-drop feature. Easily assign recipes to days of the week, making adjustments a breeze. This hassle-free approach to meal planning means you spend less time organizing and more time creating in the kitchen.

- **Seamless Google Account Integration:** Experience streamlined access and synchronization with Google account integration. Log in effortlessly and sync your meal calendar with your Google Calendar, keeping all your plans in one convenient place. It's about making your meal planning as connected and seamless as your life.

- **Shopping List Generator:**  The Shopping List Generator will allow users to automatically create a shopping list based on the recipes they've planned for the week. It will intelligently compile ingredients from each recipe, eliminating duplicates and organizing items by category (e.g., dairy, produce, meats), making shopping trips more efficient. This tool will adapt to changes in the meal calendar, updating the shopping list in real time as users add or remove recipes. It's designed to save time, reduce waste, and ensure you never forget an ingredient again. 

- **Pantry Tracker:** The Pantry Tracker, the digital pantry assistant, designed to keep a close eye on your kitchen inventory. It will allow users to input and track the ingredients they have on hand, reducing food waste and unnecessary purchases. When planning meals or generating shopping lists, the tracker will automatically cross-reference your pantry inventory to suggest recipes based on what you already have and highlights what you need to buy. Over time, it will learn your consumption habits, providing insights and reminders about replenishing low-stock items. 

- **Servings Calculator:** Meal planning often involves adjusting recipes to fit the number of servings needed, which can be a hassle. The Servings Calculator will simplify this process. Whether you're cooking for one, a family, or hosting a dinner party, this tool will automatically scales recipes to your desired number of servings. It adjusts ingredient quantities accordingly, ensuring your meals turn out perfectly every time. This feature is particularly useful for reducing food waste and ensuring that everyone at the table gets their fill. It's an essential tool for anyone looking to tailor their cooking to specific needs without the headache of manual calculations.

Stay tuned for these mouth-watering features designed to enrich your cooking experience and transform how you interact with your recipes. We're cooking up a storm to bring more joy and creativity into your kitchen!

[Back to Top](#table-of-contents)
## Why I Made This App

I have a love of cooking. And over the years I have collected so many recipes from different sources. I have created binders, and recipe cards and other ways to keep my recipes organized but have never been able to fully transition to one specific method. By building this application, I am able to keep and share my recipes. By creating this database, I'll be able to track my recipes. I'll also be adding [future features](#future-features) to help with meal planning.


[Back to Top](#table-of-contents)






