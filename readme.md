# photo album api

## Register
POST /register
```json
{
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "password": "..."
}
```

## Login
POST /login
```json
{
  "email": "...",
  "password": "..."
}
```

## Create album
POST /albums
```json
{
	"title": "..."
}
```

## Create photo
POST /photos
```json
{
	"title": "...",
	"url": "...",
	"comment": "..." (optional)
}
```

## Put multiple photos in album
POST /albums/albumId
```json
[...photoIds]
```

## Put photo in album
PUT /albums/albumId/photoId

## Get albums
GET /albums

## Get album
GET /albums/albumId

## Get photos
GET /photos

## Get photo
GET /photos/photoId

## Remove photo from album
DELETE /albums/albumId/photoId

## Delete photo
DELETE /photos/photoId

## Delete album
DELETE /albums/albumId