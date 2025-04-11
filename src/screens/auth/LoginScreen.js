import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../services/supabaseClient";
import { globalStyles } from "../../utils/styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Navigate to home screen or handle successful login
      Alert.alert("Success", "You have successfully logged in!");
      // navigation.navigate('Home'); // Uncomment this when navigation is set up
    } catch (error) {
      Alert.alert("Error", error?.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen or show a prompt
    Alert.alert(
      "Reset Password",
      "Enter your email to receive a password reset link:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: (text) => {
            // Handle password reset
            Alert.alert(
              "Feature coming soon",
              "Password reset will be implemented in the next update."
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={globalStyles.keyboardAvoidingView}
      >
        <View style={globalStyles.header}>
          <View style={globalStyles.logoContainer}>
            <Text style={globalStyles.logoText}>⚡</Text>
          </View>
          <Text style={globalStyles.appName}>Blitzlern</Text>
          <Text style={globalStyles.tagline}>
            Learn German at lightning speed
          </Text>
        </View>

        <View style={globalStyles.formContainer}>
          <Text style={globalStyles.title}>Welcome Back!</Text>
          <Text style={globalStyles.subtitle}>
            Log in to continue your German journey
          </Text>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Email</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Password</Text>
            <View style={globalStyles.passwordContainer}>
              <TextInput
                style={globalStyles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={globalStyles.eyeIcon}
                disabled={loading}
              >
                <Text>{isPasswordVisible ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={{ alignSelf: "flex-end", marginBottom: 20 }}
          >
            <Text style={{ color: globalStyles.loginLink.color }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              globalStyles.button,
              loading && globalStyles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={globalStyles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <View style={globalStyles.footer}>
            <Text style={globalStyles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignup} disabled={loading}>
              <Text style={globalStyles.loginLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={globalStyles.germanFlagAccent}>
          <View style={globalStyles.flagStripe1} />
          <View style={globalStyles.flagStripe2} />
          <View style={globalStyles.flagStripe3} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
