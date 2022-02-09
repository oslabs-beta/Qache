const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
		invalidate: Boolean
    getAllProducts: [PopulatedProducts]
    getProductsBy(category: String!): [Product]
    filterProductsBy(filter: FilterProductsInput): [Product]
    getCategories: [PopulatedCategories]
    getCategoryBy(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    imageUrl: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: [String!]!
    inCart: Boolean
  }

  type PopulatedProducts {
    id: ID!
    name: String!
    description: String!
    imageUrl: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: [Category]!
    inCart: Boolean
  }

  type Category {
    id: ID!
    name: String!
    products: [String]
  }

  type PopulatedCategories {
    id: ID!
    name: String!
    description: String!
    imageUrl: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    products: [Product]!
    inCart: Boolean
  }

  type Mutation {
    addProduct(product: AddProductInput): Product!
    addCategory(category: AddCategoryInput): Category!
    deleteProduct(id: ID!): Boolean
    deleteCategory(id: ID!): Boolean
    updateProduct(product: UpdateProductInput): PopulatedProducts
    updateCategory(category: UpdateCategoryInput): Category
  }

  input AddProductInput {
    name: String!
    description: String!
    imageUrl: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: [String!]!
    inCart: Boolean
  }

  input AddCategoryInput {
    name: String
    products: [String]
  }

  input UpdateProductInput {
    id: ID!
    name: String
    description: String
    imageUrl: String
    quantity: Int
    price: Float
    onSale: Boolean
    category: [String!]
    inCart: Boolean
  }

  input UpdateCategoryInput {
    id: ID!
    name: String
    products: [String]
  }

  input FilterProductsInput {
    onSale: Boolean
    inCart: Boolean
  }
`);
