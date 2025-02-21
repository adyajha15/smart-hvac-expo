"use client"

import { useState } from "react"
import { View, ScrollView, TextStyle, ViewStyle } from "react-native"
import { Button, Text, ListItem, Switch } from "react-native-elements"
import { useTheme } from "../components/ThemeContext"
import { Ionicons } from "@expo/vector-icons"

// Define AC unit type with an additional power state
type ACUnit = {
  id: number
  name: string
  temp: number
  energy: number
  power: number
  voltage: number
  current: number
  frequency: number
  isOn: boolean // Power state (on/off)
}

const AdminDashboardScreen = () => {
  const themeContext = useTheme()
  const theme = themeContext?.theme ?? "light"

  const [acUnits, setAcUnits] = useState<ACUnit[]>([
    { id: 1, name: "AC 1", temp: 22, energy: 1.5, power: 1000, voltage: 220, current: 4.5, frequency: 50, isOn: true },
    { id: 2, name: "AC 2", temp: 24, energy: 1.2, power: 800, voltage: 220, current: 3.6, frequency: 50, isOn: true },
    { id: 3, name: "AC 3", temp: 23, energy: 1.8, power: 1200, voltage: 220, current: 5.4, frequency: 50, isOn: false },
  ])

  const adjustTemperature = (id: number, adjustment: number) => {
    setAcUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === id ? { ...unit, temp: unit.temp + adjustment } : unit
      )
    )
  }

  const togglePower = (id: number) => {
    setAcUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === id ? { ...unit, isOn: !unit.isOn } : unit
      )
    )
  }

  return (
    <ScrollView style={styles.container(theme)}>
      <Text style={styles.title(theme)}>Admin Control</Text>

      {/* AC Units Section */}
      <View style={styles.section(theme)}>
        <Text style={styles.subtitle(theme)}>AC Units</Text>
        {acUnits.map((ac) => (
          <ListItem key={ac.id} bottomDivider containerStyle={styles.listItem(theme)}>
            <ListItem.Content>
              <ListItem.Title style={styles.text(theme)}>{ac.name}</ListItem.Title>
              <View style={styles.row}>
                <Text style={styles.text(theme)}>{ac.temp}°C</Text>
                <View style={styles.row}>
                  <Button
                    icon={<Ionicons name="remove" size={24} color={theme === "dark" ? "#fff" : "#000"} />}
                    type="clear"
                    onPress={() => adjustTemperature(ac.id, -1)}
                  />
                  <Button
                    icon={<Ionicons name="add" size={24} color={theme === "dark" ? "#fff" : "#000"} />}
                    type="clear"
                    onPress={() => adjustTemperature(ac.id, 1)}
                  />
                </View>
              </View>

              {/* Space between temperature control and on/off toggle */}
              <View style={{ marginVertical: 10 }} />

              {/* On/Off Toggle */}
              <View style={styles.row}>
                <Text style={styles.text(theme)}>{ac.isOn ? "On" : "Off"}</Text>
                <Switch
                  value={ac.isOn}
                  onValueChange={() => togglePower(ac.id)}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>

      {/* System Overview Section */}
      <View style={styles.section(theme)}>
        <Text style={styles.subtitle(theme)}>System Overview</Text>
        <Text style={styles.text(theme)}>
          Total Energy Consumption: {acUnits.reduce((sum, ac) => sum + ac.energy, 0).toFixed(2)} kWh
        </Text>
        <Text style={styles.text(theme)}>
          Average Temperature: {(acUnits.reduce((sum, ac) => sum + ac.temp, 0) / acUnits.length).toFixed(1)}°C
        </Text>
      </View>
    </ScrollView>
  )
}

// Styles with dynamic theming and additional design improvements
const styles = {
  container: (theme: string): ViewStyle => ({
    flex: 1,
    backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
    padding: 20,
  }),
  title: (theme: string): TextStyle => ({
    fontSize: 24,
    fontWeight: "700" as TextStyle["fontWeight"],
    marginBottom: 20,
    color: theme === "dark" ? "#FFFFFF" : "#000000",
  }),
  section: (theme: string): ViewStyle => ({
    marginBottom: 20,
    backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: theme === "dark" ? "#fff" : "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  }),
  subtitle: (theme: string): TextStyle => ({
    fontSize: 18,
    fontWeight: "600" as TextStyle["fontWeight"],
    color: theme === "dark" ? "#FFFFFF" : "#000000",
    marginBottom: 10,
  }),
  listItem: (theme: string): ViewStyle => ({
    backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    borderRadius: 8,
  }),
  text: (theme: string): TextStyle => ({
    color: theme === "dark" ? "#FFFFFF" : "#000000",
  }),
  row: {
    flexDirection: "row" as ViewStyle["flexDirection"],
    justifyContent: "space-between" as ViewStyle["justifyContent"],
    alignItems: "center" as ViewStyle["alignItems"],
  } as ViewStyle,
}

export default AdminDashboardScreen
