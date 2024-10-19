
# 🥣🍲 Recipe Management Application - Backend

## 🌟 Overview

This project is a **Recipe Management API** that allows users to create, read, update, and delete recipes. It supports **user authentication** and lets users attach notes to recipes, providing a personalized experience. This API is built with **Node.js** and **MongoDB** and follows best practices for RESTful API development.

The project’s core goal is to offer a complete backend service for managing recipes, including nutrition details, notes, and reviews. Users can update their notes on recipes and view their changes in real-time.






## ✨ Features

- **🔐 User Authentication**: Users must register and log in to access the API.
- **📖 CRUD Operations on Recipes**: Create, Read, Update, and Delete recipes with details.
- **📝 Notes on Recipes**: Users can add, update, and delete notes specific to a recipe.
- **🥗 Nutrition Information**: Each recipe can include detailed nutritional information.
- **⭐ Reviews Support**: Add and manage reviews for recipes.
- **⏳ Timestamps**: Automatically record creation and update times for all resources.
- **🖼️ Image Support**: Recipes can store image URLs for visual appeal.

## 🛠️ Technologies Used

- **🔙 Backend:** Node.js, Express
- **💾 Database:** MongoDB
- **🔑 Authentication:** JSON Web Tokens (JWT)
- **📧 Email Service:** Nodemailer

## 📦 Dependencies

Here’s a list of all the dependencies used in this project along with their versions:

```bash{
"bcryptjs": "^2.4.3",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.21.1",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.7.2",
"multer": "^1.4.5-lts.1",
"nodemailer": "^6.9.15",
"nodemon": "^3.1.7"
  ```


## 🚀 Setup and Installation

Clone the project

```bash
  git clone https://github.com/MaulikPatel63/Recipe_Management_App.git
```

Go to the project directory

```bash
  cd Recipe_Management_App/backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

API will be available at:

```bash
  http://localhost:5000
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`=`<MONGO_URI>`

`PORT`=`<Your_Port`

`JWT_SECRET`=`<Your_Secret>`


## 🌐 Deployment

The backend is deployed on Vercel.

- **Live Backend URL :** [https://personal-blog-app-frontend-bay.vercel.app/](https://personal-blog-app-frontend-bay.vercel.app/)


## API Reference

#### User Signup

```http
  POST /api/v1/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your username |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

#### User Signup

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

#### Create Recipe

```http
  POST /api/v1/recipe/recipe-add
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `recipeName` | `string` | **Required**. Your Recipe Name |
| `recipeTitle` | `string` | **Required**. Your Recipe Title |
| `ingredients` | `string` | **Required**. Your Recipe ingredients |
| `instructions` | `array` | **Required**. user Recipe instructions |
| `cuisineType` | `string` | **Required**. Your Recipe cuisineType |
| `cookingTime` | `number` | **Required**. Your Recipe cookingTime|
| `servings` | `number` | **Required**. Your Recipe servings |
| `image` | `string` | **Required**. Recipe image url |
| `nutrition` | `object` | **Required**. Recipe nutrition |

#### Get All Recipe

```http
  GET /api/v1/recipe/recipe-get
```

| Parameter | Description |
| :-------- ||:-------------------------------- |
| `token` | **Required**. token from headers  |

#### Get All Recipe

```http
  GET /api/v1/recipe/recipe-get/${id}
```

| Parameter | Description |
| :-------- ||:-------------------------------- |
| `is` | **Required**. is to fetch specific recipe data |
| `token` | **Required**. token from headers  |

#### Get Recipe By ID

```http
  GET /api/v1/recipe/recipe-get/${recipeName}
```

| Parameter | Description |
| :-------- ||:-------------------------------- |
| `recipeName` | **Required**. id to fetch specific Recipe data |
| `token` | **Required**. token from headers  |


#### Update Recipe By ID

```http
  GET /api/v1/recipe/recipe-update/${id}
```

| Parameter | Description |
| :-------- ||:-------------------------------- |
| `id` | **Required**. id to update specific Recipe data |
| `token` | **Required**. token from headers  |


#### Delete Recipe By ID

```http
  GET /api/v1/recipe/recipe-delete/${id}
```

| Parameter | Description |
| :-------- ||:-------------------------------- |
| `id` | **Required**. id to delete specific Recipe data |
| `token` | **Required**. token from headers  |


## 📚 Additional Details

- **Error Handling:**: Returns meaningful error messages for bad requests and server issues.
- **Authentication Middleware**: Secures routes using JWT-based authentication.
- **Image Handling**: Multer is used for uploading recipe images.
