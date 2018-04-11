const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// const GITHUB_API_TOKEN = '170271f9705ea4dcaa84933f2ff1915054b5643b'
var GithubGraphQLApi = require('node-github-graphql')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var github = new GithubGraphQLApi({
  Promise: require('bluebird'),
  token: '170271f9705ea4dcaa84933f2ff1915054b5643b',
  userAgent: 'Hello', // Optional, if not specified, a default user agent will be used
  debug: true
})

app.get('/', function (req, res) {
  var obj = []
  github.query(`
{
  search(query: "is:public", type: REPOSITORY, first: 100) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          stargazers {
            totalCount
          }          
        }
      }
    }
  }
}
`).then(function (response) {
    response.data.search.edges.forEach(function (item) {
      obj.push({name: item.node.name, starsCount: item.node.stargazers.totalCount})
      console.log(JSON.stringify(obj))
    })
    res.send(obj)
  }).catch((err) => { console.log(err) })
// res.send('hello world')
})

app.listen(process.env.PORT || 8081)
