import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import { styles } from "../../Styles";
import { Input, Avatar, Icon, CheckBox } from "@rneui/themed";
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

  const [status, requestPermission] = ImagePicker.useCameraPermissions(true);

  const switchType = type === true ? "87231623021" : "1234563218";
  const switchTypeLabel = type === true ? "Pesel" : "NIP";

  const showDisplayImageMessage = displayImageMessage === false ? "none" : "";

  const activateSubmit = () => {
    if (
      identificationNumber?.length >= 10 &&
      firstName !== "" &&
      lastName !== ""
    ) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  };

  const firstNameLetter = String(firstName)?.charAt(0);
  const lastNameLetter = String(lastName)?.charAt(0);

  const identificationNumberMessage =
    checkIdentificationNumber(identificationNumber ?? "", type) === true
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

    if (!result.cancelled) {
      setPicture(result);
      setDisplayImageMessage(false);
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
              marginTop: 100,
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
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              placeholder="Adrian"
            />
          </View>
          <View style={[styles.group, styles.button]}>
            <Input
              label="Nazwisko"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              placeholder="Klemczak"
            />
          </View>
          <View style={[styles.group, styles.button, styles.checkBox]}>
            <CheckBox
              containerStyle={{ backgroundColor: "transparent" }}
              title="Osoba fizyczna?"
              checked={type}
              onPress={() => setType(!type)}
            />
          </View>
          <View style={[styles.group, styles.button]}>
            <Input
              label={switchTypeLabel}
              value={identificationNumber}
              onChangeText={(text) => setIdentificationNumber(text)}
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              placeholder={switchType}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {identificationNumberMessage}
            </Text>
          </View>
          <View style={{ marginTop: 80 }}>
            <Button
              title="Zarejestruj"
              disabled={enableSubmit}
              onPress={handlePost}
            />
          </View>
          <Text style={{ paddingTop: 200, textAlign: "center" }}>
            {postMessage}
          </Text>
        </View>
      </View>
    </>
  );
};
