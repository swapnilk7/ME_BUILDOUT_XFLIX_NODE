const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

app.listen(config.port, () => {
  console.log("Listening to port: " + config.port);

  mongoose.set("strictQuery", true);

  mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      console.log(`DB Connected on : ${config.mongoose.url}`);
    })
    .catch((e) => console.log("Error", e));
});
