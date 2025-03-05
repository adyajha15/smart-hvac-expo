import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native"
import WeatherCard from "./weather-card"

interface WeatherData {
  temperature: string | number
  humidity: string | number
  windSpeed: string | number
  precipitation: string | number
}

interface WeatherSectionProps {
  weatherData: WeatherData
  isLoading: boolean
}

const WeatherSection = ({ weatherData, isLoading }: WeatherSectionProps) => {
  const weatherItems = [
    {
      key: "temperature",
      title: "Temperature",
      value: weatherData.temperature,
      unit: "°C",
      iconName: "thermometer-outline",
    },
    {
      key: "humidity",
      title: "Humidity",
      value: weatherData.humidity,
      unit: "%",
      iconName: "water-outline",
    },
    {
      key: "windSpeed",
      title: "Wind Speed",
      value: weatherData.windSpeed,
      unit: "km/h",
      iconName: "speedometer-outline",
    },
    {
      key: "precipitation",
      title: "Precipitation",
      value: weatherData.precipitation,
      unit: "mm",
      iconName: "rainy-outline",
    },
  ]

  return (
    <View style={styles.weatherContainer}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {weatherItems.map((item) => (
            <WeatherCard
              key={item.key}
              title={item.title}
              value={item.value}
              unit={item.unit}
              iconName={item.iconName}
              isLoading={isLoading}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  weatherContainer: {
    marginTop: 20,
    height: 160,
    padding: 10,
  },
  scrollContent: {
    paddingHorizontal: 5,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default WeatherSection

