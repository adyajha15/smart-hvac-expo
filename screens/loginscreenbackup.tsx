import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Text } from "react-native-elements";
import { useTheme } from "../components/ThemeContext";
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo

type RootStackParamList = {
  LoginScreen: undefined;
  AdminApp: undefined;
  UserApp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

// Styles defined outside component to prevent recreation on each render
const createStyles = (theme: "dark" | "light") => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme === "dark" ? "#121212" : "#F5F5F7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "bold",
    color: theme === "dark" ? "#FFFFFF" : "#000000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: theme === "dark" ? "#BBBBBB" : "#666666",
    textAlign: "center",
  },
  boxContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  box: {
    backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    padding: 25,
    marginVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme === "dark" ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow effect
  },
  adminBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#4A6FFF",
  },
  userBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#00C853",
  },
  boxContent: {
    marginLeft: 15,
    flex: 1,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme === "dark" ? "#FFFFFF" : "#000000",
    marginBottom: 4,
  },
  boxDescription: {
    fontSize: 14,
    color: theme === "dark" ? "#BBBBBB" : "#666666",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  adminIconContainer: {
    backgroundColor: theme === "dark" ? "#2A3C85" : "#E8EEFF",
  },
  userIconContainer: {
    backgroundColor: theme === "dark" ? "#00632B" : "#E6F7ED",
  },
});

const LoginScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  // Animation values for press feedback
  const adminScale = React.useRef(new Animated.Value(1)).current;
  const userScale = React.useRef(new Animated.Value(1)).current;

  const handleLogin = (userType: "admin" | "user") => {
    // Fixed navigation destination to match type definition
    navigation.navigate(userType === "admin" ? "AdminApp" : "UserApp");
  };

  const animatePress = (scale: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Please select your account type to continue</Text>
      
      <View style={styles.boxContainer}>
        <Animated.View style={{ transform: [{ scale: adminScale }] }}>
          <TouchableOpacity
            style={[styles.box, styles.adminBox]}
            onPress={() => animatePress(adminScale, () => handleLogin("admin"))}
            activeOpacity={0.9}
            accessible={true}
            accessibilityLabel="Admin Login"
            accessibilityHint="Tap to login as administrator"
          >
            <View style={[styles.iconContainer, styles.adminIconContainer]}>
              <Feather name="shield" size={24} color={theme === "dark" ? "#FFFFFF" : "#4A6FFF"} />
            </View>
            <View style={styles.boxContent}>
              <Text style={styles.boxTitle}>Admin Login</Text>
              <Text style={styles.boxDescription}>Access administrative controls</Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme === "dark" ? "#777777" : "#BBBBBB"} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: userScale }] }}>
          <TouchableOpacity
            style={[styles.box, styles.userBox]}
            onPress={() => animatePress(userScale, () => handleLogin("user"))}
            activeOpacity={0.9}
            accessible={true}
            accessibilityLabel="User Login"
            accessibilityHint="Tap to login as regular user"
          >
            <View style={[styles.iconContainer, styles.userIconContainer]}>
              <Feather name="user" size={24} color={theme === "dark" ? "#FFFFFF" : "#00C853"} />
            </View>
            <View style={styles.boxContent}>
              <Text style={styles.boxTitle}>User Login</Text>
              <Text style={styles.boxDescription}>Access your personal account</Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme === "dark" ? "#777777" : "#BBBBBB"} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default LoginScreen;