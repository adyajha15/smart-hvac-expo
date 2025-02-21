import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../components/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

type ChartType = "Room Temp Over Time" | "Outdoor vs. Indoor Temp" | "Cost Saved";

const chartTypes: ChartType[] = ["Room Temp Over Time", "Outdoor vs. Indoor Temp", "Cost Saved"];

const StatsScreen = () => {
  const { theme } = useTheme();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Weekly");
  const [comfortLevel, setComfortLevel] = useState(50);
  const comfortAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(comfortAnim, {
      toValue: comfortLevel,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [comfortLevel]);

  const getMoodIcon = () => {
    if (comfortLevel < 30) return "sentiment-very-dissatisfied";
    if (comfortLevel < 70) return "sentiment-neutral";
    return "sentiment-very-satisfied";
  };

  const getChartData = (type: ChartType) => {
    switch (type) {
      case "Room Temp Over Time":
        return {
          labels: ["1H", "6H", "12H", "1D", "1W"],
          datasets: [{ data: [22, 24, 23, 21, 20] }],
        };
      case "Outdoor vs. Indoor Temp":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            { data: [30, 32, 31, 29, 28], color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})` }, // Outdoor
            { data: [22, 23, 24, 23, 22], color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})` }, // Indoor
          ],
        };
      case "Cost Saved":
      default:
        return {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{ data: [2000, 4500, 2800, 8000, 9900, 4300] }],
        };
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Timeframe Selection */}
      <View style={styles.toggleContainer}>
        {["Weekly", "Monthly", "Yearly"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.toggleButton,
              selectedTimeFrame === option && styles.selectedButton,
            ]}
            onPress={() => setSelectedTimeFrame(option)}
          >
            <Text style={styles.toggleText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Temperature Boxes */}
      <View style={styles.tempBoxContainer}>
        <View style={styles.tempBox}><Text>🌤️ Outdoor Temp: 30°C</Text></View>
        <View style={styles.tempBox}><Text>🏠 Indoor Temp: 22°C</Text></View>
      </View>

      {/* Charts */}
      {chartTypes.map((title) => (
        <View key={title} style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <LineChart
            data={getChartData(title)}
            width={Dimensions.get("window").width - 40}
            height={250}
            yAxisLabel={title === "Cost Saved" ? "₹" : ""}
            yAxisSuffix={title.includes("Temp") ? "°C" : ""}
            chartConfig={{
              backgroundGradientFrom: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
              backgroundGradientTo: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              decimalPlaces: 0,
            }}
            bezier
            style={styles.chart}
          />
        </View>
      ))}

      {/* Comfort Meter */}
      <Text style={styles.sectionTitle}>Comfort Meter</Text>
      <View style={styles.thermometerContainer}>
        <View style={styles.thermometer}>
          <Animated.View
            style={[
              styles.thermometerFill,
              { height: comfortAnim.interpolate({ inputRange: [0, 100], outputRange: [0, 200] }) },
            ]}
          />
        </View>
        <MaterialIcons name={getMoodIcon()} size={40} color="#ff5733" style={styles.moodIcon} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ff5733" }}>
          Comfort Level: {Math.round(comfortLevel)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#36A2EB",
  },
  selectedButton: {
    backgroundColor: "#0056b3",
  },
  toggleText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  tempBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tempBox: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  thermometerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  thermometer: {
    width: 50,
    height: 200,
    borderRadius: 25,
    backgroundColor: "#ddd",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#333",
  },
  thermometerFill: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ff5733",
  },
  moodIcon: {
    fontSize: 40,
    marginTop: 10,
  },
});

export default StatsScreen;
