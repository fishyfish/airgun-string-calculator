const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req,res) => {
        const user = new User(req.body);

        user
        .save()
        .then(() => {
            res.json({ msg: "success!", user: user});
        })
        .catch(err => res.status(400).json(err));
    },
    login(req,res) {
        User.findOne({email: req.body.email})
        .then(user => {
            if (user === null) {
                res.status(400).json({ msg: "Invalid login. Please use valid login, and password" });
            } else {
                bcrypt
                .compare(req.body.password, user.password)
                .then(passwordIsValid => {
                    if(passwordIsValid) {
                        res
                        .cookie (
                            "usertoken",
                            jwt.sign({_id: user._id}, process.env.JWT_SECRET),
                            {
                                httpOnly: true,
                                expires: new Date(Date.now() +90000000) ,
                            }
                    )
                .json ({
                    msg: "success, user logged in",
                    userLogged: {
                        username: `${user.userName}`,
                    }
                });
            } else {
                res.status(400).json({msg:"Invalid login attempt two"});
            }
        })
        .catch(err =>
            res.status(400).json({msg: "Invalid login attempt three"})
        );
    }
})
.catch(err => res.json(err));
},
logout(req,res) {
    res.clearCookie("usertoken");
    res.json({ msg: "usertoken cookie cleared"});
},

logout2(req,res) {
    res
    .cookie("usertoken", jwt.sign({ _id: ""}, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0
    })
    .json({msg:"ok"});
},
getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
},
};