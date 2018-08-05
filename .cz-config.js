"use strict";

module.exports = {

  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    { value: "style", name: "style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)" },
    { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature" },
    { value: "perf", name: "perf:     A code change that improves performance" },
    { value: "test", name: "test:     Adding missing tests" },
    { value: "chore", name: "chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation" },
    { value: "revert", name: "revert:   Revert to a commit" }
  ],

  scopes: [
    // { name: "exampleScope" },
    // { name: "changeMe" }
    { name: "state" },
    { name: "api" },
    { name: "data-json" },
    { name: "texture" },
    { name: "asset" },
    { name: "shader" },
    { name: "glsl" },
    { name: "render" },
    { name: "redo-undo" },
    { name: "job" },
    { name: "transform" },
    { name: "worker" },
    { name: "render-worker" },
    { name: "basicMaterial" },
    { name: "lightMaterial" },
    { name: "meshRenderer" },
    { name: "instance" },
    { name: "boxGeometry" },
    { name: "customGeometry" },
    { name: "geometry" },
    { name: "light" },
    { name: "gameObject" },
    { name: "microservice" },
    { name: "arraybuffer" },
    { name: "event" },
    { name: "imgui" },
    { name: "camera" },
    { name: "dispose" },
    { name: "detect" }
  ],

  // it needs to match the value for field type. Eg.: "fix"
  scopeOverrides: {
    perf: [
      { name: "compile" }
    ],
    refactor: [
      { name: "duplication" },
      { name: "rename" },
      { name: "too-much" },
      { name: "dead-code" },
      { name: "type" },
      { name: "shader" },
      { name: "code-climate" },
      { name: "microservice" },
      { name: "e2e-test" }
    ],
    test: [
      { name: "pf-test" },
      { name: "render-test" },
      { name: "e2e-test" },
      { name: "unit-test" },
      { name: "unit-integration-test" },
      { name: "integration-test" },
      { name: "run-test" },
      { name: "benchmark-test" },
      { name: "contract" },
      { name: "coverage" }
    ],
    chore: [
      { name: "ci" },
      { name: "merge" },
      { name: "todo" },
      { name: "gulp" },
      { name: "package.json" },
      { name: "publish" },
      { name: "bumped" },
      { name: "code-climate" },
      { name: "readme" },
      { name: "changelog" },
      { name: "npm" }
    ]
  },
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you\"re committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: "Provide a LONGER description of the change (optional). Use " | " to break new line:\n",
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer: "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?"
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};