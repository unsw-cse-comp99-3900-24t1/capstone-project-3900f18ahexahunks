## Documentation Links:

- [Frontend Accessibility documentation](./frontend/Documentation/accessibility.md)
- [Frontend UI/UX documentation](./frontend/Documentation/UIUX.md)
- [Frontend Usability documentation](./frontend/Documentation/usability.md)

### General Rules for the Group: (Vansh)

1. Code should be tested before pushing and the testing coverage of the code should be above 80% else code cannot be pushed to git.
2. Workload will be evenly distributed and if You are stuck reach out to everyone.
3. Do not just use AI software and copy Paste the code without understanding the code as we have to present the code and the project. If you do so u will get caught as the tutor will 4. ask what part you did and ask questions on that part so if u dont understand ask for help.
4. Code should be written using good software principles and good commenting makes it easier for someone else to understand, use standard naming principles and maintain uniformity.
5. Code should be reusable and also can be expandable like if u want to add more features u can add it easily rather than hard coding it for a particular feature.
6. Docker should be updated all the time.
7. None of the code should be done on the master or main branch, create a branch and push it on the branch.
8. Vansh should be created as the reviewer for all the merge requests.
9. Proper Linting on tab 4.
   Other will be updated soooon…….

###

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
