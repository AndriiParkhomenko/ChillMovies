import { fireEvent, render } from "@testing-library/react";

import { Button } from './Button'

describe('<Button/>', () => {
	it('should render a button', () => {
		const {getByText} = render(<Button variant="primary" title="login" >Login</Button>);

		getByText('Login');
	});
	
	it('should call onClick function', () => {
		const mockOnClick = jest.fn();

		const {getByText} = render(<Button variant="primary" title="login" onClick={mockOnClick} >Login</Button>);

		const button = getByText('Login');

		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalled();
	});

	it('should match snapshot', () => {
		const {getByText} = render(<Button variant="primary" title="login" >Login</Button>);

		const button = getByText('Login');

		expect(button).toMatchSnapshot()

	});
});