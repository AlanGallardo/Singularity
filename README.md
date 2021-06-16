# Introduction
Singularity is a website that allows you to read a variety of science articles. \
You can also create your own articles if you are a premium user. \
The website also has a forum to discuss with other users questions that \
you or someone else post.

Check it by yourself -> [Singularity Website](https://singularityweb.netlify.app/) \
If you want to see the demo video of the app go to -> [Singularity Demo](https://www.youtube.com/watch?v=HyXJIog1YF8&feature=youtu.be)

# Structure
The website was built using the MERN Stack. MERN stands for:
- **MongoDB**: A no-relational oriented to documents database.
- **ExpressJS**: A NodeJS framework that makes easy the server-side creation \
keeping it simple, flexible and scalable.
- **ReactJS**: A Facebook framework oriented to components, to build easily the \
UI of the website.
- **NodeJS**: A runtime environment that allows the execution of JavaScript in the \
server-side.

![Singularity Structure](https://github.com/AlanGallardo/Singularity/blob/master/docs/estructura.png?raw=true)

## Database structure

![Database Structure](https://github.com/AlanGallardo/Singularity/blob/master/docs/E-R.png?raw=true)


# Installation in local
If you want to run the web on your local machine, please follow these steps:
- Download the code.
- Go to `client/src/api/index.js` and **change the URL of the line 3** from \
`https://singularityapi.herokuapp.com/` to `http://localhost:5000`
- You will have to run both, client and server side, so: \
`cd client` in one terminal \
`cd server` in the other terminal
- Now, in order to install all the dependencies, run in both terminals: \
`npm install`
- Once the installations are complete you can run the following command in both terminals: \
`npm start`
- It will lead you automatically to the website, if not, click this link [http://localhost:3000](http://localhost:3000)
