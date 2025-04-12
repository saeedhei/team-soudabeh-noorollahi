import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB.js";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply Apollo middleware to Express
  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  // Start Express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
    console.log(`⚡ Playground available at http://localhost:${PORT}/graphql`);
  });
}

startServer();
