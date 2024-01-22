import bookResolvers from "./book";
import userResolvers from './user';
import messageResolvers from './message';
import merge from "lodash.merge"

const resolvers = merge(
    {},
    bookResolvers,
    userResolvers,
    messageResolvers,
)

export default resolvers;