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

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert(
        "Check your email",
        "We sent you a confirmation email. Please check your inbox and confirm your account.",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Error", error?.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
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
          <Text style={globalStyles.title}>Willkommen!</Text>
          <Text style={globalStyles.subtitle}>
            Create your account to start learning
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
                placeholder="Create a password"
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
            <Text style={globalStyles.passwordHint}>
              Password must be at least 8 characters
            </Text>
          </View>

          <TouchableOpacity
            style={[
              globalStyles.button,
              loading && globalStyles.buttonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={globalStyles.buttonText}>Start Learning Now</Text>
            )}
          </TouchableOpacity>

          <View style={globalStyles.footer}>
            <Text style={globalStyles.footerText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={navigateToLogin} disabled={loading}>
              <Text style={globalStyles.loginLink}>Log In</Text>
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
