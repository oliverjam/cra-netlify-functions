# CRA and Netlify Functions

An example of how to integrate Create React App and Netlify Functions (using `netlify-lambda`).

## Run locally

1. Clone this repo
1. `npm install`
1. `npm start` to start the React dev server _and_ the Netlify Lambda server

## Docs

### Netlify Lambda

`netlify-lambda` lets us run Netlify Functions locally. We configure the directory containing our functions in the `netlify.toml` file. It will automatically serve any files in this folder at `localhost:9000/.netlify/functions`.

### Dev setup

We need our React app and our functions to run at the same time in development, so we use `npm-run-all` to run both `npm run start:react` and `npm run start:lambda` in parallel.

### Proxying the Lambda server

We need to tell our React app what port our functions are running on in development. We do this with the `proxy` field in our `package.json`:

```json
"proxy": "http://localhost:9000"
```

You can now `fetch(".netlify/functions/myFnName")` from your React app, and the request will get forwarded on to `localhost:9000` (where your lambdas are running).

### Environment variables

We're using our lambda to hide the private Github token (since including it in our React app would expose it to anyone looking at the source on the site).

The token lives in a gitignored `.env` file that we load into our lambda using the `dotenv` package, just like any Node server. You'll need to add that to your environment variables in your Netlify dashboard to ensure the deployed version of your functions have access to this.
