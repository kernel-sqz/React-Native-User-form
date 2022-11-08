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
