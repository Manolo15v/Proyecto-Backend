export default function authUser(req, res, next) {
    if (req.session.login) {
        next();
    } else {
        res.status(401).redirect('/')
    }
}