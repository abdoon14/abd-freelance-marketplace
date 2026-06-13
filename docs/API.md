# ABD Freelance API Documentation

## Base URL
```
http://localhost:5000/api/v1
Production: https://api.abdfreelance.com/api/v1
```

## Authentication

All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "client" // or "freelancer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "client"
  },
  "token": "jwt_token"
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "token": "jwt_token"
}
```

### Verify Email
```http
POST /auth/verify-email
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "verification_code"
}
```

### Reset Password
```http
POST /auth/reset-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

---

## User Endpoints

### Get Current User Profile
```http
GET /users/profile
Authorization: required
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "avatar_url",
    "bio": "User bio",
    "rating": 4.8,
    "reviewCount": 150,
    "userType": "freelancer",
    "isVerified": true,
    "joinDate": "2024-01-01T00:00:00Z"
  }
}
```

### Get User by ID
```http
GET /users/:userId
```

### Update User Profile
```http
PUT /users/profile
Authorization: required
Content-Type: multipart/form-data
```

**Request Body:**
```
firstName: "John"
lastName: "Doe"
bio: "Professional developer"
avatar: <file>
```

### Get User Skills (Freelancer)
```http
GET /users/:userId/skills
```

### Add User Skills
```http
POST /users/skills
Authorization: required
```

**Request Body:**
```json
{
  "skills": ["JavaScript", "React", "Node.js"]
}
```

---

## Gig Endpoints

### Create Gig
```http
POST /gigs
Authorization: required
Content-Type: multipart/form-data
```

**Request Body:**
```
title: "I will create a professional website"
description: "I will create a responsive website..."
category: "web-development"
price: 100
deliveryTime: 7
images: <files>
```

**Response:**
```json
{
  "success": true,
  "gig": {
    "id": "gig_id",
    "title": "I will create a professional website",
    "description": "...",
    "price": 100,
    "deliveryTime": 7,
    "category": "web-development",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get All Gigs
```http
GET /gigs?category=web-development&minPrice=50&maxPrice=500&page=1&limit=20&search=website
```

**Response:**
```json
{
  "success": true,
  "gigs": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "total": 100
  }
}
```

### Get Gig Details
```http
GET /gigs/:gigId
```

### Update Gig
```http
PUT /gigs/:gigId
Authorization: required
Content-Type: multipart/form-data
```

### Delete Gig
```http
DELETE /gigs/:gigId
Authorization: required
```

### Get My Gigs
```http
GET /gigs/my-gigs
Authorization: required
```

### Feature Gig
```http
POST /gigs/:gigId/feature
Authorization: required
```

---

## Order Endpoints

### Create Order
```http
POST /orders
Authorization: required
```

**Request Body:**
```json
{
  "gigId": "gig_id",
  "quantity": 1,
  "customization": "optional customization details"
}
```

### Get My Orders
```http
GET /orders?status=completed&page=1&limit=20
Authorization: required
```

### Get Order Details
```http
GET /orders/:orderId
Authorization: required
```

### Update Order Status
```http
PUT /orders/:orderId/status
Authorization: required
```

**Request Body:**
```json
{
  "status": "in-progress" // or "completed", "cancelled"
}
```

### Request Revision
```http
POST /orders/:orderId/revisions
Authorization: required
```

**Request Body:**
```json
{
  "message": "Please adjust the colors"
}
```

### Submit Delivery
```http
POST /orders/:orderId/deliver
Authorization: required
Content-Type: multipart/form-data
```

**Request Body:**
```
files: <files>
message: "Your order is complete"
```

### Cancel Order
```http
POST /orders/:orderId/cancel
Authorization: required
```

---

## Payment Endpoints

### Process Payment
```http
POST /payments/process
Authorization: required
```

**Request Body:**
```json
{
  "orderId": "order_id",
  "paymentMethodId": "stripe_payment_method_id"
}
```

### Get Payment History
```http
GET /payments/history?page=1&limit=20
Authorization: required
```

### Get Earnings
```http
GET /payments/earnings
Authorization: required
```

**Response:**
```json
{
  "success": true,
  "earnings": {
    "total": 5000,
    "available": 4500,
    "pending": 500,
    "currency": "EUR"
  }
}
```

### Request Payout
```http
POST /payments/payout
Authorization: required
```

**Request Body:**
```json
{
  "amount": 1000,
  "bankAccount": "account_number"
}
```

---

## Message Endpoints

### Send Message
```http
POST /messages
Authorization: required
```

**Request Body:**
```json
{
  "receiverId": "user_id",
  "message": "Hello, I'm interested in your service"
}
```

### Get Chat History
```http
GET /messages/:userId?page=1&limit=50
Authorization: required
```

### Get All Conversations
```http
GET /messages
Authorization: required
```

### Mark Message as Read
```http
PUT /messages/:messageId/read
Authorization: required
```

---

## Review Endpoints

### Create Review
```http
POST /reviews
Authorization: required
```

**Request Body:**
```json
{
  "orderId": "order_id",
  "rating": 5,
  "comment": "Great service!",
  "revieweeId": "freelancer_id"
}
```

### Get Reviews for User
```http
GET /reviews/:userId?page=1&limit=20
```

### Update Review
```http
PUT /reviews/:reviewId
Authorization: required
```

### Delete Review
```http
DELETE /reviews/:reviewId
Authorization: required
```

### Reply to Review
```http
POST /reviews/:reviewId/reply
Authorization: required
```

**Request Body:**
```json
{
  "reply": "Thank you for the feedback!"
}
```

---

## Subscription Endpoints

### Get Subscription Plans
```http
GET /subscriptions/plans
```

### Subscribe to VIP
```http
POST /subscriptions
Authorization: required
```

**Request Body:**
```json
{
  "plan": "vip",
  "paymentMethodId": "stripe_payment_method_id"
}
```

### Get Current Subscription
```http
GET /subscriptions/current
Authorization: required
```

### Cancel Subscription
```http
DELETE /subscriptions
Authorization: required
```

---

## Admin Endpoints

### Get All Users
```http
GET /admin/users?page=1&limit=20&search=email
Authorization: required (Admin only)
```

### Get All Gigs (Pending)
```http
GET /admin/gigs?status=pending&page=1&limit=20
Authorization: required (Admin only)
```

### Approve Gig
```http
POST /admin/gigs/:gigId/approve
Authorization: required (Admin only)
```

### Reject Gig
```http
POST /admin/gigs/:gigId/reject
Authorization: required (Admin only)
```

### Get Platform Statistics
```http
GET /admin/statistics
Authorization: required (Admin only)
```

### Send Announcement
```http
POST /admin/announcements
Authorization: required (Admin only)
```

**Request Body:**
```json
{
  "title": "New feature announcement",
  "message": "We've launched a new feature...",
  "targetUsers": "all" // or "clients", "freelancers"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "details": ["Field is required"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication token is missing or invalid"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An error occurred while processing your request"
}
```

---

## Rate Limiting

- **Free Tier**: 100 requests per hour
- **Premium Users**: 1000 requests per hour
- **Admin**: Unlimited

---

## Webhooks

### Payment Completed
```
POST https://your-domain.com/webhooks/payment-completed
```

### Order Completed
```
POST https://your-domain.com/webhooks/order-completed
```

### Gig Approved
```
POST https://your-domain.com/webhooks/gig-approved
```

---

**Last Updated**: June 2026
**API Version**: v1.0
