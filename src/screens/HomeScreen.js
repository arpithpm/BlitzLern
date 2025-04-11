// src/screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../services/supabaseClient";
import { colors, globalStyles } from "../utils/styles";

const practiceOptions = [
  {
    id: "1",
    title: "German Articles",
    description: "Practice der, die, das with common nouns",
    icon: "📚",
    screen: "GermanArticlesPractice",
  },
  // You can add more practice options here later
];

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const renderPracticeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.practiceItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>Blitzlern</Text>
        </View>
        <View style={styles.flagAccent}>
          <View style={globalStyles.flagStripe1} />
          <View style={globalStyles.flagStripe2} />
          <View style={globalStyles.flagStripe3} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Practice German</Text>
        <FlatList
          data={practiceOptions}
          renderItem={renderPracticeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  headerTop: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  flagAccent: {
    flexDirection: "row",
    height: 6,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 3,
    overflow: "hidden",
    width: "40%",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  listContainer: {
    paddingBottom: 20,
  },
  practiceItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.accent + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.grayText,
  },
  signOutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  signOutButtonText: {
    color: colors.white,
    fontWeight: "500",
  },
});
