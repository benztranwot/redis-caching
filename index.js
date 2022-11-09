const express = require("express");
const redis = require("redis");

const PORT = process.env.PORT || 5000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const app = express();

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos</h2>`;
}

async function getRepos(req, res) {
  try {
    console.log("Fetch new data");
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const repos = data.public_repos;

    // Set data to Redis
    await redisClient.setEx(username, 3600, JSON.stringify(repos));

    res.send(setResponse(username, repos));
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Cache middleware
async function cache(req, res, next) {
  console.log("Get data from cache");

  const { username } = req.params;

  const data = await redisClient.get(username);

  if (data) {
    res.send(setResponse(username, data));
  } else {
    next();
  }
}

app.get("/repos/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
