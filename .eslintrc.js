module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "ignorePatterns": [".eslintrc.js"],
    "rules": {
      semi: ["error", "never"],
      "comma-dangle": ["error", "only-multiline"],
      "space-before-function-paren": ["error", {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
      }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      camelcase: 'off',
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/space-before-function-paren": ["error", {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
      }],
    }
}
