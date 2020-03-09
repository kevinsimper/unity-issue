import React, { useState } from "react";
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
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("test");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [loadIssues, { called, loading, data }] = useLazyQuery(QUERY, {
    context: {
      headers: {
        authorization: "bearer " + token
      }
    }
  });

  async function signup() {
    const req = await fetch("http://localhost:9000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await req.json();
    setStatus(data.status);
  }

  async function login() {
    const req = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await req.json();
    setStatus(data.status);
    setToken(data.token);
  }

  if (called && loading) return <p>Loading ...</p>;
  return (
    <div>
      <h1>Unity Issues</h1>
      <hr />
      <div>
        Email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={signup}>Create User</button>
      <button onClick={login}>Login</button>
      <div>{status}</div>
      <hr />
      {token && <button onClick={() => loadIssues()}>Load issues</button>}
      {called &&
        data.issues.map(i => (
          <div>
            Id: {i.id} - Summary: {i.summary}
          </div>
        ))}
    </div>
  );
};
