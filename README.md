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


Ответом после регистрации возвращается токен. Его используем при вызове match и при чтении списка пользователей.

## Получение списка пользователей

> api/clients/list?filter=firstname

Фильтры списка пользователей: filter=gender / firstname / lastname / 100 последнее это максимальное расстояние в метрах от пользователей.

## Match пользователей

> api/clients/6/match  6 - Это пользователь который лайкает

Передаем сначала id пользователя который лайкает, потом передаем id пользователя которого лайкают.
В случае если это взаимно возвращает email пользователя которого лайкнули


тело: 
```json
{
    "receiver": {
        "id": "13" 13 - Это id пользователя которого лайкнули
    }
}
```
ответ при успехе: 
```json
{
    "success": true,
    "data": {
        "user_email": {
            "ret": "s111238@yandex.ru"   - почта человека которого лайкнули
        }
    }
}
```

### Чего нет?
- Валидации данных
- Отправки сообщения на почту пользователям

![image](https://user-images.githubusercontent.com/89931949/203987511-1400db83-56d8-48d9-9cd9-e2aad6f467ce.png)
