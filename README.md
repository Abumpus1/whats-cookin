# What's Cookin'!

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [How to Set Up](#how-to-set-up)
- [Learning Goals](#learning-goals)
- [Future Features](#future-features)
- [Contributors](#contributors)

## Project Overview

### Welcome to **What's Cookin'**!
What's Cookin' is an application that presents the user with a variety of recipes, allows the user to add ingredients to a randomly generated pantry, and determines if the user has enough ingredients to cook a given recipe.

From the main page, the user can add a recipe to their favorites by clicking the heart icon
found within the title "sticky note" attached to each recipe.

The user can then chose to filter by their favorites, or by any of the other tags found on the left sidebar of the page, by
clicking their desired tag name. The user can select as many tags as they wish, and any recipes that match those tags will be 
displayed, along with a banner that tells the user how many recipes match their search.

The user can also search by name by typing their inquiry in the search bar at the top right of the page. Additionally, the user can choose to filter by search bar and by tag. The possibilities are nearly endless!

 When the user clicks on a chosen recipe, they will see the necessary ingredients, total cost, and the instructions for cooking. They can also choose to add the selected recipe to their "What to Cook Next" list.

### Check Out the Page In Action!
![Screen Recording 2022-04-04 at 5 51 53 PM](https://user-images.githubusercontent.com/93603551/161645897-7d389f5c-df98-4966-8e1a-a5482d122ffc.gif)

### Project Wireframes Using Excalidraw

<img width="500" alt="Screen Shot of all recipes page wireframe" src="https://user-images.githubusercontent.com/93603551/161634405-0ef6e479-cd67-4816-9c02-7d9fd56f86bd.jpeg"><br>

<br>
<img width="500" alt="Screen Shot of recipe details page wireframe" src="https://user-images.githubusercontent.com/93603551/161626977-5ed4625a-c124-4c51-b300-8c46cec55ae9.jpeg">

### Technologies Used

- JavaScript
- Webpack
- Mocha and Chai

### How to Set Up

-  Clone this repo
- `cd` into the `whats-cookin` directory
- Run `npm install`
- Run `npm start`
- Open a window in your web browser of choice, and visit localhost:8080 to view the app!

### Learning Goals and Outcomes
Our main goals for this project were to gain familiarity with fetch API, Webpack and the GitHub project board. We pair-programmed most of the project, with the goal of everyone learning and understanding the code synchronously. With 3 different time zones between us, this proved a difficult task. Using the GitHub project board helped us to keep track of each component of the project and achieve our MVP by the project's deadline.


### Future Features
- Add error messages/sad paths for filtered recipe results that return nothing (for example: "Sorry, no recipes found! Please try another search!").
- Add main landing page that showcases random recipes.
- Add the specific amount of ingredients needed in recipe details page.
- Build out drop-down choices for menu button in header navigation bar.
- Add user's pantry to data model, and incorporate into the Want To Cook functionality.

### Contributors
- [Alex Bumpus](https://github.com/Abumpus1)
- [Nickolai Orlov](https://github.com/orlov-n)
- [Emma Brooke-Davidson](https://github.com/emmacbd)
