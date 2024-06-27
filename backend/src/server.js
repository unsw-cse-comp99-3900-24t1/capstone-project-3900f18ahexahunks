const app = require('./app');
const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
