import { gql } from '@apollo/client';

export const GET_PRODUCTS = 
  gql`
  query Products($categoryName: String) {
    products(categoryName: $categoryName) {
      id
      slug
      mainImg
      name
      price
    }
  }
`;

export const GET_PRODUCT_DETAIL = 
  gql`
  query Product($productSlug: String) {
    product(productSlug: $productSlug) {
      name
      mainImg
      Images {
        id
        imgUrl
      }
      price
      User {
        email
      }
      description
    }
  }
`;