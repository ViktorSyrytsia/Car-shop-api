## Auto parts store
Test task for Chatbots.Studio
A simple implementation of the REST API, which simulates the work of an online auto parts store, with all CRUD operations

## The technology that I used:

  * Express
  * Typescript
  * Typegoose to define Mongoose models using TypeScript classes
  * Mongo DB to save basic data
  * Redis DB to authorization and save user sessions (with express-sessions)
  
 ## Commands:
 (dont forget to place .env file into ./src/config folder)
  * yarn watch - to compile from typescript 
  * yarn dev - to run javascript in ./dest folder 
  * yarn lint - to run tslint
  
 ## DB structure visualization:
 ![structure](https://i.imgur.com/3JgzisY.png)
 
 ## Main CRUD operations and routes : 
 * User 
 ```js
GET 'http://localhost:8080/users' //Find all users
GET 'http://localhost:8080/users/{id}' //Find user by user ID
DELETE 'http://localhost:8080/users/{id}' //Delete user by user ID
PATCH 'http://localhost:8080/users/{id}' //Update user by user ID
POST 'http://localhost:8080/auth/sign-up' //Registrate a new user
POST 'http://localhost:8080/auth/sign-in' //Login by user email and password
GET 'http://localhost:8080/auth/logout' //Logout (destroy session and delete cookie)
```
 * Product 
 ```js
GET 'http://localhost:8080/products' //Find all products
GET 'http://localhost:8080/products/{id}' //Find product by product ID
DELETE 'http://localhost:8080/products/{id}' //Delete product by product ID
PATCH 'http://localhost:8080/products/{id}' //Update product by product ID
POST 'http://localhost:8080/products/' //Create new product
GET 'http://localhost:8080/products/car/{id}' //Find all products where product.car === id 
GET 'http://localhost:8080/products/provider/{id}' //Find all products where product.provider === id 
GET 'http://localhost:8080/products/type/{id}' //Find all products where product.productType === id 
```
 * Orders 
 ```js
GET 'http://localhost:8080/orders' //Find all orders
GET 'http://localhost:8080/orders/{id}' //Find order by order ID
DELETE 'http://localhost:8080/orders/{id}' //Delete order by order ID
PATCH 'http://localhost:8080/orders/{id}' //Update order by order ID
POST 'http://localhost:8080/orders/' //Create new order
GET 'http://localhost:8080/orders/status/{status}' //Find all orders where order.status === status 
GET 'http://localhost:8080/orders/customer/{id}' //Find all orders where order.customer === id  
GET 'http://localhost:8080/orders/find-orders/my' //Find all orders of current logged user
```
 * Car 
 ```js
GET 'http://localhost:8080/cars' //Find all cars
GET 'http://localhost:8080/cars/{id}' //Find car by car ID
DELETE 'http://localhost:8080/cars/{id}' //Delete car by car ID
PATCH 'http://localhost:8080/cars/{id}' //Update car by car ID
POST 'http://localhost:8080/cars/' //Create new car
```
 * ProductType 
 ```js
GET 'http://localhost:8080/product-types' //Find all product-types
GET 'http://localhost:8080/product-types/{id}' //Find product-type by product ID
DELETE 'http://localhost:8080/product-types/{id}' //Delete  product-type by product ID
PATCH 'http://localhost:8080/product-types/{id}' //Update  product-type by product ID
POST 'http://localhost:8080/product-types' //Create new product-type
```
 * Provider 
 ```js
GET 'http://localhost:8080/providers' //Find all providers
GET 'http://localhost:8080/providers/{id}' //Find provider by provider ID
DELETE 'http://localhost:8080/providers/{id}' //Delete provider by provider ID
PATCH 'http://localhost:8080/providers/{id}' //Update provider by provider ID
POST 'http://localhost:8080/providers' //Create new provider
```
* Also you can feel free to use features like sort, filter, fields, paginate with all "find all" routes:
 ```js
GET 'http://localhost:8080/products?sort=-price&price[gte]=3000&page=2&limit=20'
GET 'http://localhost:8080/products?fields=price,car,type
GET 'http://localhost:8080/products?name=GTX3000
```
