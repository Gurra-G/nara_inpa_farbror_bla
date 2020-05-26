# Nära inpå farbror blå

Nära inpå farbror blå is a web application that allow users to fetch information
about current emergency situations in Skåne. The application measures the distance
between a situation and the current location of the user in order to inform them about
how close they are to danger!

## Project description

The application was built using the React framework with Redux, Firebase and Material-UI.
Furthermore the application uses https://brottsplatskartan.se/sida/api in order to fetch
current situations happening in Skåne.

### Why we chose React

We chose to work with React for this project because it is one of the more populare frameworks
to use for frontend development. We chose this above Vue.js and Angular.js as all team members
had previous experience working with React and wanted to further increase their knowledge within the framework.

Vue.js and Angular.js is rapidly gaining popularity but in the 2019 stackoverflow survey React
is still the most populare framework and this was further motivation for the choice[1].

Angular however has a steeper learning curve compared to the other frameworks and this made it
feel less appropiate to use for this project.

The fact that React has been very popular for a long time provides it with the advantage
of having a large amount of resources available online such as guides and Q&As [2].

## Getting started

### `Google API key`

In order to run this project successfully you will need to generate
a javascript google maps api key and place it in the googleConfig.js file.

### `npm i`

Will install the required dependencies for this project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### References

[1]: https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks
[2]: https://www.codeinwp.com/blog/angular-vs-vue-vs-react/
