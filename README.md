EXPRESIÓN REGULAR:

https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet

MIRAR PARÁMETROS DE LA URL:

https://www.botify.com/learn/basics/what-are-url-parameters

ENDPOINTS:

GET /client/id              -> Devuelve un cliente por id
GET /restaurant/id          -> Devuelve un restaurante por id
GET / booking/id            -> Devuelve una reserva por id

DELETE /restaurant/id       -> Elimina un restaurante por id
DELETE restaurant           -> Elimina todas las reservas de los restaurantes (escuchar audio wasap)
DELETE /booking/id          -> Elimina una reserva por id

POST /client                -> Crea un cliente
POST /restaurant            -> Crea un restaurante
POST /booking               -> Crea una reserva


{
    "firstName": "Pepe",
    "lastName": "Gonzalez",
    "email": "pepito@gon.com",
    "phoneNumber": "+34 620202020",
    "DNI": "87654321F"
}


{
    "name": "Casa Manolo",
    "CIF": "A12345678",
    "address": "Calle Alberto Aguilera 33, Madrid, 28015"
}

{
    "date": "Sat Sep 13 275760 00:00:00 GMT+0000",
    "clientID": "6567c0649072d32e1df23c05",
    "restaurantID": "6567c6aa36f33608219e13cb"
}
