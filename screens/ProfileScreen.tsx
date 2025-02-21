import React from "react";
import { View, StyleSheet, ScrollView, Text as RNText, Switch as RNSwitch, TouchableOpacity } from "react-native";
import { useTheme } from "../components/ThemeContext";
import { NavigationProp } from "@react-navigation/native"; // Import NavigationProp for typing

// Define the type for navigation prop
type ProfileScreenNavigationProp = NavigationProp<any>; // Replace `any` with your specific screen name if you have a stack navigator

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp; // Type the navigation prop
}

// ProfileScreen Component
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "#F4F4F4",
      padding: 20,
    },
    section: {
      marginBottom: 25,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 30,
      backgroundColor: theme === "dark" ? "#6200EE" : "#6200EE",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    card: {
      padding: 20,
      borderRadius: 15,
      backgroundColor: theme === "dark" ? "#333" : "#FFFFFF",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme === "dark" ? "#FFF" : "#333",
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      color: theme === "dark" ? "#BBB" : "#333",
      marginBottom: 8,
    },
    rowText: {
      fontSize: 16,
      color: theme === "dark" ? "#BBB" : "#333",
    },
    switch: {
      marginLeft: 10,
    },
    listItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: theme === "dark" ? "#444" : "#ddd",
    },
  });

  const connectedACs = [
    { id: 1, name: "AC 1" },
    { id: 2, name: "AC 2" },
    { id: 3, name: "AC 3" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* User Information Card */}
      <View style={styles.card}>
        <RNText style={styles.headerText}>User Information</RNText>
        <RNText style={styles.text}>Name: John Doe</RNText>
        <RNText style={styles.text}>Email: john.doe@example.com</RNText>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Edit Profile")}>
          <RNText style={styles.buttonText}>Edit Profile</RNText>
        </TouchableOpacity>
      </View>

      {/* HVAC Units Card */}
      <View style={styles.card}>
        <RNText style={styles.headerText}>All HVAC</RNText>
        {connectedACs.map((ac) => (
          <View key={ac.id} style={styles.listItem}>
            <RNText style={styles.rowText}>{ac.name}</RNText>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => console.log("Manage HVAC Units")}>
          <RNText style={styles.buttonText}>Manage HVAC Units</RNText>
        </TouchableOpacity>
      </View>

      {/* Settings Card */}
      <View style={styles.card}>
        <RNText style={styles.headerText}>Settings</RNText>
        <View style={styles.row}>
          <RNText style={styles.rowText}>Dark Mode</RNText>
          <RNSwitch value={theme === "dark"} onValueChange={toggleTheme} style={styles.switch} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Change Language")}>
          <RNText style={styles.buttonText}>Change Language</RNText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Clear Cache")}>
          <RNText style={styles.buttonText}>Clear Cache</RNText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Clear History")}>
          <RNText style={styles.buttonText}>Clear History</RNText>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <RNText style={styles.buttonText}>Log Out</RNText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
