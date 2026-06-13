# ABD Freelance - Database Schema

## MongoDB Collections

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  avatar: String (URL),
  bio: String,
  userType: String (enum: ['client', 'freelancer'], required),
  phone: String,
  
  // Profile Info
  isVerified: Boolean (default: false),
  verificationCode: String,
  verificationCodeExpires: Date,
  
  // Location
  country: String,
  city: String,
  timezone: String,
  
  // Ratings
  rating: Number (min: 0, max: 5),
  reviewCount: Number (default: 0),
  
  // Account Status
  status: String (enum: ['active', 'suspended', 'banned'], default: 'active'),
  lastLogin: Date,
  
  // Subscription
  subscription: {
    plan: String (enum: ['free', 'vip']),
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
    renewalDate: Date
  },
  
  // Freelancer Specific
  skills: [String],
  languages: [String],
  education: [
    {
      school: String,
      degree: String,
      field: String,
      startYear: Number,
      endYear: Number
    }
  ],
  experience: [
    {
      company: String,
      title: String,
      description: String,
      startDate: Date,
      endDate: Date
    }
  ],
  portfolio: [String],
  certifications: [String],
  totalEarnings: Number (default: 0),
  withdrawalBalance: Number (default: 0),
  completedOrders: Number (default: 0),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Gigs Collection
```javascript
{
  _id: ObjectId,
  sellerId: ObjectId (ref: Users, required),
  title: String (required),
  description: String (required),
  category: String (required),
  subcategory: String,
  tags: [String],
  
  // Pricing & Delivery
  price: Number (required),
  deliveryTime: Number (days, required),
  revisions: Number (default: 1),
  
  // Media
  images: [String],
  video: String (URL),
  
  // Details
  packages: [
    {
      name: String,
      price: Number,
      deliveryTime: Number,
      description: String
    }
  ],
  
  // Status
  status: String (enum: ['pending', 'active', 'inactive', 'rejected'], default: 'pending'),
  approvalDate: Date,
  rejectionReason: String,
  
  // Features
  isFeatured: Boolean (default: false),
  featuredUntil: Date,
  
  // Stats
  rating: Number,
  reviewCount: Number (default: 0),
  orderCount: Number (default: 0),
  views: Number (default: 0),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // SEO
  slug: String (unique),
  metaDescription: String
}
```

### 3. Orders Collection
```javascript
{
  _id: ObjectId,
  gigId: ObjectId (ref: Gigs, required),
  buyerId: ObjectId (ref: Users, required),
  sellerId: ObjectId (ref: Users, required),
  
  // Order Details
  title: String,
  description: String,
  price: Number (required),
  quantity: Number (default: 1),
  customization: String,
  
  // Status
  status: String (enum: ['pending', 'in-progress', 'delivered', 'completed', 'cancelled', 'disputed'], default: 'pending'),
  
  // Timeline
  createdAt: Date,
  startDate: Date,
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  completionDate: Date,
  
  // Delivery
  deliverables: [String] (file URLs),
  deliveryMessage: String,
  
  // Revisions
  revisionCount: Number (default: 0),
  maxRevisions: Number,
  revisionRequests: [
    {
      requesterType: String (enum: ['buyer', 'seller']),
      message: String,
      createdAt: Date,
      status: String (enum: ['pending', 'accepted', 'rejected'])
    }
  ],
  
  // Communication
  messages: [ObjectId] (ref: Messages),
  
  updatedAt: Date
}
```

### 4. Payments Collection
```javascript
{
  _id: ObjectId,
  orderId: ObjectId (ref: Orders, required),
  buyerId: ObjectId (ref: Users, required),
  sellerId: ObjectId (ref: Users, required),
  
  // Payment Details
  amount: Number (required),
  currency: String (default: 'EUR'),
  status: String (enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending'),
  
  // Commission Calculation
  platformCommission: Number, // 10% of amount
  sellerEarning: Number,
  
  // Stripe Info
  stripePaymentIntentId: String,
  stripeChargeId: String,
  paymentMethodId: String,
  
  // Timestamps
  createdAt: Date,
  completedAt: Date,
  refundedAt: Date,
  refundReason: String
}
```

### 5. Messages Collection
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: Users, required),
  receiverId: ObjectId (ref: Users, required),
  orderId: ObjectId (ref: Orders),
  
  // Message Content
  message: String (required),
  attachments: [String] (file URLs),
  
  // Status
  isRead: Boolean (default: false),
  readAt: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Reviews Collection
```javascript
{
  _id: ObjectId,
  orderId: ObjectId (ref: Orders, required, unique),
  reviewerId: ObjectId (ref: Users, required),
  revieweeId: ObjectId (ref: Users, required),
  
  // Review Content
  rating: Number (min: 1, max: 5, required),
  comment: String,
  
  // Categories (optional detailed ratings)
  communicationRating: Number (min: 1, max: 5),
  deliveryRating: Number (min: 1, max: 5),
  valueRating: Number (min: 1, max: 5),
  
  // Review Status
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  
  // Seller Response
  sellerResponse: String,
  sellerResponseDate: Date,
  
  // Engagement
  helpful: Number (default: 0),
  unhelpful: Number (default: 0),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Subscriptions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, required),
  plan: String (enum: ['vip'], required),
  
  // Billing
  price: Number (4.99 for VIP),
  currency: String (default: 'EUR'),
  billingCycle: String (enum: ['monthly', 'yearly'], default: 'monthly'),
  
  // Dates
  startDate: Date (required),
  endDate: Date (required),
  renewalDate: Date,
  
  // Status
  status: String (enum: ['active', 'cancelled', 'expired'], default: 'active'),
  isAutoRenew: Boolean (default: true),
  
  // Stripe Info
  stripeSubscriptionId: String,
  stripeCustomerId: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  cancelledAt: Date
}
```

### 8. Notifications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, required),
  
  // Notification Details
  type: String (enum: ['order', 'message', 'review', 'payment', 'system'], required),
  title: String (required),
  message: String (required),
  
  // Related Data
  relatedId: ObjectId, // orderId, messageId, etc.
  relatedType: String,
  
  // Status
  isRead: Boolean (default: false),
  readAt: Date,
  
  // Timestamps
  createdAt: Date
}
```

### 9. Reports Collection
```javascript
{
  _id: ObjectId,
  reporterId: ObjectId (ref: Users, required),
  reportedUserId: ObjectId (ref: Users, required),
  
  // Report Details
  type: String (enum: ['abuse', 'scam', 'spam', 'inappropriate'], required),
  description: String (required),
  evidence: [String] (URLs),
  
  // Related Data
  orderId: ObjectId (ref: Orders),
  gigId: ObjectId (ref: Gigs),
  
  // Status
  status: String (enum: ['open', 'investigating', 'resolved', 'dismissed'], default: 'open'),
  resolution: String,
  
  // Timestamps
  createdAt: Date,
  resolvedAt: Date
}
```

### 10. Announcements Collection
```javascript
{
  _id: ObjectId,
  adminId: ObjectId (ref: Users, required),
  
  // Content
  title: String (required),
  message: String (required),
  link: String (optional),
  
  // Targeting
  targetUsers: String (enum: ['all', 'clients', 'freelancers', 'vip'], default: 'all'),
  
  // Media
  image: String,
  
  // Status
  isActive: Boolean (default: true),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date
}
```

### 11. Categories Collection
```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  slug: String (unique),
  description: String,
  icon: String (URL),
  image: String (URL),
  
  // Hierarchy
  parentId: ObjectId (ref: Categories),
  
  // Display
  order: Number,
  isActive: Boolean (default: true),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 12. Coupons Collection
```javascript
{
  _id: ObjectId,
  code: String (unique, uppercase, required),
  description: String,
  
  // Discount
  discountType: String (enum: ['fixed', 'percentage']),
  discountValue: Number,
  minOrderAmount: Number,
  
  // Usage
  maxUses: Number,
  usageCount: Number (default: 0),
  maxUsesPerUser: Number (default: 1),
  
  // Validity
  startDate: Date,
  endDate: Date,
  
  // Status
  isActive: Boolean (default: true),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ userType: 1 })
db.users.createIndex({ createdAt: -1 })

// Gigs
db.gigs.createIndex({ sellerId: 1 })
db.gigs.createIndex({ category: 1 })
db.gigs.createIndex({ status: 1 })
db.gigs.createIndex({ title: 'text', description: 'text' })
db.gigs.createIndex({ isFeatured: 1, featuredUntil: -1 })

// Orders
db.orders.createIndex({ buyerId: 1 })
db.orders.createIndex({ sellerId: 1 })
db.orders.createIndex({ gigId: 1 })
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ createdAt: -1 })

// Payments
db.payments.createIndex({ orderId: 1 })
db.payments.createIndex({ buyerId: 1 })
db.payments.createIndex({ sellerId: 1 })
db.payments.createIndex({ status: 1 })

// Messages
db.messages.createIndex({ senderId: 1 })
db.messages.createIndex({ receiverId: 1 })
db.messages.createIndex({ orderId: 1 })
db.messages.createIndex({ createdAt: -1 })

// Reviews
db.reviews.createIndex({ revieweeId: 1 })
db.reviews.createIndex({ orderId: 1 }, { unique: true })
db.reviews.createIndex({ createdAt: -1 })
```

---

**Last Updated**: June 2026
