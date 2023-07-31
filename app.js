const express = require("express");
const cookieParser = require("cookie-parser");
const ItemRouter = require("./routes/items.route");
const OptionRouter = require("./routes/options.route");
const OptionItemRouter = require("./routes/orderItem.route");
const OrderCustomerRouter = require("./routes/ordercustomers.route");
const OrderICRouter = require("./routes/orderIC.route");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}));
app.use(express.static("assets"))

app.use('/api', [ItemRouter, OptionRouter, OptionItemRouter, OrderCustomerRouter, OrderICRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});