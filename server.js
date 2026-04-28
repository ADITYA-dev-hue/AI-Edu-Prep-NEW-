const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT =
process.env.PORT || 3000;

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

app.use(
express.urlencoded({
extended:true
})
);

app.use(
session({
secret:
process.env.SESSION_SECRET ||
"eduprep_secret_key",

resave:false,
saveUninitialized:false,

cookie:{
secure:false,
maxAge:
1000 * 60 * 60 * 24
}
})
);

/* =========================
   STATIC FILES
========================= */

app.use(
express.static(
path.join(__dirname,"public")
)
);

/* =========================
   ROUTES
========================= */

app.get("/", (req,res) => {

res.sendFile(
path.join(
__dirname,
"public",
"login.html"
)
);

});

/* Optional health check */

app.get("/api/health",(req,res)=>{

res.json({
status:"ok",
app:"EduPrep"
});

});

/* 404 */

app.use((req,res)=>{

res.status(404).send(
"Page Not Found"
);

});

/* =========================
   START
========================= */

app.listen(PORT,()=>{

console.log(
`EduPrep running on port ${PORT}`
);

});