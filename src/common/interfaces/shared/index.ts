import { Express } from "express";
import { Server } from "http";
import { GraphQLSchema } from "graphql";
import { BaseContext } from "@apollo/server"
import { UserDocument } from "../user";
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      token?: string;
      clientApp?: ClientApp;
    }
  }
}

export interface GraphqlServer {
  app: Express;
  httpServer: Server;
  schema: GraphQLSchema
}

export interface GraphqlContext extends BaseContext {
  ip: string;
  user?: UserDocument;
  token?: string;
  clientApp?: ClientApp;
}

export interface GraphqlSubscriptionServer {
  httpServer: Server;
  schema: GraphQLSchema;
}

export interface ClientApp {
  key: string;
  name: string;
  domain: string;
}