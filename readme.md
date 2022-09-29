PORT=5000
BACKEND_HEROKUAPP=https://book-reading-08.herokuapp.com
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

Authorization endpoints: 
POST /api/auth/register - res.status(201).json({user:{name,email,id},}); - реєстрація

POST /api/auth/login - res.status(200).json({token, user:{email},}); - логін

GET /api/auth/logout - res.status(204); - логаут

GET /api/auth/current - res.status(200).json({user:{name,email},}); - поточний користувач

GET /api/auth/google - access_token; - Гугл авторизація

Book endpoints: 
POST /api/book/ - res.json({title,author,publicDate,amountPages,status:"goingToRead",rating:0,resume:"",inTrain:false}); - додати книжку

GET /api/book/ - res.json({
[
{_id,title,author,publicDate,amountPages,
status:"goingToRead",rating:0,resume:"",inTrain:false},
{_id,title,author,publicDate,amountPages,
status:"goingToRead",rating:0,resume:"",inTrain:false},
]
}); - отримати всі книжки масив

PATCH /api/book/:bookId - res.json({rating,resume}); - додати рецензію


Training endpoints:
GET /api/train/  - res.json({_id,startDate,finishDate,owner,book[],
statistic:[{date, amountPages}]}); - отримати тренування

POST /api/train/  - res.json({start,finis}); - додати тренування

PATCH /api/train/statistic  - res.json({statistic:[{date, amountPages}]}); - додати статистику

PATCH /api/train/:bookId  - res.json({book[title,author,publicDate,amountPages,status:readingNow,_id]}); - додати книжку до тренування

DELETE /api/train/:bookId  - res.json({book[]}); - видалити книжку з тренування

PATCH /api/train/:bookId/status - res.json({status}); - змінити статус книжки 

