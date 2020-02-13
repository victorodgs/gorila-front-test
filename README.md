## Front-End

1 - To get all dependencies, run:

    npm install

2 - IMPORTANT! You have to run a script in post install do setup path aliases in the app.

    npm run-script setup-aliases

![enter image description here](https://i.imgur.com/trgX4Ul.png)
We use path aliases to avoid possible referencies errors in paths. Example:

    // BAD
    import '../../../../components/component';

    // GOOD
    import '@components/component';

Now you can run this command to start the application:

    npm start

## API

To get all dependencies in /api folder, run:

      npm install

Now you can run this command to start the server:

    npm start

The application will be listening in `http://localhost:3001`

**IMPORTANT**
both applications need to be running to get everything working fine.
