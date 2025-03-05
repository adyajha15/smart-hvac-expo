import { View, Text, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"

interface ACUnit {
  id: string
  name: string
  temp: number
  mode: string
  isOn: boolean
}

interface ACPickerProps {
  acUnits: ACUnit[]
  selectedAC: string
  onSelectAC: (id: string) => void
}

const ACPicker = ({ acUnits, selectedAC, onSelectAC }: ACPickerProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>Select AC</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedAC} onValueChange={onSelectAC} style={styles.picker}>
          {acUnits.map((unit) => (
            <Picker.Item key={unit.id} label={unit.name} value={unit.id} />
          ))}
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
    marginBottom: 10,
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
})

export default ACPicker

