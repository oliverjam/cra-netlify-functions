import React from "react";

function App() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/.netlify/functions/getGithubData")
      .then(res => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then(data => setData(data));
  }, []);
  if (!data) return <div>Loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
