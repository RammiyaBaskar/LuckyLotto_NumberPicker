import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
 const { selected, all } = useLocalSearchParams<{ selected?: string; all?: string }>();
  const [playsList, setPlaysList] = useState<number[][]>([]);
   
   const router = useRouter();

  useEffect(() => {
  if (all) {
    const allNumbers = JSON.parse(all);
    setPlaysList(allNumbers);
  }
}, [all]);

  const addPlay = () => {
          router.replace({
    pathname: "/numberSelection",
    params: { existingPlays: JSON.stringify(playsList) },
  });
  };

  const deletePlay = (index: number) => {
    setPlaysList((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePurchase = () => {
    Alert.alert("Purchase", `You have ${playsList.length} play(s) ready to purchase!`);
  };
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.statusBar}>
        <ThemedText type="title" style={styles.statusBarText}>
          Your Numbers
        </ThemedText>
      </ThemedView>

      {/* ✅ FlatList takes the remaining space and scrolls */}
      <FlatList
        data={playsList}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No plays yet. Add one below!
          </ThemedText>
        }
        renderItem={({ item: numbers, index }) => (
          <ThemedView style={styles.playCard}>
            <View style={styles.numberRow}>
              {numbers.map((n, i) => (
                <View key={i} style={styles.numberCircle}>
                  <ThemedText style={styles.numberText}>{n}</ThemedText>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deletePlay(index)}>
              <ThemedText style={styles.deleteButtonText}>Delete Row</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        ListFooterComponent={
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addPlay}>
              <ThemedText style={styles.buttonText}>Add Play</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                playsList.length === 0
                  ? styles.purchaseButtonDisabled
                  : styles.purchaseButton,
              ]}
              onPress={handlePurchase}
              disabled={playsList.length === 0}
            >
              <ThemedText
                style={[
                  styles.buttonText,
                  playsList.length === 0
                    ? styles.purchaseButtonTextDisabled
                    : styles.purchaseButtonText,
                ]}
              >
                Purchase
              </ThemedText>
            </TouchableOpacity>
          </View>
        }
      />
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, listContainer: {
    padding: 10,
    paddingBottom: 40, // space for buttons at bottom
    flexGrow: 1, // allows scroll even with few items
  },
  scrollContainer: {
    padding:10,
    backgroundColor:"#FFFFFF",
    flex:1,
    flexGrow:1,
   // height:"100%",
   
  },scrollViewContainer:{ backgroundColor:"#FFFFFF"
  //  height:"100%",
  },
  statusBar: {
  backgroundColor: "#4A90E2",
  width: "100%",
  paddingTop: 50, // leave space for device status bar
  paddingBottom: 15,
  alignItems: "center",
  justifyContent: "center",
    top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
},
statusBarText: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
},

  emptyText: {
    color: "#888",
    marginBottom: 20,
  },
  playCard: {
    backgroundColor: "#e8e8e8",
    width: "100%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  numberRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 3,
  },
  numberText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    borderBlockColor:"#4A90E2",
    borderWidth: 2,  
    borderRadius:25,
  },
  deleteButton: {
    backgroundColor: "#b9b5b5ff",
    width: "40%",
    borderRadius:25,
    alignItems:"center",
    padding:7,
  },
  deleteButtonText:{color:"#292828ff"},
 purchaseButton: {
  backgroundColor: "#4A90E2", // enabled: blue
  borderRadius: 25,
},
purchaseButtonText: {
  color: "#fff", // white text when enabled
},
purchaseButtonDisabled: {
  backgroundColor: "#CCCCCC", // gray when disabled
  borderRadius: 25,
},

purchaseButtonTextDisabled: {
  color: "#000", // black text when disabled
},

});
