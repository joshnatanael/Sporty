## Endpoints

List of Available Endpoints:
- `GET /customers/products`
- `GET /customers/categories`
- `GET /customers/products/:slug`

### GET /customers/products
#### Description
- Get all products data

#### Request
- Query
    ```json
    {
      "categoryName": "String | Optional"
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
### GET /customers/categories
#### Description
- Get all categories data

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

### GET /customers/products/:slug
#### Description
- Get product data by slug

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
_404 - Not Found_
- Body
    ```json
    {
      "message": "Data not found"
    }
    ```

### Global Error

_Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal server error"
  }
  ```