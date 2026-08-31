module.exports = (req, res, next) => {
    if(req.isAuthenticated()) { 
        return next();
    }
    req.flash('error_msg', 'Inicie sesión');
    res.redirect('/users/login');
}