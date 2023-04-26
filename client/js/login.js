document.getElementById('submitBtn').addEventListener("click", () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const data = {
        username: username,
        psswrd: password
      };
      console.log(data);
      const options = {
        method: "post",
        body: JSON.stringify(data),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      }
      fetch("http://localhost:8008/login", options)
      .then(res => res.json())
      .then(json => console.log(json));
  
});