// src/services/germanNounsService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Default nouns to use if no saved data exists
const defaultNouns = [
  { article: "der", noun: "Mann", translation: "man", gender: "masculine" },
  { article: "die", noun: "Frau", translation: "woman", gender: "feminine" },
  { article: "das", noun: "Kind", translation: "child", gender: "neuter" },
  { article: "der", noun: "Tisch", translation: "table", gender: "masculine" },
  { article: "die", noun: "Lampe", translation: "lamp", gender: "feminine" },
  { article: "das", noun: "Buch", translation: "book", gender: "neuter" },
  { article: "der", noun: "Stuhl", translation: "chair", gender: "masculine" },
  { article: "die", noun: "Tür", translation: "door", gender: "feminine" },
  { article: "das", noun: "Fenster", translation: "window", gender: "neuter" },
  {
    article: "der",
    noun: "Computer",
    translation: "computer",
    gender: "masculine",
  },
];

// Storage key
const STORAGE_KEY = "@blitzlern:germanNouns";

// Get all nouns from storage, or use defaults if none exist
export const getGermanNouns = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    } else {
      // If no stored data, save and return defaults
      await saveGermanNouns(defaultNouns);
      return defaultNouns;
    }
  } catch (error) {
    console.error("Error reading nouns from storage:", error);
    return defaultNouns;
  }
};

// Save nouns to storage
export const saveGermanNouns = async (nouns) => {
  try {
    const jsonValue = JSON.stringify(nouns);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error("Error saving nouns to storage:", error);
    return false;
  }
};

// Add a new noun to storage
export const addGermanNoun = async (newNoun) => {
  try {
    const currentNouns = await getGermanNouns();
    const updatedNouns = [...currentNouns, newNoun];
    await saveGermanNouns(updatedNouns);
    return updatedNouns;
  } catch (error) {
    console.error("Error adding noun to storage:", error);
    return null;
  }
};

// Delete a noun from storage by its noun property
export const deleteGermanNoun = async (nounToDelete) => {
  try {
    const currentNouns = await getGermanNouns();
    const updatedNouns = currentNouns.filter(
      (item) => item.noun !== nounToDelete
    );
    await saveGermanNouns(updatedNouns);
    return updatedNouns;
  } catch (error) {
    console.error("Error deleting noun from storage:", error);
    return null;
  }
};

// Reset to default nouns
export const resetToDefaultNouns = async () => {
  try {
    await saveGermanNouns(defaultNouns);
    return defaultNouns;
  } catch (error) {
    console.error("Error resetting to default nouns:", error);
    return null;
  }
};
