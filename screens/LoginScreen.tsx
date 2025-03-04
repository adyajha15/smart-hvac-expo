import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Text } from "react-native-elements";
import { useTheme } from "../components/ThemeContext";
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  LoginScreen: undefined;
  AdminApp: undefined;
  UserApp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  
  // Hardcoded bearer token
  const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuYW1lIiwiZXhwIjoxNzQxMDk2NjE3fQ.EADT8aJJoCajAk3FB4iCDRU1QPwoYq9FfuW6obKb9Qk";

  // Function to handle login
  const handleLogin = async (userType: "admin" | "user") => {
    try {
      // Store the hardcoded token in AsyncStorage
      await AsyncStorage.setItem('authToken', hardcodedToken);
      console.log("Token stored successfully. Navigating...");
      navigation.navigate(userType === "admin" ? "AdminApp" : "UserApp");
    } catch (error) {
      console.error("Error storing token:", error);
      Alert.alert('Login Failed', "An error occurred while storing the token.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: "bold",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    input: {
      width: "80%",
      height: 50,
      borderColor: "#888",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      backgroundColor: theme === "dark" ? "#222222" : "#F5F5F5",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    boxContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 10,
    },
    box: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#333333" : "#DDDDDD",
      padding: 30,
      margin: 10,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // For Android shadow effect
    },
    boxText: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box} onPress={() => handleLogin("admin")}>
          <Text style={styles.boxText}>Admin Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => handleLogin("user")}>
          <Text style={styles.boxText}>User  Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;