require("express-async-errors");
const express = require("express");
const routes = require("./routes")
const AppErrors = require("./utils/AppErrors");
const app = express();
const req = require("express/lib/request");
const PORT = 3333;


app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppErrors) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})


app.listen(PORT, () => {console.log(`App running in the PORT ${PORT}`)});

