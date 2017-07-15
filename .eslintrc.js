module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  extends: ["standard", "standard-preact"],
  rules: {
    quotes: [1, "double"],
    "jsx-quotes": [1, "prefer-double"],
    "space-before-function-paren": [1, {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "never"
    }],
  }
}
