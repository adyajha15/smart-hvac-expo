"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native"
import { useTheme } from "../components/ThemeContext"
import { DataTable } from "react-native-paper"

const AdminDashboard = () => {
  const { theme } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAC, setSelectedAC] = useState<{ id: number; name: string; temp: number; energy: number; power: number; voltage: number; current: number; frequency: number } | null>(null)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    table: {
      backgroundColor: theme === "dark" ? "#1E1E1E" : "#F0F0F0",
    },
    tableHeader: {
      backgroundColor: theme === "dark" ? "#2C2C2C" : "#E0E0E0",
    },
    tableRow: {
      backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    },
    text: {
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
    button: {
      backgroundColor: theme === "dark" ? "#BB86FC" : "#6200EE",
      padding: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: "#FFFFFF",
      textAlign: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: theme === "dark" ? "#1E1E1E" : "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    },
  })

  const acData = [
    { id: 1, name: "Living Room AC", temp: 22, energy: 1.5, power: 1000, voltage: 220, current: 4.5, frequency: 50 },
    { id: 2, name: "Bedroom AC", temp: 24, energy: 1.2, power: 800, voltage: 220, current: 3.6, frequency: 50 },
    { id: 3, name: "Office AC", temp: 23, energy: 1.8, power: 1200, voltage: 220, current: 5.4, frequency: 50 },
  ]

  const openModal = (ac: { id: number; name: string; temp: number; energy: number; power: number; voltage: number; current: number; frequency: number }) => {
    setSelectedAC(ac)
    setModalVisible(true)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>
            <Text style={styles.text}>AC Name</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.text}>Temp (°C)</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.text}>Actions</Text>
          </DataTable.Title>
        </DataTable.Header>

        {acData.map((ac) => (
          <DataTable.Row key={ac.id} style={styles.tableRow}>
            <DataTable.Cell>
              <Text style={styles.text}>{ac.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.text}>{ac.temp}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <TouchableOpacity style={styles.button} onPress={() => openModal(ac)}>
                <Text style={styles.buttonText}>View More</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {selectedAC && (
            <>
              <Text style={styles.modalText}>AC: {selectedAC.name}</Text>
              <Text style={styles.modalText}>Temperature: {selectedAC.temp}°C</Text>
              <Text style={styles.modalText}>Energy Consumed: {selectedAC.energy} kWh</Text>
              <Text style={styles.modalText}>Power: {selectedAC.power} W</Text>
              <Text style={styles.modalText}>Voltage: {selectedAC.voltage} V</Text>
              <Text style={styles.modalText}>Current: {selectedAC.current} A</Text>
              <Text style={styles.modalText}>Frequency: {selectedAC.frequency} Hz</Text>
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default AdminDashboard

