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
found within the "sticky note" attached to each recipe.

The user can then chose to filter by their favorites, or by any of the other tags found on the left sidebar of the page, by
clicking their desired tag name. The user can select as many tags as they wish, and any recipes that match those tags will be
displayed, along with a banner that tells the user how many recipes match their search.

The user can also search by name by typing their inquiry in the search bar at the top right of the page. Additionally, the user can choose to filter by search bar and by tag. The filtering possibilities are nearly endless!

 When the user clicks on a chosen recipe, they will see the necessary ingredients, total cost, and the instructions for cooking. They can also choose to add the selected recipe to their "Cook Later" list, which can then be found under the main page's filter tags.  If the user does not have enough ingredients for a selected recipe, they will not be able to cook that recipe. If they do have enough ingredients, the 'Cook Now' button under the recipe's title will be clickable. When the user clicks the 'Cook Now' button, all respective amounts of the recipe's ingredients will be deducted from the user's pantry.

 In the pantry section located at the bottom right of the page, the user can find a randomly generated pantry, which will determine which recipes they are able to cook. The user can view what is currently in their pantry and add as many ingredients as they wish to their pantry in this section.

### Check Out the Page In Action!
![Screen Recording of What's Cookin Page](https://user-images.githubusercontent.com/93603551/163867681-e72b1f38-5ddc-448e-b9f4-11e15d397880.gif)


### Project Wireframes Using Excalidraw

<img width="500" alt="Screen Shot of all recipes page wireframe" src="https://user-images.githubusercontent.com/93603551/161634405-0ef6e479-cd67-4816-9c02-7d9fd56f86bd.jpeg"><br>

<br>
<img width="500" alt="Screen Shot of recipe details page wireframe" src="https://user-images.githubusercontent.com/93603551/161626977-5ed4625a-c124-4c51-b300-8c46cec55ae9.jpeg">

### Technologies Used

- JavaScript
- Webpack
- Mocha and Chai

### How to Set Up

- Fork this repository
- Copy the SSH clone address
- run git clone [remote address][whatever you want to call this repo]
- run npm install in your terminal
- run npm start in the Terminal and open localhost:8080 in your browser
- now fork and clone the APIs that the site will be drawing it's data and Pantry functionality from: (https://github.com/turingschool-examples/whats-cookin-api)
- run npm install in your terminal
- run npm start in  your terminal
- When you're ready to quit, make sure to Control C in both terminals to stop your local servers!

### Learning Goals and Outcomes
Our main goals for this project were to gain familiarity with fetch API, Webpack and the GitHub project board. For the second part of this project, our focus was on utilizing tools such as semantic HTML, ARIA-labels, and the Lighthouse testing tool to make our app accessible. We also incorporated POST requests into our app, to allow users to add and subtract ingredients from their pantries. We also gain familiarity with running a local server.

We pair-programmed most of the project, with the goal of everyone learning and understanding the code synchronously. With 3 different time zones between us, this proved a difficult task. Using the GitHub project board helped us to keep track of each component of the project and achieve our MVP by the project's deadline.


### Future Features
- Add main landing page that showcases random recipes.
- Add the specific amount of ingredients needed in recipe details page.

### Contributors
- [Alex Bumpus](https://github.com/Abumpus1)
- [Nickolai Orlov](https://github.com/orlov-n)
- [Emma Brooke-Davidson](https://github.com/emmacbd)
