import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Stoper = ({ interval, callback, show }) => {
  const html = `
        <script>
            setInterval(()=>{window.ReactNativeWebView.postMessage("");}, ${interval})
        </script>
    `;

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <WebView onMessage={callback} source={{ html }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});

export default Stoper;
