import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App — Page Navigation', () => {
  it('shows Login page by default', () => {
    render(<App />)
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('clicking "Create account" navigates to Register page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('register-link'))

    expect(screen.getByTestId('register-page')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('clicking "Forgot password?" navigates to Forgot Password page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('forgot-link'))

    expect(screen.getByTestId('forgot-page')).toBeInTheDocument()
    expect(screen.getByText('Forgot Password')).toBeInTheDocument()
  })

  it('from Register page, click back to Login', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('register-link'))
    await user.click(screen.getByTestId('back-to-login'))

    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })

  it('from Forgot Password page, click back to Login', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('forgot-link'))
    await user.click(screen.getByTestId('back-to-login'))

    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })
})

describe('LoginPage — Fields & Submit', () => {
  it('has email input field', () => {
    render(<App />)
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('has password input field', () => {
    render(<App />)
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
  })

  it('has Sign In button', () => {
    render(<App />)
    expect(screen.getByTestId('login-btn')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('typing in email field works', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByTestId('email-input')
    await user.type(input, 'test@example.com')

    expect(input).toHaveValue('test@example.com')
  })

  it('typing in password field works', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByTestId('password-input')
    await user.type(input, 'mypassword')

    expect(input).toHaveValue('mypassword')
  })

  it('filling fields and clicking submit shows message', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('email-input'), 'test@example.com')
    await user.type(screen.getByTestId('password-input'), '123456')
    await user.click(screen.getByTestId('login-btn'))

    expect(screen.getByTestId('app-message')).toHaveTextContent('Logged in as test@example.com')
  })
})

describe('RegisterPage — Fields & Submit', () => {
  it('navigating to Register shows name, email, password fields', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('register-link'))

    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
  })

  it('filling all fields and submitting shows welcome message', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('register-link'))

    await user.type(screen.getByTestId('name-input'), 'John')
    await user.type(screen.getByTestId('email-input'), 'john@test.com')
    await user.type(screen.getByTestId('password-input'), 'pass123')
    await user.click(screen.getByTestId('register-btn'))

    expect(screen.getByTestId('app-message')).toHaveTextContent('Welcome John!')
  })

  it('has Sign Up button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('register-link'))

    expect(screen.getByTestId('register-btn')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })
})

describe('ForgotPasswordPage — Fields & Submit', () => {
  it('navigating to Forgot shows email field and submit button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('forgot-link'))

    expect(screen.getByTestId('reset-email-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument()
    expect(screen.getByText('Send Reset Link')).toBeInTheDocument()
  })

  it('filling email and submitting shows success message', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('forgot-link'))

    await user.type(screen.getByTestId('reset-email-input'), 'user@test.com')
    await user.click(screen.getByTestId('reset-btn'))

    expect(screen.getByTestId('success-msg')).toHaveTextContent('Reset link sent to user@test.com')
  })
})
