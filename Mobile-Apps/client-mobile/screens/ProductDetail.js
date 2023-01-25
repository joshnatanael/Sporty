import { StyleSheet, Text, View, ScrollView, Image, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { GET_PRODUCT_DETAIL } from '../queries/products';
import { useQuery } from '@apollo/client';
import ErrorScreen from './ErrorScreen';

export default function ProductDetail({ route, navigation }) {

  const { slug } = route.params;
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      productSlug: slug
    }
  });
  const switchImage = (imgUrl) => {
    navigation.push("Image", { imgUrl });
  }
  
  if(error){
   return <ErrorScreen errorMessage={error.message}/>
  }
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.brandText}>Sporty</Text>
      </View>
      {loading ? <ActivityIndicator size="large" color="#000" style={styles.loadAnimation} /> :
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.content}>
              <TouchableNativeFeedback onPress={()=>{
                switchImage(data.product.mainImg)
              }}>
                <Image
                  style={styles.mainImg}
                  source={{
                    uri: data.product.mainImg,
                  }}
                  resizeMode='contain'
                />
              </TouchableNativeFeedback>
            </View>
            {data.product.Images ? <ScrollView horizontal={true}>
              {data.product.Images.map((image, index) => {
                return <TouchableNativeFeedback onPress={() => { switchImage(image.imgUrl) }} key={image.id}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: image.imgUrl,
                    }}
                    resizeMode='contain'
                  />
                </TouchableNativeFeedback>
              })}
            </ScrollView>
              : <></>
            }
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.h1}>{data.product.name}</Text>
              <Text style={{ fontSize: 20 }}>IDR. {data.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
              <Text>Author: {data.product.User.email}</Text>
              <Text style={{ marginTop: 20 }}>{data.product.description}</Text>
            </View>
          </ScrollView>
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 10
  },
  mainImg: {
    flex: 1,
    height: 300,
    marginBottom: 15
  },
  img: {
    borderColor: "gray",
    borderWidth: 1,
    width: 80,
    height: 80,
    marginHorizontal: 10
  },
  h1: {
    fontWeight: "bold",
    fontSize: 23,
    marginTop: 25
  },
  header: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center"
  },
  brandText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    paddingVertical: 10,
    fontSize: 30,
    fontFamily: "sans-serif"
  },
  loadAnimation: {
    flex: 11
  }
});
