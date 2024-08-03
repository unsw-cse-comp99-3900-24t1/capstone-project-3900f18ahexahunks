## Documentation Links:

- [Frontend Accessibility documentation](./frontend/Documentation/accessibility.md)
- [Frontend UI/UX documentation](./frontend/Documentation/UIUX.md)
- [Frontend Usability documentation](./frontend/Documentation/usability.md)

###

## Setup Instructions

### Install Node.js and npm

Make sure you have `nvm` installed. You can find installation instructions [here](https://github.com/nvm-sh/nvm#install--update-script).

### Using the Correct Node.js and npm Versions

1. Navigate to the project directory.
2. Run the following command to use the correct Node.js version:

   ```sh
   nvm use
   ```

3. If the correct Node.js version is not installed, you can install it using:

   ```sh
   nvm install
   ```

4. Install project dependencies:

   ```sh
   npm install
   ```

5. If you encounter issues, make sure you have the correct Node.js and npm versions:

   ```sh
   node --version
   npm --version
   ```

6. Finally run

   ```sh
   npm run postinstall
   ```

   Message to know if install was successful: `Node.js and npm versions are correct.`

### Set up Instructions:

You need to open the docker.
You need to navigate to the folder where you can see the docker-compose.yml file and run “docker compose up –build”.
This will start the compose process and start building the project.
At the end of the build which usually takes 4-5 minutes you will see three main logs that is:
swagger-1 | Swagger running on http://localhost:3005/api-docs/
backend-1 | MongoDB connected
backend-1 | GridFSBucket initialized
backend-1 | Server running on port: 5003
frontend-1 | Local: http://localhost:3000
After all these logs are shown you can directly visit localhost at 3000 for frontend and 3005 for the swagger doc.
If you still face any issue please go to our Readme.md: https://github.com/unsw-cse-comp99-3900-24t1/capstone-project-3900f18ahexahunks
And go to the “Setup Instructions” section and run the commands and then try docker again.
If you still face issues then please open three terminals and go to frontend, backend and swagger-final in each folder respectively and simply run “npm start” in each.
