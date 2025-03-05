import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface WeatherCardProps {
  title: string
  value: string | number
  unit?: string
  iconName: string
  isLoading?: boolean
}

const getIconColor = (title: string) => {
  switch (title.toLowerCase()) {
    case "temperature":
      return "#FF9800"
    case "humidity":
      return "#03A9F4"
    case "wind speed":
      return "#8BC34A"
    case "precipitation":
      return "#673AB7"
    default:
      return "#007AFF"
  }
}

const WeatherCard = ({ title, value, unit = "", iconName, isLoading = false }: WeatherCardProps) => {
  const iconColor = getIconColor(title)

  return (
    <View style={styles.weatherCard}>
      <Ionicons name={iconName} size={32} color={iconColor} style={styles.icon} />
      <Text style={styles.weatherTitle}>{title}</Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <Text style={[styles.weatherValue, { color: iconColor }]}>
          {value}
          <Text style={styles.unit}>{unit}</Text>
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  weatherCard: {
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 8,
  },
  weatherTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#555",
    textTransform: "capitalize",
  },
  weatherValue: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
  unit: {
    fontSize: 14,
    fontWeight: "normal",
  },
})

export default WeatherCard

