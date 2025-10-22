import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const numberSelection = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { existingPlays } = useLocalSearchParams<{ existingPlays?: string }>();

  const [playsList, setPlaysList] = useState<number[][]>([]);
  const router = useRouter();


  useEffect(() => {
    if (existingPlays) {
      try {
        console.log("Existing play list:",existingPlays);
        setPlaysList(JSON.parse(existingPlays));
         console.log("parsed existing play",JSON.parse(existingPlays))
        console.log("parsed paly list:",playsList);
      } catch {
        console.warn("Invalid existing plays data");
      }
    } else {
      setPlaysList([]); // ✅ ensure it's clean
    }
 console.log("parsed paly list 2:",playsList);
    setSelectedNumbers([]); // ✅ clear current selection always
  }, [existingPlays]);

  useFocusEffect(
        useCallback(() => {
      
      const onBackPress = () => {
        console.log("Back button pressed usecallback",playsList)
        router.replace({
        pathname: "/",
        params: {
          all: JSON.stringify(playsList), // keep current plays intact
        },
      });
    
     
        return true; // prevent default behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

     //  return () =>
     //  BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [playsList])
  );
  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const generateRandomNumbers = () => {
    const allNumbers = Array.from({ length: 42 }, (_, i) => i + 1);
    const shuffled = allNumbers.sort(() => 0.5 - Math.random());
    const randomFive = shuffled.slice(0, 5).sort((a, b) => a - b);
    setSelectedNumbers(randomFive);
  };

  const handlePlay = () => {
    if (selectedNumbers.length === 5) {
      // Add the new play to previous plays
      const updatedPlays = [...playsList, selectedNumbers];

      router.replace({
        pathname: "/",
        params: { selected: JSON.stringify(selectedNumbers), all: JSON.stringify(updatedPlays) },

      });
      console.log("Playing numbers:", selectedNumbers);
      console.log("All plays:",updatedPlays);
    } else {
      Alert.alert("Warning", "Please pick 5 numbers!");
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.luckyLottoContainer}>

        <ThemedText type="title"style={styles.luckyLottoText}>Lucky Lotto </ThemedText>
        {/* Selected Numbers */}
        <View style={styles.selectedNumbersContainer}>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <View key={i} style={styles.numberCircle}>
                <Text style={styles.numberText}>{selectedNumbers[i] ?? ""}</Text>
              </View>
            ))}
        </View>
      </ThemedView>

      {/* Number Picker */}
      <View style={styles.card}>
        <ThemedText type="subtitle" darkColor="#000">Pick 5 numbers</ThemedText>
        <View style={styles.numbersGrid}>
          {Array.from({ length: 42 }, (_, i) => i + 1).map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberButton,
                selectedNumbers.includes(num) && styles.numberButtonSelected,
              ]}
              onPress={() => toggleNumber(num)}
            >
              <Text
                style={[
                  styles.numberButtonText,
                  selectedNumbers.includes(num) && styles.numberButtonTextSelected,
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.playButton]}
          onPress={handlePlay}
        >
          <Text style={styles.actionButtonText}>Play Numbers</Text>
        </TouchableOpacity>
      </View>

    </ThemedView>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  luckyLottoContainer: {
    height: 200,
    backgroundColor: "#4A90E2",
    alignContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  luckyLottoText:{
    marginTop:20,
  },
  selectedNumbersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  pickNumberStyle:{textDecorationColor:"#000",},

  numberCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 18,
    color: "#4A90E2",
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  numbersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  numberButton: {
    width: "12%",
    margin: 4,
    borderRadius: 25,      
    borderWidth: 1,  
    backgroundColor: "#FFFFFF",
    borderColor:"#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  numberButtonSelected: {
    backgroundColor: "#4A90E2",
  },
  numberButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  numberButtonTextSelected: {
    color: "#fff",
  },
  actions: {
    width: "100%",
    marginTop: 25,
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  playButton: {
    margin:20,
    backgroundColor: "#D3D3D3",
  },
 
  actionButtonText: {
    
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default numberSelection;