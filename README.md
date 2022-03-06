# Express Todolist
Backend Todolist with express and MySQL (sequelize ORM)

## Installation
1. clone the repo (in terminal or bash) and then install with npm to install all dependencies

```bash
git clone https://github.com/abdul15irsyad/express-todolist.git
cd express-todolist
npm install
```

2. make a file named `.env` and set your database setting to connect the database just like `.env.example`

3. migrate databae and run the seeder
```bash
npx sequelize migrate && npz sequelize db:seed:all
```

4. after all the existing dependecies installed then run the application with the `npm start` or `npm run dev` (with nodemon)

```bash
npm start
```
or
```bash
npm run dev
```

5. open browser at [http://localhost:8001](http://localhost:8001), if you didn't change the port

enjoy 🙂