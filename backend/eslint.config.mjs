import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "error",
      "eqeqeq": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "never",
        },
      ],
      "func-style":["error","declaration"],
        "@typescript-eslint/no-unsafe-member-access":"error",
        "@typescript-eslint/no-unsafe-assignment":"error",
        "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }]
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

