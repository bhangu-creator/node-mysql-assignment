const express = require('express');

const router = express.Router();

const { 
    getUsers,
    getSpecificUsers,
    getUsersWithAdmin
} = require('../controllers/user');

router.get('/getUsers',
    getUsers
);

router.get('/getSpecificUsers',
    getSpecificUsers
);

router.get('/getUsersWithAdmin',
    getUsersWithAdmin
);

router.use('/', (req, res) => {
	return res.status(404).json({
		error: 'requested address was not found on server',
	});
});

module.exports = router;