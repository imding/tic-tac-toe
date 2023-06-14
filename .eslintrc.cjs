// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: [
                'plugin:@typescript-eslint/recommended-requiring-type-checking'
            ],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.json')
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json')
    },
    plugins: ['@typescript-eslint'],
    extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'type-imports',
                fixStyle: 'separate-type-imports'
            }
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'comma-dangle': ['error', 'never'],
        'curly': ['error', 'all'],
        'eol-last': ['error', 'always'],
        'indent': ['error', 4],
        'jsx-quotes': ['error', 'prefer-single'],
        'quotes': ['error', 'single'],
        'react/jsx-key': ['error', { 'warnOnDuplicates': true, 'checkKeyMustBeforeSpread': true, 'checkFragmentShorthand': true }],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'semi': ['error', 'never'],
        'sort-imports': [
            'error',
            {
                'ignoreCase': true,
                'ignoreDeclarationSort': false,
                'ignoreMemberSort': false,
                'memberSyntaxSortOrder': ['none', 'all', 'single', 'multiple'],
                'allowSeparatedGroups': true
            }
        ],
        'quote-props': ['error', 'consistent']
    }
}

module.exports = config
