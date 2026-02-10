export const validators = {
  email: (email: string): string | null => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
    return null;
  },
  password: (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Minimum 8 characters';
    if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Include at least one number';
    return null;
  },
  confirmPassword: (password: string, confirm: string): string | null => {
    if (!confirm) return 'Please confirm your password';
    if (password !== confirm) return 'Passwords do not match';
    return null;
  },
  displayName: (name: string): string | null => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return null;
  },
};
