const User = require("../model/user");
const createError = require('http-errors');
const url = require('url');

const getRegisterPage = (req, res, next) => {
    if (req.session.user) return res.redirect("/user/dashboard");
    
    const { errorMessage = null } = req.query;

    res.render("pages/register", {errorMessage});
}

const getLoginPage = (req, res, next) => {
    if (req.session.user) return res.redirect("/user/dashboard");

    const { errorMessage = null } = req.query;
    res.render("pages/login", {errorMessage});
}

const getDashboardPage = async (req, res, next) => {

    if (!req.session.user) return res.redirect("/user/login");
    try{
        const user =  await User.findOne({_id:req.session.user})
        if(!user) return res.redirect(`/user/login?errorMessage=User not found!`)

        res.render("pages/dashboard", {user: user});

    }catch(err){
        console.log(err)
        res.redirect(url.format({
            pathname:"/user/login",
            query: {
               "errorMessage": "Server Error!"
             }
        }))

    }
    
};

module.exports = {
    getRegisterPage,
    getLoginPage,
    getDashboardPage
};