


import { init, useQuery } from "@airstack/airstack-react";

const MyComponent = () => {
  const { data, loading, error } = useQuery(AIRSTACK_QUERY, variables, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <div>Airstack: {JSON.stringify(data)}</div>;

  // Render your component using the data returned by the query
};