import {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue
} from "./models/issue";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    issues: () => {
      return getIssues();
    }
  },
  Mutation: {
    createIssue: async (parent, args) => {
      const rows = await createIssue(args.input);
      const newIssue = await getIssue(rows[0]);
      return newIssue[0];
    },
    updateIssue: async (parent, args) => {
      const row = await updateIssue(args.input);
      const newIssue = await getIssue(row);
      return newIssue[0];
    },
    deleteIssue: async (parent, args) => {
      const row = await deleteIssue(args.id);
      return row;
    }
  }
};
