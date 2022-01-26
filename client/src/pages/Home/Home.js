import { useQuery, useMutation, gql } from "@apollo/client";

const SIGNUP = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
    }
  }
`;

async function Home() {
  const [testo] = useMutation(SIGNUP);
  const { loading, error, data } = await testo({
    variables: {
      username: "Calvarito",
      email: "c.gamil.com",
      password: "1234Kl",
    },
  });
  if (loading) return "loading...";
  if (error) return error.message;
  return JSON.stringify(data);
}

export default Home;
