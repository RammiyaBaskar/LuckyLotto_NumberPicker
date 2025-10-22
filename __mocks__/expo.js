// __mocks__/expo.js
module.exports = {
  Constants: { manifest: { version: "1.0.0" } },
  registerRootComponent: jest.fn(),
  AppLoading: () => null,
  
};
console.log("✅ Expo mock loaded");