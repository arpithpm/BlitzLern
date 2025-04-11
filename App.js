import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthNavigator from "./src/navigation/AuthNavigator";
import HomeScreen from "./src/screens/HomeScreen";
import GermanArticlesPracticeScreen from "./src/screens/practice/GermanArticlesPracticeScreen";
import { supabase } from "./src/services/supabaseClient";

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up an auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setLoading(false);
      }
    );

    // Check for existing session on app load
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
      setLoading(false);
    };

    checkSession();

    // Clean up the subscription when component unmounts
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    // You could display a loading screen here if needed
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session ? (
            // User is signed in, show main app
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="GermanArticlesPractice"
                component={GermanArticlesPracticeScreen}
              />
            </>
          ) : (
            // No user signed in, show authentication screens
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
