"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Text, ScrollView, StyleSheet, Animated, StatusBar, SafeAreaView } from "react-native"
import axios from "axios"

// Import our custom components
import ACPicker from "./ac-picker"
import ACControlCard from "./ac-control-card"
import WeatherSection from "./weather-section"

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

  const animatedValue = new Animated.Value(0);
  
  const animateChange = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const updateACUnit = (updates) => {
    setAcUnits((prevUnits) => prevUnits.map((unit) => (unit.id === selectedAC ? { ...unit, ...updates } : unit)))
    animateChange()
  }

  const fetchWeatherData = async () => {
    const latitude = '28.7041'; // Example latitude for New Delhi
    const longitude = '77.1025'; // Example longitude for New Delhi
    const apiKey = "392a8c123c738bc4bc7bfdc51f41d2db";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const currentWeather = data.current_weather;
      const hourlyWeather = data.hourly;

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
  }, [])

  useEffect(() => {
    fetchWeatherData()

    // Optional: Set up a refresh interval for weather data
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000) // Refresh every 30 minutes

    return () => clearInterval(intervalId)
  }, [fetchWeatherData])

  const selectedAcUnit = acUnits.find((unit) => unit.id === selectedAC)

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
            <View>
              <Button icon={<Ionicons name="add" size={24} />} type="clear" onPress={() => adjustTemperature(1)} />
              <Button icon={<Ionicons name="remove" size={24} />} type="clear" onPress={() => adjustTemperature(-1)} />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.powerText}>{selectedAcUnit.isOn ? "ON" : "OFF"}</Text>
            <Switch value={selectedAcUnit.isOn} onValueChange={togglePower} />
          </View>

          <Picker selectedValue={selectedAcUnit.mode} onValueChange={(itemValue) => changeMode(itemValue)} style={styles.picker}>
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
})

export default HomeScreen

