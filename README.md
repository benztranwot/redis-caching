# Redis Caching

A simple Express app with Redis Caching.

## How to run this app

- I'll assume that you already have Redis installed on your machine and WSL 2 too if you're using Windows.

### First, start the Redis server

- Depend on your type of system, you can find the instruction how to locally start the Redis Server [here](https://redis.io/docs/getting-started/)

### Open terminal in the root directory of the project where the `index.js` is located and type:

```
npm start
```

- Open your browser and visit `http://localhost:5000/repos/benztranwot` to see the result. Change the username in the url to view other github users if your prefer.
- Open the Dev Tools and switch to Network tab to see the Finish Time, Redis Caching improves the website performance when you refresh the page.

## Technologies

- [Redis](https://redis.io/)
- [Express.js](https://expressjs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Show your support

Give a ⭐️ if you like this project!

## License

[MIT](LICENSE)
