import { FETCH_CATEGORIES_SUCCESS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_DETAIL, HIDELOAD, SHOWLOAD } from "./actionType";
import { BASEURL } from "./baseUrl";
import Swal from 'sweetalert2';

export function fetchProducts(categoryName){
  return(dispatch, getState)=>{
    let url = `${BASEURL}products`;
    if(categoryName){
      url += `?categoryName=${categoryName}`
    }
    return fetch(url)
      .then(response=>{
        if(!response.ok){
          throw new Error("error")
        }
        return response.json();
      })
      .then(data=>{
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: data
        })
      })
      .catch(err=>{
        showNotification("Oooppsss something went wrong!", "error");
      })
  }
}

export function showLoad(){
  return(dispatch, getState)=>{
    dispatch({
      type: SHOWLOAD
    })
  }
}

export function hideLoad(){
  return(dispatch, getState)=>{
    dispatch({
      type: HIDELOAD
    })
  }
}

export function fetchCategories(){
  return(dispatch, getState)=>{
    return fetch(`${BASEURL}categories`)
      .then(response=>{
        if(!response.ok){
          throw new Error("error")
        }
        return response.json();
      })
      .then(data=>{
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: data
        })
      })
      .catch(err=>{
        showNotification("Oooppsss something went wrong!", "error");
      })
  }
}

export function fetchProductDetail(slug){
  return(dispatch, getState)=>{
    return fetch(`${BASEURL}products/${slug}`)
      .then(response=>{
        if(!response.ok){
          throw new Error("error");
        }
        return response.json();
      })
      .then(data=>{
        dispatch({
          type: FETCH_PRODUCT_DETAIL,
          payload: data
        })
      })
      .catch(err=>{
        showNotification("Oooppsss something went wrong!", "error");
      })
  }
}

function showNotification(message, type) {
  Swal.fire({
    position: 'top-end',
    icon: type,
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}