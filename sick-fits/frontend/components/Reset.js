import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
// import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    token,
  });
  const [signup, { data, loading, error}] = useMutation(RESET_MUTATION, {
    variables: inputs,
    // refetch currently logged in user
    // refetchQueries: CURRENT_USER_QUERY,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    const res = await signup();
    console.log(res);
    resetForm();
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <Error error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
