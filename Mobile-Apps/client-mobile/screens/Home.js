import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Banner from '../components/Banner';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../queries/products';
import { GET_CATEGORIES } from '../queries/categories';
import ErrorScreen from './ErrorScreen';

export default function Home({ route, navigation }) {
  
  let variables = {};
  if(route.params){
    variables.categoryName = route.params.categoryName
  }
  const { loading: loadProducts, error: errorProducts, data: dataProducts } = useQuery(GET_PRODUCTS, {
    variables
  });
  const { loading: loadCategories, error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES);
  const [filterCategory, setFilterCategory] = useState(route.params);
  
  if(errorProducts){
    return <ErrorScreen errorMessage={errorProducts.message}/>;
  }
  if(errorCategories){
    return <ErrorScreen errorMessage={errorCategories.message}/>
  }
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.brandText}>Sporty</Text>
      </View>
      {loadProducts || loadCategories ? <ActivityIndicator size="large" color="#000" style={styles.loadAnimation}/> :
        <View style={styles.content}>
          <ScrollView>
            <Banner />
            <View style={styles.marginHorizontal}>
              {filterCategory ?
                <Text style={styles.h1}>{filterCategory.categoryName}</Text>
                :
                <Text style={styles.h1}>Our Products</Text>
              }
              {
                dataProducts.products.length > 0 ?
                  <>
                    {dataProducts.products.map(product => {
                      return <ProductCard product={product} key={product.id} navigation={navigation} />
                    })}
                  </> :
                  <Text style={{fontSize: 15, textAlign: "center", marginVertical: 15}}>No Matching Products</Text>
              }
              <Text style={styles.h1}>Categories</Text>
              <ScrollView horizontal={true}>
                {dataCategories.categories.map(category => {
                  return <CategoryCard key={category.id} category={category} navigation={navigation} />
                })}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 11
  },
  h1: {
    fontSize: 30,
    fontWeight: '800',
    marginVertical: 10
  },
  categorySection: {
    flex: 5
  },
  marginHorizontal: {
    marginHorizontal: 10
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
