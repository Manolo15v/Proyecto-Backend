export default async function authAdmin(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.status(401).redirect('/')
    }
}