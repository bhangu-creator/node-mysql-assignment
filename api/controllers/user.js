const mysqlConnection = require('../config/connection');

module.exports = {
    getUsers(req,res)
    {
        try {
            let { skip, limit } = req.query;
            skip = Number(skip);                    // converting string data type to number 
            limit = Number(limit);
            const parms = [skip, limit];
            const sql='SELECT * FROM tb_user LIMIT ?,?';
            mysqlConnection.query(sql, parms, function (err, result) {
                if (err) throw err;
                else return res.send(result);
            });
        } catch(error) {
            return res.status(500).json({
                error: 'internal server error',
            });
        }
    },

    getSpecificUsers(req,res)
    {
        try {
            const { userId1, userId2, userId3 } = req.query;
            const parms = [userId1, userId2, userId3];
            const sql = 'SELECT * FROM tb_user WHERE user_id=? or user_id=? or user_id=?';
            mysqlConnection.query(sql, parms, function (err, result) {
                if (err) throw err;
                else return res.send(result);
            });
        } catch (error) {
            return res.status(500).json({
                error: 'internal server error',
            });
        }
    },

    getUsersWithAdmin(req,res)
    {
        try {
            const sql = 'SELECT * FROM tb_user WHERE admin_id IN (SELECT admin_id FROM tb_user GROUP BY admin_id HAVING COUNT(*) >= 3)';  // first the sub-query is getting all the admin_id's who have atleat 3 users, after than the main query is just selecting all the users from tb_user which have admin_id returned by previous query
            mysqlConnection.query(sql, function (err, result)
            {
                if(err) throw err;
                else return res.send(result);
            })   
        } catch (error) {
            return res.status(500).json({
                error: 'internal server error',
            });
        }
    }
}