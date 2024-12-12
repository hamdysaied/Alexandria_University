const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");

const main = fs.readFileSync("./University/main.html", "utf-8");
const register = fs.readFileSync("./University/register.html", "utf-8");
const members = fs.readFileSync("./University/id.html", "utf-8");
const team = fs.readFileSync("./University/team.html", "utf-8");
const about = fs.readFileSync("./University/about.html", "utf-8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(query);
  if (pathname === "/" || pathname === "/main.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(main);
    return res.end();
  } else if (pathname === "/members.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(members);
    return res.end();
  } else if (pathname === "/team.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(team);
    return res.end();
  } else if (pathname === "/register.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(register);
    return res.end();
  } else if (pathname === "/about.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(about);
    return res.end();
  } else if (pathname.match(".css$")) {
    let cssPath = path.join(__dirname, "University", pathname);
    let fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else if (pathname.match(".png$")) {
    let imagePath = path.join(__dirname, "University", pathname);
    let fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  } else if (pathname.match(".jpg$")) {
    let imagePath = path.join(__dirname, "University", pathname);
    let fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  } else if (pathname.match(".js$")) {
    let jsPath = path.join(__dirname, "University", pathname);
    let fileStream = fs.createReadStream(jsPath);
    res.writeHead(200, { "Content-Type": "appliction/json " });
    fileStream.pipe(res);
  } else if (pathname.match(".ttf$")) {
    let fontPath = path.join(__dirname, "University", pathname);
    let fileStream = fs.createReadStream(fontPath);
    res.writeHead(200, { "Content-Type": "ttf/otf" });
    fileStream.pipe(res);
  } else if (pathname.match(".otf$")) {
    let fontPath = path.join(__dirname, "University", pathname);
    let fileStream = fs.createReadStream(fontPath);
    res.writeHead(200, { "Content-Type": "ttf/otf" });
    fileStream.pipe(res);
  } else if (req.method == "POST") {
    // Saving user data from the request
    let requestData = "";

    req.on("data", (data) => {
      requestData += data;
    });

    req.on("end", () => {
      const user = JSON.parse(requestData);

      if (req.url === "/register") {
        // Writing the new user to users.txt file
        fs.appendFileSync(
          "./users.txt",
          "\r\n" + user.username + ":" + user.password
        );
        res.writeHead(200);
        res.write("User registered successfully");
        res.end();
      } else if (req.url === "/login") {
        let found = false;

        // Reading users in users.txt file
        fs.readFile("./users.txt", (err, data) => {
          // Loop over users in users.txt
          data
            .toString()
            .split("\r\n")
            .forEach((u) => {
              const [username, password] = u.split(":");
              // If user exists with the right credentials
              // return logged in successfully with 200 status code
              if (user.username === username && user.password === password) {
                found = true;
                res.writeHead(200);
                res.write("Logged in successfully");
                res.end();
              }
            });

          // If user doesn't exist
          // return error
          if (!found) {
            res.writeHead(422);
            res.write("Wrong username or password");
            res.end();
          }
        });
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("No Page Found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is running");
});