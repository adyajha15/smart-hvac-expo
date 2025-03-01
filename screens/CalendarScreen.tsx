"use client";

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../components/ThemeContext";
import { Easing } from "react-native-reanimated";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

  const energyData = [
    { time: "12 AM", value: 30 },
    { time: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), value: 60 },
  ];

  const costData = [
    { time: "12 AM", value: 5 },
    { time: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), value: 15 },
  ];

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
      width: "100%",
      height: 250,
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

        {/* Energy Efficiency Chart */}
        <View style={styles.graphContainer}>
          <Text style={styles.sectionTitle}>Energy Efficiency</Text>
          <ResponsiveContainer width="90%" height="100%">
            <LineChart data={energyData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#BB86FC" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </View>

        {/* Cost Saved Chart */}
        <View style={styles.graphContainer}>
          <Text style={styles.sectionTitle}>Cost Saved</Text>
          <ResponsiveContainer width="90%" height="100%">
            <LineChart data={costData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#BB86FC" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
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
