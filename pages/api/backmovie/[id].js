import { movies } from '../movieData'

export default function isPbHandler(req, res) {
    const { id } = req.query;
    const ids = parseInt(movies.filter(item => parseInt(item.id) === parseInt(id)).length)

    res.status(200).json({ isP: ids < 1 ? false : true });
}