## Endpoints

List of Available Endpoints:
- `POST /admins/login`
- `POST /admins/register`
- `GET /admins/products`
- `GET /admins/categories`
- `GET /admins/products/:id`
- `GET /admins/categories/:id`
- `POST /admins/products`
- `PUT /admins/products`
- `DELETE /admins/products/:id`
- `POST /admins/categories`
- `PUT /admins/categories/:id`
- `DELETE /admins/categories/:id`

### POST /admins/login
#### Description
- Login to admin account

#### Request
- Body
    ```json
    {
      "email": "user2@mail.com",
      "password": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "access_token": String
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Email is required"
    }
    Or
    {
      "message": "Password is required"
    }
    ```

### POST /admins/registers
#### Description
- register new admin account

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    {
      "username": "user6",
      "email": "user6@mail.com",
      "password": String,
      "phoneNumber": "13412342134",
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 6,
      "email": "user6@mail.com"
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Invalid email format"
    }
    Or
    {
      "message": "email must be unique"
    }
    Or
    {
      "message": "Password must be 5 characters or longer"
    }
    Or
    {
      "message": "Email is required"
    }
    Or
    {
      "message": "Password is required"
    }
    ```

### GET /admins/products
#### Description
- Fetch all products

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": 1,
        "name": "Adidas NMD",
        "slug": "adidas-nmd",
        "description": "Adidas NMD men's shoes",
        "price": 2300000,
        "mainImg": "https://id-live-01.slatic.net/p/ee1b70c9b1002164cf2abcc18b09aa2d.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2022-12-17T04:36:07.628Z",
        "updatedAt": "2022-12-17T04:36:07.628Z",
        "Category": {
          "id": 1,
          "name": "Shoes",
          "imgUrl": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
          "createdAt": "2022-12-17T04:36:07.626Z",
          "updatedAt": "2022-12-17T04:36:07.626Z"
        },
        "Images": [
          {
            "id": 1,
            "productId": 1,
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNP8sTAVCQPle_fQFKEcV1woxzuLtBZfguhQ&usqp=CAU",
            "createdAt": "2022-12-17T04:36:07.631Z",
            "updatedAt": "2022-12-17T04:36:07.631Z"
          }
        ]
      },
      ...
    ]
    ```
### GET /admins/categories
#### Description
- Fetch all categories

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": 1,
        "name": "Shoes",
        "imgUrl": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
        "createdAt": "2022-12-17T04:36:07.626Z",
        "updatedAt": "2022-12-17T04:36:07.626Z"
      },
      ...
    ]
    ```
### GET /admins/products/:id
#### Description
- Fetch products detail by id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "id": 1,
      "name": "Adidas NMD",
      "slug": "adidas-nmd",
      "description": "Adidas NMD men's shoes",
      "price": 2300000,
      "mainImg": "https://id-live-01.slatic.net/p/ee1b70c9b1002164cf2abcc18b09aa2d.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2022-12-17T04:36:07.628Z",
      "updatedAt": "2022-12-17T04:36:07.628Z",
      "Category": {
        "id": 1,
        "name": "Shoes",
        "imgUrl": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
        "createdAt": "2022-12-17T04:36:07.626Z",
        "updatedAt": "2022-12-17T04:36:07.626Z"
      },
      "Images": [
        {
          "id": 1,
          "productId": 1,
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNP8sTAVCQPle_fQFKEcV1woxzuLtBZfguhQ&usqp=CAU",
          "createdAt": "2022-12-17T04:36:07.631Z",
          "updatedAt": "2022-12-17T04:36:07.631Z"
        }
      ],
      "User": {
        "username": "customer1",
        "email": "customer1@mail.com"
      }
    }
    ```
### GET /admins/categories/:id
#### Description
- Fetch categories detail by id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "id": 1,
      "name": "Shoes",
      "imgUrl": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
      "createdAt": "2022-12-17T04:36:07.626Z",
      "updatedAt": "2022-12-17T04:36:07.626Z"
    }
    ```
### POST /admins/products
#### Description
- Add new product

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    {
      "name": "nameproduct",
      "description": "product description",
      "price": 200000,
      "mainImg": "imageUrl1",
      "categoryId": 1,
      "imgUrl": [
        {
          "imgUrl": "image 2"
        }
      ]
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 8,
      "name": "nameproduct",
      "description": "product description",
      "price": 200000,
      "slug": "nameproduct",
      "mainImg": "imageUrl1",
      "categoryId": 1,
      "authorId": 2,
      "updatedAt": "2022-12-17T04:53:47.536Z",
      "createdAt": "2022-12-17T04:53:47.536Z"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Price must be higher than IDR 50.000"
    }
    Or
    {
      "message": "Product name is required"
    }
    Or
    {
      "message": "Product description is required"
    }
    Or
    {
      "message": "Price is required"
    }
    Or
    {
      "message": "Product main image is required"
    }
    ```
### PUT /admins/products
#### Description
- Edit product

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    { 
      "id": 11,
      "name": "edit",
      "description": "product description",
      "price": 200000,
      "mainImg": "imageUrl1",
      "categoryId": 1,
      "imgUrl": [
        {
          "id": 10,
          "imgUrl": "edit",
          "productId": 11
        },
        ...
      ]
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Product id 11 successfully updated"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Price must be higher than IDR 50.000"
    }
    Or
    {
      "message": "Product name is required"
    }
    Or
    {
      "message": "Product description is required"
    }
    Or
    {
      "message": "Price is required"
    }
    Or
    {
      "message": "Product main image is required"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Data not found"
    }
    ```
### DELETE /admins/products/:id
#### Description
- Delete product by id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "nameProduct successfully deleted"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": "Data not found"
    }
    ```

### POST /admins/categories
#### Description
- Add new category

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    {
      "name": "nameCategory",
      "imgUrl": "image"
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 7,
      "name": "nameCategory",
      "imgUrl": "image",
      "updatedAt": "2022-12-17T05:17:43.942Z",
      "createdAt": "2022-12-17T05:17:43.942Z"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Category name is required"
    }
    ```
### PUT /admins/categories/:id
#### Description
- Edit category by id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
- Body
    ```json
    { 
      "name": "edit",
      "imgUrl": "editimage"
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Category id 8 successfully updated"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Category name is required"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Data not found"
    }
    ```
### DELETE /admins/categories/:id
#### Description
- Delete product by id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "categoryName successfully deleted"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": "Data not found"
    }
    ```

### Global Error

_Response (401 - Unauthorized)_

  ```json
  {
    "message": "Invalid token"
  }
  ```
_Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal server error"
  }
  ```