const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
