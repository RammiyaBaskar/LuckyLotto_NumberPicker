jest.mock("expo", () => ({})); // <--- add this FIRST
// jest.setup.js
import "react-native-gesture-handler/jestSetup";
// ✅ Mock NativeAnimatedHelper safely (for all RN versions)
try {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
} catch (e) {
  console.warn("⚠️ Skipping NativeAnimatedHelper mock — not found in this RN version");
}



jest.mock('expo-modules-core', () => ({}));
jest.mock('expo-constants', () => ({
  default: { manifest: { version: '1.0.0' } },
  
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
  useLocalSearchParams: jest.fn(() => ({})),
  Link: ({ children }) => children,
}));
 


