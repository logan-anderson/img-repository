# Image Repository

> [See it in action and checkout the demo here](https://www.loom.com/share/6e3f717fe29c49a884e282fbe26e0068)

This is a full stack image repository application. Images are stored in [FileStack](https://www.filestack.com/) and information about the images (url tags name, etc) are stored in a [postgres database](https://www.postgresql.org/). 

In the client folder you will find front end code (React) for accessing the API and in the server folder you will find the API (express)

## The Stack
- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [FileStack](https://www.filestack.com/)
- [Prisma](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)

## Running the API

Prerequisites: Install docker, docker-compose, node, and yarn


1. `cd server`
2. Make .env File
make a .env file and fill it out with the following information, an example might look like this.
```env
POSTGRES_USER=test_user
POSTGRES_PASSWORD=test_password
POSTGRES_DB=img_app_db
DB_URL=“postgresql://test_user:test_password@localhost:5432/img_app_db”
PORT=5000
```

**Note:** The passsword and username in the DB_URL must match POSTGRES_USER and POSTGRES_PASSWORD respectively.

2. `start the postgres docker container`

```bash
docker-compose up -d
```
**Note:** Make sure postgres is not running anywhere else on your system

3. Install dependencies
```bash
yarn
```
4. Push the Schema to the postgres databse
```bash
npx prisma db push --preview-feature
```
5. Start API in dev mode
```bash
yarn dev
```

6. Head over to localhost:5000/ and you should see
```json
{
    "test": true
}
```

## Running the Client
1. `cd client`

2. Install Dependencies
```bash
yarn
```

3. Make a .env file with the following
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FILE_STACK_API_KEY=***
```

4. Start the React App
```bash
yarn start
```

Happy hacking!
