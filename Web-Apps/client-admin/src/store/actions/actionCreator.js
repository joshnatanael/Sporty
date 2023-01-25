import { baseUrl } from "../baseUrl";
import { CLOSE_LOAD, CLOSE_SHOW_IMAGES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_DETAIL, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_DETAIL, OPEN_LOAD, OPEN_SHOW_IMAGES } from "./actionTypes";
import Swal from 'sweetalert2';

export function fetchProductsSuccess() {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}products`, {
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then(data => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: data
        })
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function fetchCategoriesSuccess() {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}categories`, {
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json();
      })
      .then(data => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: data
        })
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function openShowImages(id) {
  return (dispatch, getState) => {
    dispatch(showLoad());
    dispatch(fetchProductDetail(id))
      .then(_ => {
        dispatch(hideLoad());
        dispatch({
          type: OPEN_SHOW_IMAGES
        })
      })
  }
}

export function closeShowImages() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SHOW_IMAGES
    })
  }
}

export function addCategory(category) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      },
      body: JSON.stringify(category),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then((data) => {
        showNotification("Successfully add new category", 'success');
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function deleteCategory(id) {
  return (dispatch, getState) => {
    Swal.fire({
      title: 'Are you sure want to delete this category?',
      text: "All associated products and images will also be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showLoad());
        fetch(`${baseUrl}categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.access_token
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("error")
            }
            return response.json()
          })
          .then((data) => {
            dispatch(fetchCategoriesSuccess());
            dispatch(hideLoad());
            showNotification(data.message, 'success');
          })
          .catch((error) => {
            showNotification("Oooppsss something went wrong!", "error");
          });
      }
    })
  }
}

export function showLoad() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_LOAD
    })
  }
}

export function hideLoad() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LOAD
    })
  }
}

export function fetchCategoryDetail(id) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}categories/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then(data => dispatch({
        type: FETCH_CATEGORY_DETAIL,
        payload: data
      }))
      .catch(error => console.log("ERROR", error))
  }
}

export function editCategory(category, id) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      },
      body: JSON.stringify(category),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then((data) => {
        showNotification("Successfully edit category", 'success');
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function loginHandler(login) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error");
        }
        return response.json();
      })
      .then((data) => {
        showNotification("Successfully logged in", 'success');
        return data;
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function addProduct(product) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then((data) => {
        showNotification("Successfully add new product", 'success');
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function deleteProduct(id) {
  return (dispatch, getState) => {
    Swal.fire({
      title: 'Are you sure want to delete this product?',
      text: "All associated images will also be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showLoad());
        fetch(`${baseUrl}products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.access_token
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("error");
            }
            return response.json()
          })
          .then((data) => {
            dispatch(hideLoad());
            dispatch(fetchProductsSuccess());
            showNotification(data.message, 'success');
          })
          .catch((error) => {
            showNotification("Oooppsss something went wrong!", "error");
          });
      }
    })
  }
}

export function fetchProductDetail(id) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then(data => dispatch({
        type: FETCH_PRODUCT_DETAIL,
        payload: data
      }))
      .catch(error => console.log("ERROR", error))
  }
}

export function editProduct(product) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then((data) => {
        showNotification("Successfully edit product", 'success');
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
  }
}

export function registerAccount(register) {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token
      },
      body: JSON.stringify(register),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error")
        }
        return response.json()
      })
      .then((data) => {
        showNotification("Successfully register new account", 'success');
      })
      .catch((error) => {
        showNotification("Oooppsss something went wrong!", "error");
      });
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