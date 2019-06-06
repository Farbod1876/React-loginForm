export function login(username, password) {
  //In the real world, real project:

  //export function login (username, password);
  //return fetch ('www.example.com/login', {body: {username, password}}).then(res => res.json()
  //);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "Oslo" && password === "Norway2019!") {
        resolve({ status: 200, message: "Logged in successfully!" });
      } else {
        reject({ status: 401, message: "username/password is wrong!" });
      }
    }, 2000);
  });
}
