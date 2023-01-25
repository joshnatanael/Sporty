import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native';

export default function CategoryCard({ category, navigation }) {
  return (
    <TouchableNativeFeedback onPress={()=>{
      navigation.push("Products", {
        categoryName: category.name
      })
    }}>
      <View style={styles.categoryCard}>
        <Image
          style={styles.categoryImage}
          source={{
            uri: category.imgUrl,
          }}
          resizeMode='contain'
        />
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  categoryImage: {
    width: 150,
    height: 150,
    flex: 1,
    borderRadius: 75,
    borderColor: "gray",
    borderWidth: 1
  },
  categoryCard: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 20
  },
  categoryName: {
    textAlign: "center",
    fontSize: 17,
    marginVertical: 10
  }
})