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
