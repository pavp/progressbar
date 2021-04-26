import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import PropTypes from "prop-types";

const Square = ({ status }) => {
  return <View style={[styles.square, status && styles.fillSquare]} />;
};

const Button = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable>
  );
};

const App = () => {
  const [progress, setProgress] = useState(new Array(15).fill(false));
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (start && index < 15) {
        progress[index] = true;
        setIndex((index) => index + 1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [start, progress, index]);

  const startProgress = () => {
    setStart(true);
  };
  const stopProgress = () => {
    setStart(false);
  };
  const restartProgress = () => {
    setStart(false);
    setProgress(new Array(15).fill(false));
    setIndex(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{"Progress Bar"}</Text>
      <View style={styles.progressBar}>
        {progress.map((item, index) => {
          return <Square status={item} key={index} />;
        })}
      </View>
      <View style={styles.buttons}>
        <Button title={"Start"} onPress={startProgress} />
        <Button title={"Stop"} onPress={stopProgress} />
        <Button title={"Reset"} onPress={restartProgress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  progressBar: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 16,
  },
  square: {
    flex: 1 / 15,
    borderColor: "black",
    borderWidth: 1,
    aspectRatio: 1,
    backgroundColor: "white",
    marginHorizontal: 2,
  },
  fillSquare: {
    backgroundColor: "green",
  },
  buttonTitle: {
    color: "black",
  },
  button: {
    borderColor: "black",
    marginHorizontal: 8,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  title: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
  },
});

Square.propTypes = {
  status: PropTypes.bool.isRequired,
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default App;
