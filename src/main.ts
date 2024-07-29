
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./database/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from 'dotenv';


dotenv.config();
const port = process.env.PORT || 4000;


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port }).then(({ url }) => {
    console.log(`Server ready and running at ${url}`);
});