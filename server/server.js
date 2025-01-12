const express = require('express');
const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors()); 

app.use(express.json()); 

require("./config/mongoose.config");
require("./routes/project.routes")(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );