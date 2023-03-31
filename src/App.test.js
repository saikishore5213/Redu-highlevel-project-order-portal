import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText("You are not signed in! Please sign in.")[0];
  expect(linkElement).toBeInTheDocument();
});
