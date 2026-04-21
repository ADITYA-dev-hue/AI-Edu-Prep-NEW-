
const express=require('express');
const session=require('express-session');
const fs=require('fs');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret:'eduprep-secret',resave:false,saveUninitialized:true}));
app.use(express.static('public'));

const usersFile='data/users.json';
if(!fs.existsSync(usersFile)) fs.writeFileSync(usersFile,'[]');

function getUsers(){ return JSON.parse(fs.readFileSync(usersFile)); }
function saveUsers(u){ fs.writeFileSync(usersFile,JSON.stringify(u,null,2)); }

app.post('/signup',(req,res)=>{
 const {email,password,apikey}=req.body;
 let users=getUsers();
 if(users.find(x=>x.email===email)) return res.send('User exists');
 users.push({email,password,apikey});
 saveUsers(users);
 res.redirect('/login.html');
});

app.post('/login',(req,res)=>{
 const {email,password,apikey}=req.body;
 let u=getUsers().find(x=>x.email===email && x.password===password);
 if(!u) return res.send('Invalid login');
 req.session.user={email,apikey:apikey||u.apikey};
 res.redirect('/home.html');
});

app.get('/api/me',(req,res)=>res.json(req.session.user||{}));
app.post('/api/tutor',(req,res)=>{
 if(!req.session.user) return res.status(401).json({reply:'Login required'});
 res.json({reply:'Using your API key ending '+(req.session.user.apikey||'').slice(-4)+': '+req.body.message});
});
app.listen(3000,()=>console.log('http://localhost:3000/login.html'));
