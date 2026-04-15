/* eslint-env node */
module.exports = {
  root: true,
  env: { node: true, es2021: true },
  parserOptions: { ecmaVersion: 2021, sourceType: 'script' }, // CommonJS
  extends: ['eslint:recommended'],
  ignorePatterns: [
    '.eslintrc.cjs',  
    'node_modules/**',
    'lib/**',
  ],
  rules: {
    
  },
}