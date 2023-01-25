import { StyleSheet, View, Image, TouchableNativeFeedback, Text } from 'react-native';

export default function ImageScreen({ route, navigation }) {

  const { imgUrl } = route.params;

  return (
    <View>
      <View style={styles.close}>
        <TouchableNativeFeedback onPress={() => {
          navigation.goBack();
        }}>
          <Text style={styles.closeLogo}>X</Text>
        </TouchableNativeFeedback>
      </View>
      <Image
        style={styles.mainImg}
        source={{
          uri: imgUrl
        }}
        resizeMode='contain'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainImg: {
    width: "100%",
    height: "100%"
  },
  close: {
    width: "10%",
    alignItems: "center",
    marginRight: 5,
    marginLeft: "auto",
    marginTop: 15
  },
  closeLogo: {
    fontWeight: "700",
     fontSize: 20
  }
});