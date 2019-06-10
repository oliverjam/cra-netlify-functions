import fetch from "node-fetch";
import { config } from "dotenv";
config();

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export async function handler(event, context) {
  try {
    const data = await fetch(
      `https://api.github.com/users/oliverjam?access_token=${TOKEN}`
    ).then(res => {
      if (!res.ok) {
        const error = new Error("HTTP error");
        error.status = res.status;
        throw error;
      }
      return res.json();
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: error.status || 500,
      body: error.message
    };
  }
}
