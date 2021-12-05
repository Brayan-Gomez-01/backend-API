import {API_KEY, API_URL} from "./constants/constants"
import fetch  from "node-fetch"

const requestToGithub = async ({ user, limit }) => {
  const query = `
  query {
    user (login: "${user}") {
      avatarUrl
      email
      starredRepositories(first: ${limit}) { 
        totalCount
        nodes {
          databaseId
          name
          url
          languages (first: 20){
            nodes {
              name
            }
          }
        }
      }
      repositories (first: ${limit}) { 
        totalCount
        nodes {
          databaseId
          name
          url
          languages (first: 20){
            nodes {
              name
            }
          }
        }
      }
    }
  }`;
  const result = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const data = await result.json();
  return data;
};

const githubRepositories = async (req, res) => {
  const repositoriesInfo = await requestToGithub({
    ...req.params,
    ...req.query,
  });
  res.status(200).send(repositoriesInfo);
};

exports.githubRepositories = githubRepositories;
