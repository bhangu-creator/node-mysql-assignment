require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const PORT= process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/user', require('./api/routes/user'));

app.use('/', (req, res) => {
	return res.status(404).json({
		error: 'requested address was not found on server',
	});
});

app.listen(PORT, function()
{
	console.log(`server running on ${PORT}`);
});

  