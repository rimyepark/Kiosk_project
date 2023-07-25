const express = require("express");
const cookieParser = require("cookie-parser");
const Router = require("./routes");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}));
app.use(express.static("assets"))

app.use('/api', {Router});

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});