const axios = require("axios");
const { ApolloServer, gql } = require("apollo-server");
const { Octokit } = require("@octokit/rest");

const typeDefs = gql`
  type Query {
    getIncomingResponse(id: ID!): IncomingResponse
  }
  type IncomingResponse {
    login: String
    html_url: String
    name: String
    company: String
    location: String
  }
`;

const resolvers = {
  Query: {
    getIncomingResponse: async (parent, { id }, context) => {
      const breeds = await axios
        .get(`https://api.github.com/users/${id}`)
        .catch((error) => {
          console.log(error);
        });
      return breeds.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log("Server is ready at " + url);
});
