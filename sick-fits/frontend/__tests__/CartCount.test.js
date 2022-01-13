import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount />', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });
  it('Matches snapshot', () => {
    const { container } = render(<CartCount count={10} />);
  });
  it('Updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={10} />);
    // can be done with vanilla js selectors
    expect(container.textContent).toBe('10');
    // same thing as above just more Jest-semantic
    expect(container).toHaveTextContent('10');
    // Update props
    rerender(<CartCount count="12" />);
    // wait for __ ms
    await wait(400);
    // another wait of doing the same as above (probably better)
    await screen.findByText('12');
    expect(container.textContent).toBe('12');
    expect(container).toMatchSnapshot();
  });
});
