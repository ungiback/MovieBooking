import { movies } from '../movieData'

export default function handler(req, res) {
    if (movies.length > 1) {
        res.status(200).json(movies)
    } else {
        res.status(404).json({ msg: "data is not found." })
    }
}