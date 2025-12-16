## Documentazione API

## Notes endpoint

Quensto endpoint è legato alla tabella delle note di un singolo utente.

**Struttura del json:**

```json
{
    "id": 1,
    "name": "Fare la spesa",
    "description": "Comprare il latte, la pasta, ..." or null,
    "createdAt": "2025/05/15",
    "expiryDate": "2025/05/18" or null,
    "deleted": false,
    "tag": "spesa",
    "userId": 1
}
```

| CHIAMATAA  |  RISPOSTA ATTESA |
|---|---|
| GET  | 200  |
| POST  | 201  |
| PUT  | 201  |
| DELETE | 204 |

## Users endpoint

**Struttura del json:**

```json
{
    "id": 1,
    "name": "Andre",
    "email": "example@gmail.com",
    "password": "hash_password",
    "role": "admin"
}
```
