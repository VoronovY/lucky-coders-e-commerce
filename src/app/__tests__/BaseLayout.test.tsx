import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Logo from '../../shared/ui/logo/Logo';
import Button from '../../shared/ui/button/Button';
import { DateInput } from '../../shared/ui/dateInput/DateInput';
import { FormWrapper, FormWrapperProps } from '../../shared/ui/form/formWrapper/FormWrapper';
import { SelectInput } from '../../shared/ui/select/SelectInput';
import Portal from '../../widgets/portal/Portal';

describe('Logo component', () => {
  it('renders logo image with correct alt text', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const logoImage = screen.getByAltText('Stones Fall Store Logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders link to home', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', { name: /stones fall store logo/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});

describe('Button component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeDisabled();
  });
});

describe('DateInput component', () => {
  it('renders correctly', () => {
    const mockValue = new Date('2022-01-01');
    const mockOnChange = jest.fn();

    render(<DateInput value={mockValue} onChange={mockOnChange} />);

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue('01.01.2022');
  });
});

describe('FormWrapper component', () => {
  const mockTitle = 'Test Title';
  const mockButtonText = 'Submit';
  const mockChild = <div>Test Child</div>;

  const renderFormWrapper = (props: Partial<FormWrapperProps> = {}): RenderResult => {
    const defaultProps: FormWrapperProps = {
      title: mockTitle,
      buttonText: mockButtonText,
      children: mockChild,
    };
    const mergedProps = { ...defaultProps, ...props };
    return render(<FormWrapper {...mergedProps} />);
  };

  it('renders title, child and submit button correctly', () => {
    renderFormWrapper();

    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();

    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: mockButtonText });
    expect(submitButton).toBeInTheDocument();
  });
});

describe('SelectInput', () => {
  it('renders correctly', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];

    const onChange = jest.fn();

    const { getByRole } = render(
      <SelectInput
        id="select-input"
        placeholder="Select an option"
        options={options}
        value={null}
        onChange={onChange}
      />,
    );

    const selectInput = getByRole('combobox');
    expect(selectInput).toBeInTheDocument();
  });
});

describe('Portal', () => {
  beforeEach(() => {
    document.getElementById = jest.fn(() => document.createElement('div'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the children inside the target element', () => {
    const targetId = 'target-element';
    const childText = 'Hello, World!';
    render(
      <Portal target={targetId}>
        <div>{childText}</div>
      </Portal>,
    );

    expect(document.getElementById).toHaveBeenCalledWith(targetId);
  });
});
