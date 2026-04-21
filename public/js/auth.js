function signup(event) {
  event.preventDefault();

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const apikey =
    document.getElementById("apikey").value;

  const users = JSON.parse(
    localStorage.getItem("eduprepUsers")
  ) || [];

  const exists = users.find(
    user => user.email === email
  );

  if (exists) {
    alert("User already exists.");
    return;
  }

  users.push({
    email,
    password,
    apikey
  });

  localStorage.setItem(
    "eduprepUsers",
    JSON.stringify(users)
  );

  alert("Signup successful!");
  window.location.href = "login.html";
}

function login(event) {
  event.preventDefault();

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const apikey =
    document.getElementById("apikey").value;

  const users = JSON.parse(
    localStorage.getItem("eduprepUsers")
  ) || [];

  const user = users.find(
    u =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    alert("Invalid credentials.");
    return;
  }

  user.apikey = apikey;

  localStorage.setItem(
    "eduprepCurrentUser",
    JSON.stringify(user)
  );

  window.location.href = "home.html";
}

function logout() {
  localStorage.removeItem(
    "eduprepCurrentUser"
  );

  window.location.href = "login.html";
}