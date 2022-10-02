PORT=5000
BACKEND_URL=https://book-reading-08.herokuapp.com
FRONTEND_URL=http://localhost:3000

Authorization endpoints: 
POST /api/auth/register - res.status(201).json({user:{name,email,id},}); - реєстрація 
(для перевірки на Постман передать в тіло об*єкт{
    "name":"Test11",
    "email":"test11@gmail.com",
    "password":"1111Aa",
    "confirmPassword":"1111Aa"
})

POST /api/auth/login -  res.status(200).json({token,refreshToken,sid: newSession._id,
user: {email}, - логін (для перевірки на Постман передать втіло об*єкт{
    "email":"test11@gmail.com",
    "password":"1111Aa"
})

GET /api/auth/logout - res.status(204); - логаут (для перевірки на Постман передать токен в параметр авторизації)

GET /api/auth/current - res.status(200).json({user:{name,email},}); - поточний користувач (для перевірки на Постман передать токен в параметр авторизації)

GET /api/auth/google - access_token,refreshToken,sid; - Гугл авторизація
POST /api/auth/refresh-
req.body(refreshToken)
res.json{
sid: newSession.\_id,
newToken,
newRefreshToken

        }

Book endpoints:
POST /api/book/ - Додавання книжки
req.body({
title: Joi.string()
author: Joi.string()
publicDate: Joi.number()
amountPages:Joi.number()
})

res.body({
"result": {
"title": "Good Work",
"author": "People",
"publicDate": 1900,
"amountPages": 50,
"status": "goingToRead",
"rating": 0,
"resume": "",
"owner": "633409513a89db83049541ea",
"\_id": "633979750de358723f0faca1"
}
})

GET /api/book/ - отримання всіх книжок
res.json({
"result": [
{
"\_id": "63396e8440286b450648c6a2",
"title": "Fox and Wolf",
"author": "People",
"publicDate": 1900,
"amountPages": 50,
"status": "goingToRead",
"rating": 0,
"resume": "",
"owner": "633409513a89db83049541ea"
},
{
"\_id": "6339738c9e22d985c0c0fad2",
"title": "Good Work",
"author": "People",
"publicDate": 1900,
"amountPages": 50,
"status": "goingToRead",
"rating": 0,
"resume": "",
"owner": "633409513a89db83049541ea"
},
]
});

PATCH /api/book/:bookId - Додавання рецензії
req.body{
rating: Joi.number().integer().min(1).max(5).required(),
resume: Joi.string().min(1).max(50)
}
res.json({rating,resume});

Training endpoints:
GET /api/train/ - res.json({\_id,startDate,finishDate,owner,book[],
statistic:[{date, createAt, amountPages}]}); - отримати тренування

POST /api/train/ - res.json({startDate,finishDate,book[]}); - додати тренування

PATCH /api/train/statistic - res.json({statistic:[{date, createAt amountPages}]}); - додати статистику

DELETE /api/train/ - res.json("Delete train"); - видалення тренування

PATCH /api/train/:bookId/status - res.json({status}); - змінити статус книжки
