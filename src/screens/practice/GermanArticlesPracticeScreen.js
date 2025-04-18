// src/screens/practice/GermanArticlesPracticeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors, globalStyles } from "../../utils/styles";
import { getGermanNouns } from "../../services/germanNounsService";

export default function GermanArticlesPracticeScreen({ navigation }) {
  const [nouns, setNouns] = useState([]);
  const [currentNoun, setCurrentNoun] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load nouns when component mounts
  useEffect(() => {
    loadNouns();
  }, []);

  // Load nouns from local storage
  const loadNouns = async () => {
    try {
      setLoading(true);
      const savedNouns = await getGermanNouns();
      setNouns(savedNouns);
      setLoading(false);
      getNextNoun(savedNouns);
    } catch (error) {
      console.error("Error loading nouns:", error);
      setLoading(false);
    }
  };

  const getNextNoun = (nounsArray = nouns) => {
    // Make sure we have nouns to choose from
    if (nounsArray.length === 0) return;

    // Reset display states
    setShowResult(false);
    setSelectedArticle(null);

    // Get a random noun
    const randomIndex = Math.floor(Math.random() * nounsArray.length);
    setCurrentNoun(nounsArray[randomIndex]);
  };

  const handleArticleSelection = (article) => {
    setSelectedArticle(article);
    setShowResult(true);
    setQuestionCount(questionCount + 1);

    if (article === currentNoun.article) {
      setScore(score + 1);
    }
  };

  const getButtonStyle = (article) => {
    // Base style with appropriate color based on the article
    const baseStyle = [
      styles.articleButton,
      {
        backgroundColor:
          article === "der"
            ? "#add8e6"
            : article === "die"
            ? "#ffb6c1"
            : "#98fb98",
      },
    ];

    if (showResult) {
      // If showing results and this is the correct article, highlight it
      if (article === currentNoun.article) {
        baseStyle.push({
          backgroundColor: "#4CAF50",
          borderWidth: 2,
          borderColor: "#2E7D32",
        });
      }
      // If this is not the correct answer and not the selected one, grey it out
      else if (article !== selectedArticle) {
        baseStyle.push(styles.disabledIncorrectButton);
      }
      // If this is the incorrectly selected answer
      else if (article === selectedArticle) {
        baseStyle.push({
          backgroundColor: "#F44336",
          borderWidth: 2,
          borderColor: "#C62828",
        });
      }
    }

    return baseStyle;
  };

  const getTextStyle = (article) => {
    if (
      showResult &&
      article !== currentNoun.article &&
      article !== selectedArticle
    ) {
      return [styles.articleButtonText, styles.disabledText];
    }
    return styles.articleButtonText;
  };

  const getGenderTextStyle = (article) => {
    if (
      showResult &&
      article !== currentNoun.article &&
      article !== selectedArticle
    ) {
      return [styles.genderSmallText, styles.disabledText];
    }
    return styles.genderSmallText;
  };

  const resetPractice = () => {
    setScore(0);
    setQuestionCount(0);
    getNextNoun();
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={colors.white} />
        <Text style={styles.loadingText}>Loading nouns...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>German Articles</Text>
        <Text style={styles.score}>
          {score}/{questionCount}
        </Text>
      </View>

      <View style={styles.content}>
        {currentNoun ? (
          <>
            <View style={styles.nounCard}>
              <Text style={styles.nounText}>{currentNoun.noun}</Text>
              <Text style={styles.translationText}>
                {showResult ? `"${currentNoun.translation}"` : "?"}
              </Text>

              {showResult && (
                <View style={styles.resultContainer}>
                  <Text
                    style={[
                      styles.resultText,
                      {
                        color:
                          selectedArticle === currentNoun.article
                            ? "#4CAF50"
                            : "#F44336",
                      },
                    ]}
                  >
                    {selectedArticle === currentNoun.article
                      ? "Correct! ✓"
                      : `Incorrect ✗. It's ${currentNoun.article}`}
                  </Text>
                  <Text style={styles.genderText}>({currentNoun.gender})</Text>
                </View>
              )}
            </View>

            <View style={styles.articlesContainer}>
              <TouchableOpacity
                style={getButtonStyle("der")}
                onPress={() => handleArticleSelection("der")}
                disabled={showResult}
              >
                <Text style={getTextStyle("der")}>der</Text>
                <Text style={getGenderTextStyle("der")}>(masculine)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("die")}
                onPress={() => handleArticleSelection("die")}
                disabled={showResult}
              >
                <Text style={getTextStyle("die")}>die</Text>
                <Text style={getGenderTextStyle("die")}>(feminine)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("das")}
                onPress={() => handleArticleSelection("das")}
                disabled={showResult}
              >
                <Text style={getTextStyle("das")}>das</Text>
                <Text style={getGenderTextStyle("das")}>(neuter)</Text>
              </TouchableOpacity>
            </View>

            {showResult && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => getNextNoun()}
              >
                <Text style={styles.nextButtonText}>Next Noun</Text>
              </TouchableOpacity>
            )}

            {questionCount >= 5 && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetPractice}
              >
                <Text style={styles.resetButtonText}>Reset Practice</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No nouns available.</Text>
            <TouchableOpacity style={styles.reloadButton} onPress={loadNouns}>
              <Text style={styles.reloadButtonText}>Reload Nouns</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.white,
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nounCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    marginBottom: 30,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nounText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textPrimary,
  },
  translationText: {
    fontSize: 20,
    color: colors.grayText,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  genderText: {
    fontSize: 16,
    color: colors.grayText,
    marginTop: 5,
  },
  articlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 30,
  },
  articleButton: {
    width: "30%",
    height: 90,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  articleButtonText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  genderSmallText: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 5,
  },
  disabledButton: {
    opacity: 0.8,
  },
  disabledIncorrectButton: {
    opacity: 0.4,
  },
  disabledText: {
    opacity: 0.5,
  },
  nextButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
  },
  resetButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.grayText,
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  reloadButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});
