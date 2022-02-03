import { useRouter } from "next/router"
import { AiOutlineRight } from "react-icons/ai";
import { Seats_date } from "../utils/newResults";


const MovieDayTime = (props) => {
    const { movieId, day, name, time, roomId, isTrue } = props

    const router = useRouter()
    return (
        <div>
            <section className="flex justify-between items-center h-auto">
                <article>

                    <div className="flex h-auto p-2 text-[#4B4453]">
                        <div className="w-20 mr-2">
                            <strong>영화</strong>
                        </div>
                        <div>
                            <p>{name ? name : "영화를 고르시오."}</p>
                        </div>
                    </div>

                    <div className="flex h-auto p-2 text-[#4B4453]">
                        <div className="w-20 mr-2">
                            <strong>일시</strong>
                        </div>
                        <div>
                            <p>{`${Seats_date(day)} ${time.substring(0, 5)}`}</p>
                        </div>

                    </div>
                    <div className="flex h-auto p-2 text-[#4B4453]">
                        <div className="w-20 mr-2">
                            <strong>상영관</strong>
                        </div>
                        <div className="">
                            <p>{`${roomId}관`}</p>
                        </div>
                    </div>
                </article>
                <article>
                    <button className={`flex flex-col items-center p-2 rounded-md ${isTrue ? "opacity-100 selected " : "opacity-50"}`}
                        disabled={isTrue ? false : true} onClick={() => {
                            router.push({
                                pathname: '/movies/booking/selectseat/',
                                query: {
                                    movieId, day, time, roomId, name
                                },
                            }, '/movies/booking')
                        }}>
                        <strong className="font-[#fff]">자석고르기</strong>
                        <AiOutlineRight className="text-4xl" />
                    </button>
                </article>
            </section>
        </div>
    )
}

export default MovieDayTime