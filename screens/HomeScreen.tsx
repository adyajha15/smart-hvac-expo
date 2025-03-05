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
    { id: "1", name: "AC 1", temp: 22, mode: "Cool", isOn: true },
    { id: "2", name: "AC 2", temp: 24, mode: "Heat", isOn: false },
    { id: "3", name: "AC 3", temp: 23, mode: "Fan", isOn: true },
  ])

  const [weatherData, setWeatherData] = useState({
    temperature: "--",
    humidity: "--",
    windSpeed: "--",
    precipitation: "--",
  })

  const [isLoading, setIsLoading] = useState(true)
  const animatedValue = useRef(new Animated.Value(0)).current

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

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true)
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=28.7041&longitude=77.1025&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation`
      const { data } = await axios.get(url)

      setWeatherData({
        temperature: data.current_weather.temperature,
        humidity: data.hourly.relativehumidity_2m[0],
        windSpeed: data.hourly.windspeed_10m[0],
        precipitation: data.hourly.precipitation[0],
      })
    } catch (error) {
      console.error("Weather API Error:", error)
      // Keep the placeholder values on error
    } finally {
      setIsLoading(false)
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
          <ACControlCard acUnit={selectedAcUnit} animatedValue={animatedValue} onUpdateAC={updateACUnit} />
        )}

        <WeatherSection weatherData={weatherData} isLoading={isLoading} />
      </ScrollView>
    </SafeAreaView>
  )
}

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

