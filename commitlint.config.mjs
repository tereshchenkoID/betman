const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature for the user
        'fix',      // Bug fix
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'style',    // Formatting, styles, SCSS adjustments (no code logic changes)
        'docs',     // Documentation changes
        'chore',    // Maintenance tasks, updates, config changes
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'revert'    // Reverting a previous commit
      ]
    ],
    // Require both type and subject
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100]
  }
}

export default Configuration
