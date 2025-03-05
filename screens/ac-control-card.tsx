import { View, Text, StyleSheet, Switch, Animated } from "react-native"
import { Button } from "react-native-elements"
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from "@expo/vector-icons"

interface ACUnit {
  id: string
  name: string
  temp: number
  mode: string
  isOn: boolean
}

interface ACControlCardProps {
  acUnit: ACUnit
  animatedValue: Animated.Value
  onUpdateAC: (updates: Partial<ACUnit>) => void
}

const ACControlCard = ({ acUnit, animatedValue, onUpdateAC }: ACControlCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>AC Control</Text>
      <View style={styles.row}>
        <Animated.Text
          style={[
            styles.temperatureText,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          {acUnit.temp}°C
        </Animated.Text>
        <View>
          <Button
            icon={<Ionicons name="add" size={24} color="#007AFF" />}
            type="clear"
            onPress={() => onUpdateAC({ temp: acUnit.temp + 1 })}
          />
          <Button
            icon={<Ionicons name="remove" size={24} color="#007AFF" />}
            type="clear"
            onPress={() => onUpdateAC({ temp: acUnit.temp - 1 })}
          />
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.powerText, { color: acUnit.isOn ? "#4CAF50" : "#F44336" }]}>
          {acUnit.isOn ? "ON" : "OFF"}
        </Text>
        <Switch
          value={acUnit.isOn}
          onValueChange={() => onUpdateAC({ isOn: !acUnit.isOn })}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={acUnit.isOn ? "#007AFF" : "#f4f3f4"}
        />
      </View>
      <View style={styles.modeContainer}>
        <Text style={styles.modeLabel}>Mode:</Text>
        <Picker
          selectedValue={acUnit.mode}
          onValueChange={(newMode) => onUpdateAC({ mode: newMode })}
          style={styles.picker}
        >
          <Picker.Item label="Cool" value="Cool" />
          <Picker.Item label="Heat" value="Heat" />
          <Picker.Item label="Fan" value="Fan" />
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  powerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  modeContainer: {
    marginTop: 10,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
})

export default ACControlCard

