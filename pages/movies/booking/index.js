/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router"
import { useState, useEffect, useCallback } from "react"
import useSWR from 'swr'
import Error from "next/error"
import { getDays } from "../../../utils/newResults"
import Roomcard from "../../../components/Roomcard"
import MovieDayTime from "../../../components/movieDayTime"
import Title from "../../../components/HeadTtile"

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    if (res.status !== 200) {
        throw new Error(data.msg)
    }
    return data
};
const Ticket = () => {
    const router = useRouter()
    const today = new Date().getDate()


    const [querys, setQuerys] = useState({
        movieId: router?.query?.id || "",
        day: today,
        time: "",
        roomId: "",
    })
    const [movieName, setMovieName] = useState("")
    const [isTrue, setIsTrue] = useState(false)

    const { data: movies, error } = useSWR(() => '/api/backmovie', fetcher);
    const { data: rooms } = useSWR(() => `/api/ticketing/rooms?movieId=${querys.movieId}&day=${querys.day}`, fetcher);

    useEffect(() => {
        if (router?.query?.id && movies) {
            const isMovie = movies.filter(item => parseInt(item.id) === parseInt(router?.query?.id))[0]
            setMovieName(isMovie.title)
        }
    }, [])
    useEffect(() => {
        setIsTrue(querys.movieId && querys.day && Boolean(querys.time))
    }, [querys])

    const onSelected = useCallback((e) => {
        const [name, value] = [e.target.getAttribute("name"), e.target.getAttribute("value")]
        e.preventDefault()
        e.target.parentNode.querySelector(".selected").classList.remove("selected")
        e.target.classList.add("selected")
        setQuerys({ ...querys, [name]: value, time: "", roomId: "" })
    }, [querys])

    if (error) return <div className="inner">{error.props}</div>
    if (!movies) return <div className="inner">Loading...</div>

    return (
        <div className="inner">
            <Title title="예매" />
            <div className="flex flex-row h-72">
                <ul className="p-4 w-72 bg-[#BFD6D9]">
                    <li className={`${router?.query?.id ? null : "selected"} pl-4 rounded-md cursor-default`}>영화고르시오</li>
                    {movies.map(item =>
                        <li onClick={(e) => { onSelected(e), setMovieName(item.title) }} name="movieId" value={item.id} key={item.id} className={`${parseInt(item.id) === parseInt(router?.query?.id) ? "selected" : ""} pl-4 rounded-md`}>{item.title.split(':')[0]}</li>
                    )}
                </ul>
                <ul className="p-4 w-20 overflow-y-scroll scollcustom text-center">
                    {getDays().map((item, idx) => parseInt(item) >= today ? <li onClick={(e) => onSelected(e)} name="day" value={item} key={idx} className={`${(idx + 1) === today ? "selected" : ""} rounded-md`}>{item}</li> : ""
                    )}

                </ul>
                <div className=" ml-1 w-full">
                    {rooms?.map((item, idx) => (
                        <Roomcard key={idx} {...item} eventClick={({ time, room_id }) => setQuerys({ ...querys, time: time, roomId: room_id })} />
                    ))}
                </div>
            </div>
            <MovieDayTime {...querys} name={movieName} isTrue={isTrue} />
        </div>
    )
}

export default Ticket