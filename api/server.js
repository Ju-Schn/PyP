const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/resources/image/`;
const TAGS_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/tags/image/`;
const SEARCH_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/resources/search`;

const auth = {
  username: config.API_KEY,
  password: config.API_SECRET,
};

app.get("/photos", async (req, res) => {
  const response = await axios.get(BASE_URL, {
    auth,
    params: {
      next_cursor: req.query.next_cursor,
    },
  });
  return res.send(response.data);
});

app.get("/tags", async (req, res) => {
  const response = await axios.get(TAGS_URL, {
    auth,
  });
  return res.send(response.data);
});

app.get("/search", async (req, res) => {
  const response = await axios.get(SEARCH_URL, {
    auth,
    params: {
      expression: req.query.expression,
      with_field: req.query.tags,
    },
  });

  return res.send(response.data);
});

const PORT = 7001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
