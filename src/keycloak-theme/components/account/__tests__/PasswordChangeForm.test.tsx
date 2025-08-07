import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordChangeForm } from '../PasswordChangeForm'

// Mock the theme config hook
vi.mock('../../../../lib/use-theme-config', () => ({
  useThemeConfig: () => ({
    branding: {
      logoUrl: '/test-logo.png',
      primaryColor: 'hsl(142 76% 36%)',
      secondaryColor: 'hsl(24 100% 50%)',
      projectName: 'FOODMISSION',
    },
    content: {
      welcomeMessage: 'Welcome to FOODMISSION',
      projectDescription: 'Test description',
      supportEmail: 'support@foodmission.eu',
      privacyPolicyUrl: 'https://test.com/privacy',
      termsOfServiceUrl: 'https://test.com/terms',
    },
    features: {
      socialLogin: false,
      selfRegistration: true,
      passwordReset: true,
    },
  }),
}))

describe('PasswordChangeForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders password change form with all fields', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    expect(screen.getByRole('heading', { name: 'Change Password' })).toBeInTheDocument()
    expect(screen.getByLabelText('Current Password')).toBeInTheDocument()
    expect(screen.getByLabelText('New Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument()
  })

  it('hides current password field when not required', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} requireCurrentPassword={false} />)

    expect(screen.queryByLabelText('Current Password')).not.toBeInTheDocument()
    expect(screen.getByLabelText('New Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    const errorMessage = 'Current password is incorrect'
    render(<PasswordChangeForm onSubmit={mockOnSubmit} error={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} isLoading={true} />)

    expect(screen.getByText('Changing Password...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Changing Password...' })).toBeDisabled()
  })

  it('disables submit button when form is incomplete', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: 'Change Password' })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when all fields are valid', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText('Current Password'), 'oldPassword123')
    await user.type(screen.getByLabelText('New Password'), 'NewPassword123')
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewPassword123')

    const submitButton = screen.getByRole('button', { name: 'Change Password' })
    expect(submitButton).not.toBeDisabled()
  })

  it('validates password strength requirements', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    const newPasswordInput = screen.getByLabelText('New Password')
    await user.type(newPasswordInput, 'weak')

    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument()
  })

  it('shows password strength indicator', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    const newPasswordInput = screen.getByLabelText('New Password')
    await user.type(newPasswordInput, 'StrongPassword123!')

    expect(screen.getByText('Password strength:')).toBeInTheDocument()
    expect(screen.getByText('Strong')).toBeInTheDocument()
  })

  it('validates password confirmation match', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText('New Password'), 'Password123')
    await user.type(screen.getByLabelText('Confirm New Password'), 'DifferentPassword123')

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  it('prevents using same password as current', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    const samePassword = 'SamePassword123'
    await user.type(screen.getByLabelText('Current Password'), samePassword)
    await user.type(screen.getByLabelText('New Password'), samePassword)

    expect(screen.getByText('New password must be different from current password')).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    const newPasswordInput = screen.getByLabelText('New Password')
    const toggleButton = newPasswordInput.parentElement?.querySelector('button')

    expect(newPasswordInput).toHaveAttribute('type', 'password')

    if (toggleButton) {
      await user.click(toggleButton)
      expect(newPasswordInput).toHaveAttribute('type', 'text')

      await user.click(toggleButton)
      expect(newPasswordInput).toHaveAttribute('type', 'password')
    }
  })

  it('displays password requirements checklist', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    expect(screen.getByText('Password Requirements:')).toBeInTheDocument()
    expect(screen.getByText('At least 8 characters long')).toBeInTheDocument()
    expect(screen.getByText('At least one lowercase letter')).toBeInTheDocument()
    expect(screen.getByText('At least one uppercase letter')).toBeInTheDocument()
    expect(screen.getByText('At least one number')).toBeInTheDocument()
  })

  it('updates requirements checklist based on password input', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    const newPasswordInput = screen.getByLabelText('New Password')
    await user.type(newPasswordInput, 'Password123')

    // Check that requirements are marked as met (✓ instead of •)
    const requirements = screen.getByText('Password Requirements:').parentElement
    expect(requirements?.textContent).toContain('✓')
  })

  it('calls onSubmit with correct data when form is submitted', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText('Current Password'), 'oldPassword123')
    await user.type(screen.getByLabelText('New Password'), 'NewPassword123')
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewPassword123')

    await user.click(screen.getByRole('button', { name: 'Change Password' }))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      currentPassword: 'oldPassword123',
      newPassword: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    })
  })

  it('displays validation errors from props', () => {
    const validationErrors = {
      currentPassword: 'Current password is incorrect',
      newPassword: 'Password does not meet requirements',
    }

    render(<PasswordChangeForm onSubmit={mockOnSubmit} validationErrors={validationErrors} />)

    expect(screen.getByText('Current password is incorrect')).toBeInTheDocument()
    expect(screen.getByText('Password does not meet requirements')).toBeInTheDocument()
  })

  it('shows cancel button when onCancel is provided', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('calls onCancel when cancel button is clicked', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  it('prevents form submission when loading', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} isLoading={true} />)

    const form = screen.getByRole('button', { name: 'Changing Password...' }).closest('form')
    if (form) {
      fireEvent.submit(form)
    }

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('includes security tip', () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} />)

    expect(screen.getByText('Security Tip')).toBeInTheDocument()
    expect(screen.getByText(/Use a unique password that you don't use for other accounts/)).toBeInTheDocument()
  })

  it('works without current password requirement', async () => {
    render(<PasswordChangeForm onSubmit={mockOnSubmit} requireCurrentPassword={false} />)

    await user.type(screen.getByLabelText('New Password'), 'NewPassword123')
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewPassword123')

    const submitButton = screen.getByRole('button', { name: 'Change Password' })
    expect(submitButton).not.toBeDisabled()

    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      currentPassword: '',
      newPassword: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    })
  })
})