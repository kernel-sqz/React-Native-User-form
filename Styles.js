import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d8d7d7",
    columnGap: 3,
  },
  form: {
    position: "absolute",
    width: "100%",
    maxWidth: 480,
    background: "#fff",
    borderRadius: 1,
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 1.5,
    transition: "all .3s ease-in-out",
  },
  group: {
    width: "90%",
    height: 47,
  },
  button: {
    width: "100%",
    height: 80,
    border: "none",
    outline: "none",
    borderRadius: 0.4,
  },
  input: {
    border: "solid",
    borderColor: "blue",
    padding: 1.1,
  },
  placeholder: {
    opacity: 0.5,
  },
  checkBox: {
    paddingLeft: 0.7,
  },
});
