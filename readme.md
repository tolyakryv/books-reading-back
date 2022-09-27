PORT=5000
BACKEND_URL=https://book-reading-08.herokuapp.com
FRONTEND_URL=http://localhost:3000

Authorization endpoints: /api/auth
POST /api/auth/register - res.status(201).json({
    user: {
    name,
    email,  
    }
  });

POST /api/auth/login - res.json({
    token,
    user: {
    email,
    },
  });

GET /api/auth/logout - res.status(204);

GET /api/auth/current - res.status(200).json({
       user: {
        name,
        email,
       },
     });

GET /api/auth/google - email, token, redirect to front (ще в процесі...хто робить на фронті реєстрацію, в відео про Свагер, яке Надя нам скидала десь на 26:30 розказують як на фронті цей редірект зробить, то вже як буде готово)


Book endpoints: /api/book
POST /api/book/ - res.json({
title
author
publicDate
amountPages
status:"goingToRead"
rating:0
resume:""
   });

GET /api/book/ - res.json({
        result
    })

PATCH /api/book/:bookId - res.json({
rating,
resume
    })

PATCH /api/book/:bookId/status - res.json({
    status
    })

Training endpoints: /api/train

поки так, далі буде завтра ...
