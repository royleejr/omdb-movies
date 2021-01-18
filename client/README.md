# OMDb Movie Nomimations

## Introduction

This web application allows users to search for movies and save them as nominations for a hypothetical awards show. Users can make up to a maximum of five nominations; any existing nomination can be removed if desired. Movie information is obtained from the [Open Movie Database (OMDb) REST API](http://www.omdbapi.com/).
​
I am responsible for the full design and development of this responsive site.

## Technologies

- [Javascript](https://www.javascript.com/)
- [React](https://reactjs.org)
- [SCSS](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Features

##### Search Page

- This is the initial page shown when the app is loaded. It can be accessed by clicking the home icon in the header.
- Enter a movie title in the search bar to search through the OMDb database.
- The search is "live", i.e. any update to the search term updates the results list. If there are no results, the initial message is shown (instructing the user to search for a movie).
- Search results are displayed below the search bar. For each result, the movie's release year, title, and poster image are shown. CTA buttons allow the user to 1) navigate to the Movie Details page to view more information and 2) nominate the movie (or remove the nomination if they have previously nominated it).
- When a movie is nominated or its nomination is removed, an animated banner appears indicating successful addition/removal. If the user tries to nominate a sixth movie, banner appears indicating that they are unable to do so (and the movie is not added to the nominations list).
- Search results include exact movie title matches, as well as movie titles containing the search input string. For example, the search term "Avenge" would return movie titles such as "Avenge", "The Avengers", and "Next Avengers: Heroes of Tomorrow". Exact matches are always shown first (i.e. higher in the results list).
- A maximum of 10 search results are shown at a time. Click the "Show More" button at the bottom of the search results to view more results.
  ​

##### Nominations Page

- This page can be accessed by clicking the trophy icon in the header.
- Up to five movies nominated by the user are displayed here. When there are zero nominations, a message is displayed instructing users to search and nominate movies.
- For each nomination, the movie's release year, title, and poster image are shown. CTA buttons allow the user to 1) navigate to the Movie Details page to view more information and 2) remove the nomination.

##### Movie Details Page

- This page can be accessed by clicking the "Movie Details" button for any movie card in the Search Page or the Nominations Page.
- The following information is displayed: the movie's poster image, release year, title, rating, duration, genre, ratings (IMDB, Rotten Tomatoes , and Metacritic), and plot description. Click the "More Info" button to display a description of the cast, director(s), writer(s), and award(s).
- The main CTA buttons allows the user to nominate the movie (or remove the nomination if they have previously nominated it.

##### General

- The back-end Express server has two routes: a nominations route and a search route.
- The nominations route has a POST endpoint for adding a new nomination, a PUT endpoint for removing a nomination, and a GET endpoint for retrieving the list of saved nominations.
- The search route has a GET endpoint for retrieving a specific page of results for the given search term, and a GET endpoint for retrieving detailed information for one specific movie.
- The first GET endpoint in the search route returns movies that exactly match the search input string in the request body. If there are no more exact matches and the user clicks "Show More" results, the endpoint will start returning non-exact matches that contain the search input string. A filtering mechanism is used to ensure that no duplicates (to the exact matches) are ever returned.

### Ideas for Future Enhancements:

- Add loading animations when waiting for search results, adding or removing nominations.
- Add entry animations when search results start to populate.
- Save the search after the user leaves the search page so if the user returns to the page, the results are still displayed.
- Create shareable links.
- Improve site accessibility to Level AA at minimum.

## Contact

Created by Roy Lee. Connect with me on [LinkedIn](https://www.linkedin.com/in/roy-lee-jr/)!
