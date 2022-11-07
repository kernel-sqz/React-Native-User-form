import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, CheckBox } from "react-native";
import { Input, Avatar, Icon } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [type, setType] = useState(true);
  const [image, setImage] = useState();
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState(null);

  const switchType = type === true ? "87231623021" : "1234563218";
  const switchTypeLabel = type === true ? "Pesel" : "NIP";

  const checkPesel = () => {
    const multiplicationTable = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    let lastDigit = [];
    let allDigits = [...identificationNumber];
    let onlyDigits = [];
    let multipied = [];

    if (identificationNumber.length === 11) {
      for (let i = 0; i < allDigits.length; i++) {
        onlyDigits.push(parseInt(allDigits[i]));
      }
      lastDigit.push(onlyDigits.pop());
      for (let i = 0; i < onlyDigits.length; i++) {
        multipied.push(onlyDigits[i] * multiplicationTable[i]);
      }

      const almostThere = String(
        multipied.reduce((partialSum, a) => partialSum + a, 0)
      );
      const lastNumber = Number(almostThere.charAt(almostThere.length - 1));

      if (10 - lastNumber === lastDigit[0]) {
        return true;
      }
      return false;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPicture(result.uri);
    }
  };

  const identificationNumberMessage =
    checkPesel() === true ? "Poprawny pesel" : "Niepoprawny pesel";

  const firstNameLetter = firstName?.charAt(0);
  const lastNameLetter = lastName?.charAt(0);

  useEffect(() => {
    checkPesel();
  }, [identificationNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <Avatar
            size={96}
            rounded
            source={picture}
            title={firstNameLetter + lastNameLetter}
            containerStyle={{ backgroundColor: "#3d4db7" }}
          >
            <Avatar.Accessory size={32} onPress={pickImage} />
          </Avatar>
        </View>
        <View style={[styles.group, styles.button]}>
          <Input
            label="Imię"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            placeholder="Adrian"
          />
        </View>
        <View style={[styles.group, styles.button]}>
          <Input
            label="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            placeholder="Klemczak"
          />
        </View>
        <View style={[styles.group, styles.button, styles.checkBox]}>
          <Text>Osoba fizyczna?</Text>

          <CheckBox value={type} onValueChange={() => setType(!type)} />
        </View>
        <View style={[styles.group, styles.button]}>
          <Input
            label={switchTypeLabel}
            value={identificationNumber}
            onChange={(e) => setIdentificationNumber(e.target.value)}
            keyboardType="numeric"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            placeholder={switchType}
          />
          <Text style={{ textAlign: "center", marginTop: "10px" }}>
            {identificationNumberMessage}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d8d7d7",
    columnGap: "3rem",
  },
  form: {
    position: "absolute",
    width: "100%",
    maxWidth: "480px",
    background: "#fff",
    borderRadius: "1rem",
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    paddingRight: "4em",
    paddingLeft: "4em",
    paddingTop: "1.5rem",
    transition: "all .3s ease-in-out",
  },
  group: {
    width: "90%",
    height: "47px",
    marginBottom: "1.3rem",
  },
  button: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    borderRadius: ".4rem",
  },
  input: {
    border: "solid",
    borderColor: "blue",
    padding: "0 1.1rem",
    minHeight: "40px",
  },
  placeholder: {
    opacity: 0.5,
  },
  checkBox: {
    paddingLeft: ".7rem",
  },
});
