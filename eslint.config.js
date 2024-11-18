import prettier from 'eslint-config-prettier'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import pluginImportX from 'eslint-plugin-import-x'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        projectService: true
      }
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/return-await': ['error', 'always'],
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/await-thenable': 'error',

      eqeqeq: ['error', 'always'],
      'import-x/no-cycle': 'error',
      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: false
          },
          groups: [
            'index',
            'sibling',
            'parent',
            'internal',
            'external',
            'builtin',
            'object',
            'type'
          ],
          'newlines-between': 'never'
        }
      ],
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^\\$lib', '^\\$app', '^\\$env']
        }
      ],
      'import-x/no-relative-packages': 'error', // Don't allow packages to have relative imports between each other
      'func-style': [2, 'expression'],
      'no-return-await': 'off',
      'svelte/no-at-html-tags': 'off',
      'svelte/button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: true
        }
      ]
    },
    settings: {
      'import-x/extensions': ['.ts'],
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts']
      },
      'import-x/resolver': {
        typescript: {
          project: ['./ui/tsconfig.json']
        }
      }
    },
    plugins: {
      'import-x': pluginImportX
    }
  },
  {
    files: ['**/*.svelte'],
    ...ts.configs.disableTypeChecked
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    ignores: [
      '**/node_modules',
      '**/butler/target',
      '**/build',
      '**/dist',
      '**/.svelte-kit',
      '**/package',
      '**/.env',
      '**/.env.*',
      '!**/.env.example',
      '**/bun.lockb',
      '.github',
      '.vscode',
      '**/eslint.config.js',
      '**/svelte.config.js',
      '**/.pnpm-store',
      '**/vite.config.ts.timestamp-*',
      'target/'
    ]
  }
)
