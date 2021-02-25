module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    'vue/html-self-closing': [ 'error', 'never' ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: 1
      }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true
      }
    ],
    'space-before-function-paren': ['error', 'never'],
    'no-param-reassign': ['error']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
