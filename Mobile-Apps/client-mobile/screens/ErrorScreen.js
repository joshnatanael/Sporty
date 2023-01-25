import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ErrorScreen({ errorMessage }) {

  const navigation = useNavigation();

  return (
    <>
      <TouchableNativeFeedback onPress={()=>{
        navigation.goBack();
      }}>
        <Image
          style={styles.backIcon}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3114/3114883.png",
          }}
          resizeMode='contain'
        />
      </TouchableNativeFeedback>
      <View style={styles.container}>
        <Image
          style={styles.errorImage}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4063/4063731.png",
          }}
          resizeMode='contain'
        />
        <Text style={styles.errorText}>Sorry, {errorMessage}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  errorImage: {
    width: 200,
    height: 200
  },
  errorText: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
    margin: 15
  }
});
