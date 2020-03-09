import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

const QUERY = gql`
  {
    issues {
      id
      summary
    }
  }
`;

export default () => {
  const [loadIssues, { called, loading, data }] = useLazyQuery(QUERY);
  if (called && loading) return <p>Loading ...</p>;
  return (
    <div>
      <h1>Unity Issues</h1>
      <button onClick={() => loadIssues()}>Load issues</button>
      {called &&
        data.issues.map(i => (
          <div>
            Id: {i.id} - Summary: {i.summary}
          </div>
        ))}
    </div>
  );
};
