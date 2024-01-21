import bookResolvers from "./book";
import userResolvers from './user';
import merge from "lodash.merge"

const resolvers = merge(
    {},
    bookResolvers,
    userResolvers,
)

export default resolvers;