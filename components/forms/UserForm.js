import React, { useState, useEffect } from "react";
import { Text, View, Button, CheckBox } from "react-native";
import { styles } from "../../Styles";
import { Input, Avatar, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { checkIdentificationNumber } from "../../scripts/CheckValidID";
import axios from "axios";

export const UserForm = () => {
  const [type, setType] = useState(true);
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState(null);

  const [displayImageMessage, setDisplayImageMessage] = useState(false);
  const [postMessage, setPostMessage] = useState(null);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const switchType = type === true ? "87231623021" : "1234563218";
  const switchTypeLabel = type === true ? "Pesel" : "NIP";

  const showDisplayImageMessage = displayImageMessage === false ? "none" : "";

  const activateSubmit = () => {
    if (
      identificationNumber.length >= 10 &&
      firstName !== "" &&
      lastName !== ""
    ) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  };

  const firstNameLetter = firstName?.charAt(0);
  const lastNameLetter = lastName?.charAt(0);

  const identificationNumberMessage =
    checkIdentificationNumber(identificationNumber, type) === true
      ? `Poprawny ${switchTypeLabel}`
      : `Niepoprawny ${switchTypeLabel}`;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const fileName = result.uri.split("/");
    const extension = fileName[1].split(";");

    if (
      (!result.cancelled && extension[0] == "jpg") ||
      extension[0] == "jpeg"
    ) {
      setPicture(result.uri);
      setDisplayImageMessage(false);
    } else if (
      (!result.cancelled && extension[0] !== "jpg") ||
      extension[0] !== "jpeg"
    ) {
      setDisplayImageMessage(true);
    }
  };

  const handlePost = () => {
    const user = {
      type,
      picture,
      identificationNumber,
      firstName,
      lastName,
      picture,
    };
    axios
      .post(
        "https://localhost:60001/Contractor/Save",

        user
      )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setPostMessage(
            <Text>
              Dodano użytkownika ${firstName} ${lastName}
            </Text>
          );
        }
      })
      .catch((err) => {
        console.log("Response error", err);
        setPostMessage(<Text>Błąd ${err.message}</Text>);
      });
  };

  useEffect(() => {
    activateSubmit();
    checkIdentificationNumber(identificationNumber, type);
  }, [identificationNumber]);

  return (
    <>
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
          <Text
            style={{
              marginTop: "2px",
              marginBottom: "2px",
              textAlign: "center",
              color: "red",
              display: `${showDisplayImageMessage}`,
            }}
          >
            Wspierane rozrzeszenia: JPG, JPEG
          </Text>
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
          <View style={{ marginBottom: "25px", marginTop: "15px" }}>
            <Button
              title="Zarejestruj"
              disabled={enableSubmit}
              onPress={handlePost}
            />
          </View>
          <Text style={{ marginBottom: "6px", textAlign: "center" }}>
            {postMessage}
          </Text>
        </View>
      </View>
    </>
  );
};
