const currentUser = async (req, res) => {
     res.json({
       user: {
         name: req.user.name,
         email: req.user.email,
       },
     });
};

module.exports = currentUser;
