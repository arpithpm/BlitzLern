import { StyleSheet } from "react-native";

// Shared color palette
export const colors = {
  primary: "#1e3a8a", // Deep blue
  accent: "#ffd700", // Gold
  black: "#000000",
  red: "#DD0000",
  gold: "#FFCE00",
  white: "#FFFFFF",
  grayLight: "#f3f4f6",
  grayText: "#666666",
  grayDark: "#444444",
  textPrimary: "#111111",
};

// Shared styles that can be reused across screens
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  logoText: {
    fontSize: 42,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: "#e5e7eb",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayText,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.grayDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.grayLight,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  eyeIcon: {
    padding: 10,
  },
  passwordHint: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.accent + "aa",
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: colors.grayText,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "600",
  },
  germanFlagAccent: {
    flexDirection: "row",
    height: 6,
    marginTop: 30,
    borderRadius: 3,
    overflow: "hidden",
  },
  flagStripe1: {
    flex: 1,
    backgroundColor: colors.black,
  },
  flagStripe2: {
    flex: 1,
    backgroundColor: colors.red,
  },
  flagStripe3: {
    flex: 1,
    backgroundColor: colors.gold,
  },
});
