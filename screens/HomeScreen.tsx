"use client"

import { useState, useEffect } from "react"
import { Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, View, Button, Switch } from "react-native"
import axios from "axios"
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package

// Import our custom components
import ACPicker from "./ac-picker"

const HomeScreen = () => {
  const [selectedAC, setSelectedAC] = useState("1")
  const [acUnits, setAcUnits] = useState([
    { id: "1", name: "Training Room AC", temp: 22, mode: "Cool", isOn: true },
    { id: "2", name: "Meeting Room AC", temp: 24, mode: "Heat", isOn: false },
    { id: "3", name: "Conference Hall AC", temp: 23, mode: "Fan", isOn: true },
  ]);

  const [weatherData, setWeatherData] = useState({
    temperature: '33 °C / 16 °C',
    humidity: '16 %',
    windSpeed: '0 km/h',
    precipitation: '0 mm',
    forecast: 'Expect a bright, sunny day with low humidity and a mild breeze.',
    sunrise: '06:39 AM',
    sunset: '06:24 PM',
  });

  const fetchWeatherData = async () => {
    const latitude = '28.7041'; // Example latitude for New Delhi
    const longitude = '77.1025'; // Example longitude for New Delhi
    const apiKey = "YOUR_NEW_API_KEY"; // Replace with your new API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Extract relevant data
      const temperature = `${data.main.temp}°C`;
      const humidity = `${data.main.humidity} %`;
      const windSpeed = `${data.wind.speed} km/h`;
      const precipitation = data.rain ? `${data.rain["1h"]} mm` : "0 mm"; 
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const forecast = data.weather[0].description;

      // Update weather data state
      setWeatherData({
        temperature,
        humidity,
        windSpeed,
        precipitation,
        forecast,
        sunrise,
        sunset,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Set hardcoded data if fetching fails
      setWeatherData({
        temperature: '33 °C / 16 °C',
        humidity: '16 %',
        windSpeed: '0 km/h',
        precipitation: '0 mm',
        forecast: 'Expect a bright, sunny day with low humidity and a mild breeze.',
        sunrise: '06:39 AM',
        sunset: '06:24 PM',
      });
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000); // Refresh every 30 minutes
    return () => clearInterval(intervalId);
  }, []);

  const selectedAcUnit = acUnits.find((unit) => unit.id === selectedAC);

  const changeMode = (itemValue: string) => {
    setAcUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedAC ? { ...unit, mode: itemValue } : unit
      )
    );
  };

  const togglePower = () => {
    setAcUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedAC ? { ...unit, isOn: !unit.isOn } : unit
      )
    );
  };

  const adjustTemperature = (change: number) => {
    setAcUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedAC ? { ...unit, temp: unit.temp + change } : unit
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef2f3" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Smart AC Control</Text>

        <ACPicker acUnits={acUnits} selectedAC={selectedAC} onSelectAC={setSelectedAC} />

        {selectedAcUnit && (
          <View style={styles.cardContainer}>
            <Text style={styles.label}>AC Control</Text>
            <View style={styles.row}>
              <Text style={styles.temperatureText}>{selectedAcUnit.temp}°C</Text>
              <View style={styles.buttonContainer}>
                <Button title="+" onPress={() => adjustTemperature(1)} />
                <Button title="-" onPress={() => adjustTemperature(-1)} />
              </View>
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.powerText}>{selectedAcUnit.isOn ? "ON" : "OFF"}</Text>
              <Switch value={selectedAcUnit.isOn} onValueChange={togglePower} />
            </View>

            <Picker selectedValue={selectedAcUnit.mode} onValueChange={changeMode} style={styles.picker}>
              <Picker.Item label="Cool" value="Cool" />
              <Picker.Item label="Heat" value="Heat" />
              <Picker.Item label="Fan" value="Fan" />
            </Picker>
          </View>
        )}

        {/* Real-Time Weather Section with Improved UI */}
        <View style={styles.weatherContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weatherScroll}>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Air Quality Index</Text>
              <Text style={styles.weatherValue}>182</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Temperature</Text>
              <Text style={styles.weatherValue}>{weatherData.temperature}</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Forecast</Text>
              <Text style={styles.weatherValue}>{weatherData.forecast}</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Precipitation</Text>
              <Text style={styles.weatherValue}>{weatherData.precipitation}</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Humidity</Text>
              <Text style={styles.weatherValue}>{weatherData.humidity}</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Wind Speed</Text>
              <Text style={styles.weatherValue}>{weatherData.windSpeed}</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Sunrise</Text>
              <Text style={styles.weatherValue}>{weatherData.sunrise}</Text>
            </View>
            <View style={styles.weatherCard}>
              <Text style={styles.weatherTitle}>Sunset</Text>
              <Text style={styles.weatherValue}>{weatherData.sunset}</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef2f3",
  },
  container: {
    flex: 1,
    backgroundColor: "#eef2f3",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  powerText: {
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: 150,
  },
  weatherContainer: {
    marginTop: 20,
  },
  weatherScroll: {
    paddingVertical: 10,
  },
  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  weatherValue: {
    fontSize: 14,
  },
});

export default HomeScreen;