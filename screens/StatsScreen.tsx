import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useTheme } from "../components/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
        return [
          { time: "1H", value: 22 },
          { time: "6H", value: 24 },
          { time: "12H", value: 23 },
          { time: "1D", value: 21 },
          { time: "1W", value: 20 },
        ];
      case "Outdoor vs. Indoor Temp":
        return [
          { time: "Mon", outdoor: 30, indoor: 22 },
          { time: "Tue", outdoor: 32, indoor: 23 },
          { time: "Wed", outdoor: 31, indoor: 24 },
          { time: "Thu", outdoor: 29, indoor: 23 },
          { time: "Fri", outdoor: 28, indoor: 22 },
        ];
      case "Cost Saved":
      default:
        return [
          { time: "Jan", value: 2000 },
          { time: "Feb", value: 4500 },
          { time: "Mar", value: 2800 },
          { time: "Apr", value: 8000 },
          { time: "May", value: 9900 },
          { time: "Jun", value: 4300 },
        ];
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Timeframe Selection */}
      <View style={styles.toggleContainer}>
        {["Weekly", "Monthly", "Yearly"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.toggleButton, selectedTimeFrame === option && styles.selectedButton]}
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
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getChartData(title)}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={title === "Outdoor vs. Indoor Temp" ? "outdoor" : "value"} stroke="#FF6384" strokeWidth={2} />
              {title === "Outdoor vs. Indoor Temp" && (
                <Line type="monotone" dataKey="indoor" stroke="#36A2EB" strokeWidth={2} />
              )}
            </LineChart>
          </ResponsiveContainer>
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
    width: "100%",
    height: 250,
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
