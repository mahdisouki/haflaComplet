const express = require('express');
const UserRoute = require('./routes/UserRoute');
const ServiceRoute = require('./routes/ServiceRoute');
const OfferRoute = require('./routes/OfferRoute');
const CommandeRoute = require('./routes/CommandeRoute');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({}));
require('dotenv').config();
require('./db/cnx');

// routes
app.use('/user', UserRoute);
app.use('/service', ServiceRoute);
app.use('/offer', OfferRoute);
app.use('/commande', CommandeRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}!!`));
