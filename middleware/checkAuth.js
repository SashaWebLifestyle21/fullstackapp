import jwt from 'jsonwebtoken'
import config from "config";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.userId = decoded.userId

            next()
        } catch (error) {
            return res.json({
                message: 'Нет доступа.',
            })
        }
    } else {
        return res.json({
            message: 'Нет доступа.',
        })
    }
}