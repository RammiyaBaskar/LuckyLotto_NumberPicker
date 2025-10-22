module.exports = {
  preset: "jest-expo",
   testEnvironment: 'node',
     setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/jest.setup.js",
  ],
  //  setupFilesAfterEnv: [
  //   "@testing-library/jest-native/extend-expect",
  //   "<rootDir>/jest.setup.js"
  // ],
  // ✅ add this ignore rule:
  modulePathIgnorePatterns: ["<rootDir>/node_modules/expo/src/winter"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|expo|expo-router|expo-constants|expo-modules-core|@expo)/)",
  ],
  // transformIgnorePatterns: [
  //   'node_modules/(?!(jest-)?@?react-native|@expo|expo(nent)?|@expo(nent)?/.*|expo-router|@react-navigation|react-clone-referenced-element)',
  // ],
  //   transformIgnorePatterns: [
  //   "node_modules/(?!(expo|expo-router|expo-constants|react-native|@react-native|@expo|@react-navigation)/)",
  // ],
//   transformIgnorePatterns: [
//   "node_modules/(?!(react-native|@react-native|@react-navigation|expo|expo-router|expo-constants|expo-modules-core|@expo)/)",
// ],
  //setupFilesAfterEnv: ["<rootDir>/jest.setup.js",'@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    "^expo$": "<rootDir>/__mocks__/expo.js",
    "^@/(.*)$": "<rootDir>/$1",
    
  },
   moduleDirectories: ["node_modules","<rootDir>/__mocks__"],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  testEnvironment: "jsdom",
  clearMocks: true,
   transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // ✅ ensure TS/JS are transpiled
  },
};