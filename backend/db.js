const mongoose = require("mongoose");
const url =
"mongodb+srv://12345:Devu%402001@cluster0.l31dl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url, {
     
      useNewUrlParser: true,
      
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("Error: ", error));
};
