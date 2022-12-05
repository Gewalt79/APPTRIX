# APPTRIX
API с использованием typescript, express

## Регистрация пользователя 

> api/clients/create

* avatar - по этому полю нужно прекрепить фото которое будет обработано
* firstName - имя
* lastName - фамилия
* email - почта
* gender - пол
* password - пароль
* latitude - широта
* longitude - долгота

```json
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxMTEyMzhAeWFuZGV4LnJ1IiwicGVybWlzc2lvbnMiOlsiTUFUQ0giLCJSRUFEIl0sImxhdCI6IjYwLjAyNjc0ODUxOTIwMzA5NiIsImxvbiI6IjMwLjMxMTAxODA1MjE0ODkzNSIsImlhdCI6MTY2OTQxNDkyNCwiZXhwIjoxNjY5NTAxMzI0fQ.-khm6VSyDxXa0vTnedawqYZM40hSguVj8a5kQK5XrWA"
    }
}
```

Ответом после регистрации возвращается токен. Его используем при вызове match и при чтении списка пользователей.

## Получение списка пользователей

> api/clients/list?filter=firstname - нужен токен

Фильтры списка пользователей: filter=gender / firstname / lastname / 100 последнее это максимальное расстояние в метрах от пользователей.

## Match пользователей

> api/clients/match - нужен токен

В зависимости от бизнес логики можно отправлять только id и на сервере уже доставать почту первого и второго пользователя,
ради "оптимизации" я данные которые приходят с клиента сразу же и использую

тело: 
```json
{
    "sender": {
        "id": "1",
        "firstName": "aaaadfg",
        "lastName": "bbbbb",
        "email": "tererer@gmail.COM"
    },
    "receiver": {
        "id": "15",
        "firstName": "Сережа",
        "lastName": "Печорин",
        "email": "s111238@yandex.ru"
    }
}
```
ответ при успехе: 
```json
{
    "success": true,
    "data": {
        "message": "Это взаимно!",
        "isMatch": true - true если взаимно false если не взаимно
    }
}
```
