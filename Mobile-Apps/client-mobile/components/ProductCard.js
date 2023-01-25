import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native';

export default function ProductCard({ product, navigation }) {
  return (
    <TouchableNativeFeedback onPress={()=>{
      navigation.push("Product Detail", {slug: product.slug});
    }}>
      <View style={styles.productCard}>
        <Image
          style={styles.productImage}
          source={{
            uri: product.mainImg,
          }}
          resizeMode='contain'
        />
        <View style={styles.productDescription}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>IDR. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  productImage: {
    flex: 1,
    width: 140,
    height: 140
  },
  productCard: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    margin: 6,
    flexDirection: "row"
  },
  productTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8
  },
  productPrice: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 4,
    marginTop: "auto"
  },
  productDescription: {
    flex: 2,
    justifyContent: "center"
  }
})