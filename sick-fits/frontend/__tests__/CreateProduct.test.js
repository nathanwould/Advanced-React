import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { fakeItem, makePaginationMocksFor } from '../lib/testUtils';
import { ALL_PRODUCTS_QUERY } from '../components/Products';

const item = fakeItem();

describe('<CreateProduct />', () => {
  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('handles the updating', async () => {
    // render the form out
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    // type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    // await userEvent.type(
    //   screen.getByPlaceholderText(/price/i),
    //   item.price.toString()
    // );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );
    debug();
    // check that those boxes are populated
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });
});
