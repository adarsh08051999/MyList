# MyList Feature

# NodeJs version
node v16.20.2 (npm v8.19.4)
use `nvm use 16` to switch to node v16

# Setup
1) run postgres server and update .env.example file with the credentials and rename it as .env
2) to get postgres table setup run migrations by running `npm run migrate:run`
3) build the program by using `npm run build`
4) run the server by using `npm run dev`

# APIs
# items has to be passed as `M(id)` and `T(id)` for movie and Tv series with comma separated for API 2 & 3

1) List My Items - GET call -

curl --location 'http://localhost:4000/getItems?userId=1' 

2) Add to My List - POST call - 

curl --location 'http://localhost:4000/addItems' \
--header 'Content-Type: application/json' \
--data '{
    "userId": 1,
    "items": "M23,M24,M31,M34,T1,T2,T4"
}'


3) Remove from My List - POST call - 

curl --location 'http://localhost:4000/removeItems' \
--header 'Content-Type: application/json' \
--data '{
    "userId": 1,
    "items": "M23,M24,T1"
}'






