const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    getAllProducts: [PopulatedProducts!]
    getProductsBy(category: String!): [Product]
    getCategories: [PopulatedCategories!]
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
  }

  type Mutation {
    addProduct(product: AddProductInput): Product!
    addCategory(category: AddCategoryInput): Category!
  }

  input AddProductInput {
    name: String!
    description: String!
    imageUrl: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: [String!]!
  }

  input AddCategoryInput {
    name: String
    products: [String]
  }
`);
