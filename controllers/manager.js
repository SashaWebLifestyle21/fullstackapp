import Manager from "../models/Manager.js";


export const getAll = async (req, res) => {
    try {
        Manager.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user",
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "user": { "$first": "$user" },
                    "count": { "$first": "$count" },
                }
            }
        ]).then(managers => res.json({ managers }))
    } catch (e) {
        res.json({ message: 'Ошибка при загрузке менеджеров' })
    }
}