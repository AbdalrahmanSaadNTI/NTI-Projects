# Shop Management System - API Endpoints Documentation

## Base URLs
- **API**: `http://localhost:3000/api/v1.0`
- **Web**: `http://localhost:3000`

## Authentication
All API endpoints (except signin/signup) require JWT authentication via Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Authentication Endpoints

### POST /api/v1.0/signin
**Description**: User sign in
**Body**:
```json
{
  "userName": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "login": "done",
  "token": "jwt-token",
  "role": "user-role"
}
```

### POST /api/v1.0/signup
**Description**: User sign up
**Body**:
```json
{
  "fullName": "string",
  "userName": "string",
  "password": "string",
  "role": "string"
}
```
**Response**:
```json
{
  "register": "done"
}
```

---

## 2. User Management Endpoints

### GET /api/v1.0/users
**Description**: Get all users
**Response**:
```json
[
  {
    "id": "user-id",
    "fullName": "string",
    "userName": "string",
    "role": "string",
    "isActive": true,
    "createdAt": "date"
  }
]
```

### GET /api/v1.0/users/:id
**Description**: Get user by ID
**Response**:
```json
{
  "id": "user-id",
  "fullName": "string",
  "userName": "string",
  "role": "string",
  "isActive": true,
  "createdAt": "date"
}
```

### PUT /api/v1.0/users/:id/status
**Description**: Update user status (activate/deactivate)
**Body**:
```json
{
  "isActive": true
}
```

### PUT /api/v1.0/users/:id/password
**Description**: Change user password
**Body**:
```json
{
  "newPassword": "string"
}
```

---

## 3. Categories Endpoints

### GET /api/v1.0/categories
**Description**: Get all categories
**Response**:
```json
[
  {
    "id": "category-id",
    "categoryName": "string",
    "createdAt": "date",
    "isActive": true
  }
]
```

### GET /api/v1.0/categories/:id
**Description**: Get category by ID
**Response**:
```json
{
  "id": "category-id",
  "categoryName": "string",
  "createdAt": "date",
  "isActive": true
}
```

### POST /api/v1.0/categories
**Description**: Create new category
**Body**:
```json
{
  "categoryName": "string"
}
```

### PUT /api/v1.0/categories/:id
**Description**: Update category
**Body**:
```json
{
  "categoryName": "string"
}
```

### DELETE /api/v1.0/categories/:id
**Description**: Delete category

---

## 4. Products Endpoints

### GET /api/v1.0/products
**Description**: Get all products
**Response**:
```json
[
  {
    "id": "product-id",
    "productName": "string",
    "price": "number",
    "photo": "string",
    "category": {
      "categoryID": "string",
      "categoryName": "string"
    },
    "userId": "string",
    "createdAt": "date",
    "isActive": true
  }
]
```

### GET /api/v1.0/myProducts
**Description**: Get products created by current user
**Response**: Same as GET /products

### GET /api/v1.0/products/:id
**Description**: Get product by ID
**Response**: Single product object

### POST /api/v1.0/products/store
**Description**: Create new product
**Content-Type**: multipart/form-data
**Body**:
```
productName: string
price: number
categoryID: string
categoryName: string
photo: file (optional)
```

### PUT /api/v1.0/products/update
**Description**: Update product
**Content-Type**: multipart/form-data
**Body**:
```
id: string
productName: string
price: number
categoryID: string
categoryName: string
photo: file (optional)
```

### DELETE /api/v1.0/products/destroy/:id
**Description**: Delete product

---

## 5. Orders Endpoints

### GET /api/v1.0/orders
**Description**: Get all orders
**Response**:
```json
[
  {
    "id": "order-id",
    "customer": {
      "customerName": "string",
      "customerPhone": "string",
      "customerAddress": "string"
    },
    "products": [
      {
        "productID": "string",
        "ProductName": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "status": [
      {
        "statusName": "string",
        "statusDateTime": "date"
      }
    ],
    "orderDateTime": "date",
    "createdAt": "date",
    "isActive": true
  }
]
```

### GET /api/v1.0/orders/:id
**Description**: Get order by ID
**Response**: Single order object

### POST /api/v1.0/orders
**Description**: Create new order
**Body**:
```json
{
  "customerName": "string",
  "customerPhone": "string",
  "customerAddress": "string",
  "products": [
    {
      "productID": "string",
      "ProductName": "string",
      "quantity": "number",
      "price": "number"
    }
  ]
}
```

### PUT /api/v1.0/orders/:id/status
**Description**: Update order status
**Body**:
```json
{
  "statusName": "Pending|In Progress|Completed"
}
```

### GET /api/v1.0/orders/status/:status
**Description**: Get orders by status
**Valid statuses**: Pending, In Progress, Completed, all

### GET /api/v1.0/orders/date-range
**Description**: Get orders by date range
**Query Parameters**:
- startDate: YYYY-MM-DD
- endDate: YYYY-MM-DD

### DELETE /api/v1.0/orders/:id
**Description**: Delete order

---

## 6. Reports Endpoints

### GET /api/v1.0/reports/products/category/:categoryId
**Description**: Get products by category
**Response**: Array of products in the specified category

### GET /api/v1.0/reports/orders/status/:status
**Description**: Get orders by status
**Valid statuses**: Pending, In Progress, Completed, all

### GET /api/v1.0/reports/orders/date-range
**Description**: Get orders by date range
**Query Parameters**:
- startDate: YYYY-MM-DD
- endDate: YYYY-MM-DD

### GET /api/v1.0/reports/orders/status/:status/date-range
**Description**: Get orders by status and date range
**Query Parameters**:
- startDate: YYYY-MM-DD
- endDate: YYYY-MM-DD

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Error message"
}
```

### 401 Unauthorized
```json
{
  "login": "failed, no or Wrong token sent"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "errors": "user name reserved"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to perform operation"
}
```

---

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "fullName": "string",
  "userName": "string",
  "password": "string (hashed)",
  "role": "string",
  "isActive": "boolean",
  "createdAt": "date"
}
```

### Categories Collection
```json
{
  "_id": "ObjectId",
  "categoryName": "string",
  "createdAt": "date",
  "isActive": "boolean"
}
```

### Products Collection
```json
{
  "_id": "ObjectId",
  "productName": "string",
  "price": "number",
  "photo": "string",
  "category": {
    "categoryID": "string",
    "categoryName": "string"
  },
  "userId": "ObjectId",
  "createdAt": "date",
  "isActive": "boolean"
}
```

### Orders Collection
```json
{
  "_id": "ObjectId",
  "customer": {
    "customerName": "string",
    "customerPhone": "string",
    "customerAddress": "string"
  },
  "products": [
    {
      "productID": "string",
      "ProductName": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "status": [
    {
      "statusName": "string",
      "statusDateTime": "date"
    }
  ],
  "orderDateTime": "date",
  "createdAt": "date",
  "isActive": "boolean"
}
```

---

## User Roles

- **Item Manager**: Can manage products and categories
- **Order Manager**: Can manage orders
- **Shop Owner**: Can manage users and view reports

---

## Notes

1. All timestamps are in ISO 8601 format
2. File uploads are handled via multipart/form-data
3. JWT tokens expire after 300 days
4. Password must be at least 6 characters long
5. All endpoints return JSON responses
6. Image files are stored in `public/img/uploads/` directory
