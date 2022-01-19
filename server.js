const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const {rootValue, schema} = require('./graphQLSchema/schema')
const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.send("Server up and Running")
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}));


app.listen(PORT, () => console.log(`listening on port ${PORT}`))