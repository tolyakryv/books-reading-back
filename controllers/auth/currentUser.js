const currentUser = async (req, res) => {
     res.status(200).json({
       user: {
         name: req.user.name,
         email: req.user.email,
       },
     });
};

module.exports = currentUser;
