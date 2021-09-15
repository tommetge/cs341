const fs = require('fs');

const templateWriter = (res, title, body) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<title>' + title + '</title>');
  res.write('<body>' + body + '</body>');
  res.write('</html>');
}

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method;

  if (url === '/') {
    let body = '<h1>Hello</h1>';
    body = body + '<form action="/create-user" method="POST">';
    body = body + '<h2>Add a user</h2>';
    body = body + '<input type="text" name="username"><button type="submit">Send</button>';
    body = body + '</form>'
    body = body + '<a href="/users">Users</a>'

    templateWriter(res, 'Welcome', body);

    return res.end();
  }

  if (url === '/users') {
    templateWriter(res, 'Users', '<ul><li>User 1</li><li>User 2</li></ul><a href="/">Home</a>');

    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
      templateWriter(res, 'Welcome', '<h1>Welcome, ' + username + '</h1><a href="/users">Users</a>');
      return res.end();
    });
  }
}

module.exports = requestHandler;
