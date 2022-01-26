import { useQuery, gql } from "@apollo/client";

const EVENTS = gql`
  query {
    getEvents {
      id
      ev_organizer
      ev_name
    }
  }
`;

const Events = () => {
  const { loading, error, data } = useQuery(EVENTS);
  if (loading) return "loading...";
  if (error) return error.message;
  return <p>{JSON.stringify(data)}</p>;
};
