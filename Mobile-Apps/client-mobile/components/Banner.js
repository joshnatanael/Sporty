import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function Banner() {
  return (
    <View style={styles.banner}>
      <ImageBackground source={{
        uri: 'https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      }}
        resizeMode="cover"
        style={styles.headerImage}
      >
        <Text style={styles.textBanner}>Find the best Sporty products!</Text>
        <Text style={styles.shopNowText}>SHOP NOW</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flex: 1,
  },
  textBanner: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    padding: 15
  },
  shopNowText: {
    color: "white",
    backgroundColor: "black",
    width: "25%",
    marginLeft: 15,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 18
  }
})