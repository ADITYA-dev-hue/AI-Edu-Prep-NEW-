fetch("/api/user")
.then(res => res.json())
.then(data => {
  if(data.loggedIn){
    console.log("Logged in:", data.user);
  }
});