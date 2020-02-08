# Restaurant Forum
運用node.js和express進行開發，並連接MySQL進行CRUD功能，並符合RESTful設計。
並使用passport.js登入系統，與bcryptjs處理使用者在註冊時輸入的密碼。
express-session截取cookie資訊、生成session並把session資訊存放在伺服器端。

## 安裝步驟
1. 依照git clone下載資料夾
```
$ git clone https://github.com/KerwinJhong/restaurant_forum.git
```
2. 從終端機安裝npm套件，輸入以下指令
```
$ npm install
```
2. MySQL Workbench
新增資料庫:
```
drop database if exists forum;
create database forum;
use forum;
```
3. 設置環境變數
新增 .env
```
// .env
IMGUR_CLIENT_ID=<Your CLIENT ID>
JWT_SECRET=<YOUR JWT SECRET>
```
4. configure sequelize
config/config.json
```
{
  "development": {
    "username": "root",
    "password": <YOUR_MYSQL_WORKBENCH_PASSWORD>,
    "database": "forum",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": true
    }
}
```
4. run the migration
```
$ [~/restaurant_forum] npx sequelize db:migrate
```
4. run the seeder
```
$ [~/restaurant_forum] npx sequelize db:seed:all
```
5. 執行專案
```
$ [~/restaurant_forum] npm run dev
```
6. 輸入網址
```
http://localhost:3000
```

## 專案內容
+ 餐廳所有清單
![image](https://github.com/KerwinJhong/restaurant_forum/blob/master/assets/restaurant_forum.png)

## 預設使用者資訊
```
user1：
email: user1@example.com
password: 12345678

user2：
email: user2@example.com
password: 12345678
```

## 作者
[Kerwin Jhong](https://github.com/KerwinJhong)

