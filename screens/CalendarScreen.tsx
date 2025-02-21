"use client"

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../components/ThemeContext";
import { Easing } from "react-native-reanimated";

const CalendarScreen = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#1E1E1E" : "#F5F5F5",
      padding: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      color: theme === "dark" ? "#E0E0E0" : "#333333",
      textAlign: "center",
    },
    button: {
      backgroundColor: theme === "dark" ? "#BB86FC" : "#6200EE",
      padding: 12,
      borderRadius: 8,
      marginVertical: 15,
      alignItems: "center",
      transform: [{ scale: scaleAnim }],
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    graphContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Calendar
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true, selectedColor: "#6200EE" } }}
          theme={{
            backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
            calendarBackground: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
            dayTextColor: theme === "dark" ? "#E0E0E0" : "#333333",
            todayTextColor: theme === "dark" ? "#BB86FC" : "#6200EE",
            selectedDayBackgroundColor: "#6200EE",
            monthTextColor: theme === "dark" ? "#E0E0E0" : "#333333",
          }}
        />

        <Text style={styles.sectionTitle}>Selected Date: {selectedDate}</Text>

        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>Set Time</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowTimePicker(false);
              if (date) setSelectedTime(date);
            }}
          />
        )}

        <View style={styles.graphContainer}>
          <Text style={styles.sectionTitle}>Energy Efficiency</Text>
          <LineChart
            data={{
              labels: ["12 AM", selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })],
              datasets: [{ data: [30, 60] }],
            }}
            width={320}
            height={200}
            chartConfig={{
              backgroundColor: "#6200EE",
              backgroundGradientFrom: "#BB86FC",
              backgroundGradientTo: "#6200EE",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => "#FFFFFF",
            }}
            style={{ borderRadius: 8 }}
          />
        </View>

        <View style={styles.graphContainer}>
          <Text style={styles.sectionTitle}>Cost Saved</Text>
          <LineChart
            data={{
              labels: ["12 AM", selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })],
              datasets: [{ data: [5, 15] }],
            }}
            width={320}
            height={200}
            chartConfig={{
              backgroundColor: "#6200EE",
              backgroundGradientFrom: "#BB86FC",
              backgroundGradientTo: "#6200EE",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => "#FFFFFF",
            }}
            style={{ borderRadius: 8 }}
          />
        </View>

        <Animated.View style={styles.button}>
          <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Text style={styles.buttonText}>Analyze My Data</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default CalendarScreen;
