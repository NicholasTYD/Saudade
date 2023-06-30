# Saudade

## Overview
Saudade is a dream journal designed for users to record their dreams.
Users can add dreams to the web application and rate them on a scale of 1 to 5.
Saudade also allows the user to view, edit and delete their past dreams as well as search for specific dreams through a search menu. Analytical users may additionally view their dream statistics for the past few months and compare them with their overall lifetime stats.

This web application was developed as the Capstone project for the "CS50’s Web Programming with Python and JavaScript" online course offered by Harvard University.

Saudade is built using Django REST Framework as the backend, and ReactJS as the frontend. HTML, CSS JavaScript and Python were also used where applicable.

You may view a demostration of the application's functionality [here](https://www.youtube.com/watch?v=94nXDkZkNak).

## Distinctiveness and Complexity

### Distinctiveness
Saudade differs from the other projects in the course:
- Saudade is a web application with a focus on tracking and rating dreams for users themselves, differing in theme from the other projects which emphasise more on social interaction.
- Unlike Project 2 and Project 4 where users interact with each other, Saudade only involves the user interacting with entries that they themselves have submitted. Users are not allowed to view dreams that others have submitted.
- Saudade places a greater emphasis on helping users obtain insights on their data (See the section on Complexity), an aspect which previous projects did not cover.

### Complexity
Saudade is significantly more complex than my previous projects in the course:
- While all the projects so far utilise Django as both the backend and part of the frontend, Saudade uses Django as purely the backend, with the frontend covered by ReactJS. This separates the concerns involving what the user sees from the internal logic of the web application.
- There are much more customisation options for the user. Saudade features a more complex search system that allows one to simultaneously search using keywords, dates, and rating values at once instead of simply using just keywords.
- There is more processing and manipulation of user data. Dream entries submitted by the user is processed and consolidated into detailed statistics that provides insights for the dreams that the user submits.
- The visual delivery of the web application is greatly improved. Saudade utilises more transitions and states to make the webpage appear more dynamic and interactive, such as making certain elements on a single webpage only appear when scrolled to. There is also a greater emphasis on mobile responsiveness making the site more user friendly towards mobile users.

## Specification

### Navigation Bar
- Displays the site name `Saudade`, `Login` and `Register` if a person is a visitor (not logged in)
- Displays the site name `Saudade`, `Record Dream`, `Past Dreams`, `Statistics` and `Log Out` if a person is a user (logged in). It also displays the currently logged in user.

### Home Page (Record Dream)
- Clicking on the `Saudade` logo or the `Record Dream` button if logged in on the navbar navigates to the home page.
- If not logged in, displays a page previewing some of the features of the site, as well as buttons to `Login` and `Register` at the end.
- If logged in, prompts the user if they want to add a new dream entry.
    - Users must add in a title, description, date and rating.
    - Clicking any of the buttons brings up a form for the user to enter their dream details. If user is adding for today, the date field is pre-filled to be today.
    - If any fields are unfilled, date is invalid (after the current date), or title is too long (>100 characters), displays a warning message and prevents submission.
    - On successful submission, displays a successfully recorded message, with 2 buttons for the user to either navigate to the `Past Dreams` page, or add another dream entry.

### Past Dreams Page
- Displays a list of all the dream entries recorded, sorted by descending date first, then descending rating.
- Each dream entry displays the date of the dream, the title, and the rating assigned.
- Users can `Search` for specific dreams through the search menu.
    - Searching for keywords brings up all entries with the given keyword in the title or the description.
    - Searching for entries between a date range (inclusive) is possible. If only 1 date is entered, it will return all entries from/before or at the entered date.
    - Users can also search by star ratings.
- Users can set the max number of entries displayed per page, which will update the entries accordingly and return the user to page 1, if they are on a different page. This setting is tied to the user and persists even when the user logs back out and logs in again.
- Clicking on a dream entry brings up a popup containing the full title (if truncated in the dream entry), the date, rating and the full description given.
    - Users can `Delete` the entry, which would first prompt a confirmation message
    - Users can click the `Close` button or outside the popup to close the popup.
    - Clicking the `Edit` button allows for editing the message, subject to the same constraints as adding a new one (E.g. Fields must not be empty etc.)

### Statistics Page
- Displays statistics based on the dreams recorded for a user.
    - Displays line charts detailing the distribution of dreams and average ratings recorded for the past 6 months, as well as additional information about their averages for the entire 6 months.
    - Also displays a line chart of days with at least a dream, and the percentage for the past last 6 months.
    - Displays 2 doughnut charts showing the spread of ratings given for the last 6 months vs lifetime ratings given.
        - This section is not displayed if the user has no dreams recorded.
    - Contains a section with interesting stats
        - Displays the total amount of dreams recorded by the user in the system.
        - Displays the date with the most dreams
        - Displays the dream entry with the longest description. 
            - Users can click the entry to view/edit/delete it just like in the `Past Dreams` page. Editing or deleting it will trigger a page refresh and update the statistics accordingly.
            - There are additional comments given if the description is either really short (50 characters) or long (above 1000 characters).
        - If the user has no dreams recorded, only display the total amount of dreams recorded, which is 0.

### Login, Register Pages
- Displays an interface to login/register.
    - If fields are incorrect or missing, displays a warning message and prevents submission.

## File/Directories Created
- `requirements.txt`: Python packages to download in order to run the application.
- `README.md`: Describes the project.

### `capstone` Directory
Contains default Django files.

### `api` Directory
Contains default Django files related to the backend of the application, as well as some additional/modified files below.
- `admin.py`: Register models for admin site.
- `models.py`: Contains models created, specifically `User` and `Dream` models.
- `serializers.py`: Contains serializers to process model data into a format suitable for sending as JSON Response data.
- `urls.py`: URL patterns for site pathing.
- `views.py`: Contains the backend logic for processing incoming API requests and obtaining stored data.

### `frontend` Directory
Contains default ReactJS files related to the frontend of the application, as well as some additional/modified files below.
- `build`, `node_modules` Directory
    - Not directly modified
- `public` Directory
    - `favicon.ico`: Contains the favicon for the app in ReactJS
    - `index.html`: Entry point for the frontend application as the initial HTML file loaded on site visit.
    - `manifest.json`, `robots.txt`: Unmodified
- `src` Directory
    - Main directory containing source code for the frontend.
    - `AuthPages` Directory
        - Contains source code for authentication related webpages (`Login` and `Register`).
        - `AuthLayout.js`: Defines the general layout of `Login` and `Register` pages.
        - `Login.js`: Contains logic and HTML for the `Login` page.
        - `Register.js`: Contains logic and HTML for the `Register` page.
    - `MainPage` Directory
        - Contains source code for the home page.
        - `MainPage.js`: Determines if the home page should render a page meant for people that are logged in (`users`), or people that are not logged in (`visitors`)
        - `MPageUser.js`: Renders the home page for users.
        - `MPageVisitor.js`: Renders the home page for visitors.
        - `NewdreamForm.js`: Renders the form presented when a user wants to create a new dream entry.
    - `PastDreams` Directory
        - Contains source code for the `Past Dreams` page.
        - `PastDreams.js`: Renders the general layout of the `Past Dreams` page.
        - `DreamEntry.js`: Renders the element on the `Past Dreams` page which contains the date, title, and rating of a dream.
        - `DreamInfoModal.js`: Renders the modal that appears when the dream entry element is clicked on.
        - `MaxEntriesPerPageDropdown.js`: Renders the dropdown to adjust the max number of dream entries shown on a page.
        - `Pager.js`: Renders the pagination on the page.
        - `SearchMenu.js`: Renders the search menu on the page.
        - `pastDreams.css`: CSS stylesheet for the page.
    - `Rating` Directory
        - Contains source code for the 5-star rating display
        - `acknowledgements.txt`: Contains acknowledgements for the star rating display.
        - `StarRating.js`: Contains code for the star rating display.
        - `StarRating.css`: CSS stylesheet for the display.
    - `Stats` Directory
        - Contains source code for the `Statistics` page.
        - `StatsPage.js`: Renders the general layout of the `Statistics` page
        - `DonutChart.js`: Renders a Doughnut chart
        - `LineChart.js`: Renders a Line chart
    - `Misc` Directory
        - Contains miscellaneous code for certain functions or pages.
        - `Helpers.js`: Contains utility functions for frontend logic.
        - `MissingPage.js`: Renders a missing page when a URL is not found.
        - `Navbar.js`: Renders the navigation bar on the top of the page.
        - `RouteProtect.js`: Code to check if a user/visitor is authorised to visit a given URL, and to redirect them if they are not.
    - `index.js`: Renders the navigation bar and the pages.
    - `index.css`: CSS stylesheet for `index.js`.
    - `styles.css`: CSS stylesheet for the entire frontend application.

## Running Saudade

1. Ensure that you have Python, NodeJS and Django installed.

2. Navigate to root directory and run the command `pip install -r requirements.txt` to install the necessary Python packages needed to run the application.
    - You are in the correct directory if you see the `api`, `capstone` and `frontend` directories in it, alongside the `requirements.txt` file.

3. Navigate into the `frontend` directory and run `npm install` to install all the necessary node modules needed to run the application.

4. Within the same `frontend` directory, run `npm run build` to build the ReactJS files needed to render the frontend portion of the application.

5. Navigate back to the root directory, and run the following commands in order:
    - `python manage.py makemigrations`
    - `python manage.py migrate`
    - `python manage.py runserver`

6. A development server should be started at http://127.0.0.1:8000/. Access that URL using an internet browser to start the application.

## Acknowledgements
The code for the star rating system is adapted from [here](https://codepen.io/hesguru/pen/BaybqXv)
