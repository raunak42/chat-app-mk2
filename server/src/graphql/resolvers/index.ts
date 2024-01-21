import bookResolvers from "./book";
import merge from "lodash.merge"

const resolvers = merge(
    {},
    bookResolvers,
)

export default resolvers;