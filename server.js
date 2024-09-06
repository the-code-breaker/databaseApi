const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 5000; 
 
const config = {
  user: 'maqadmin',
  password: '#1Password',
  server: 'sepbootcamp.database.windows.net',
  database: 'Sep2bootcampDB',
  options: {
    encrypt: true, 
    trustServerCertificate: true
  }
};
 
const corsOptions = {
  origin: 'https://souravempn1177-dzhnckffbtejfgbn.southindia-01.azurewebsites.net/',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
};
 
app.use(cors(corsOptions));
 
sql.connect(config, (err) => {
  if (err) console.error('SQL connection error:', err);
});
 
app.get('/api/top-rows', async (req, res) => {
  try {
    const result = await sql.query('SELECT TOP 20 * FROM  [SalesLT].[Customer]');
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL query error:', err);
    res.status(500).send('Internal Server Error');
  }
});
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 