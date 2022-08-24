const express = require('express')
const port = 3000
const app = express()
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params)

  restaurantOne = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurantOne })
})

app.get('/search', (req, res) => {
  console.log(req.query)
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    if (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant
    } else if (restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant
    }
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`the Express run on http://localhost:${port}`)
})



