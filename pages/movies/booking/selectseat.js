/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import useSWR from 'swr'
import Seats from '../../../components/Seats'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineRight } from "react-icons/ai";
import { setCnt, stateReset } from '../../../store/redux/reducers/seatselection'
import { fetcher, onTicketing } from '../../../store/swr/fetchers'
import Title from '../../../components/HeadTtile'

// const fetcher1 = async (url) => {
//     const res = await fetch(url)
//     const data = await res.json()
//     if (res.status !== 200) {
//         throw new Error(data.msg)
//     }
//     return data
// }

const SelectSeat = (props) => {
    const router = useRouter()
    const { movieId, day, time, roomId, name } = props
    const { data: seats } = useSWR(() => `/api/ticketing/seats?movieId=${movieId}&day=${day}&time=${time}&roomId=${roomId}`, fetcher)

    const state = useSelector((state) => state.seatselection)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(stateReset(parseInt(1)))
    }, [])

    const onselect = useCallback((e) => {
        e.preventDefault()
        e.target.parentNode.querySelector(".selected").classList.remove("selected")
        e.target.classList.add("selected")
        dispatch(setCnt(parseInt(e.target.innerText)))
    })

    const onticketing = async () => {
        const values = {
            ...props,
            seat_arr: state.seatid
        }
        if (await onTicketing(values)) {
            dispatch(stateReset)
            router.replace('/')
        }
    }
    return (
        <div className='inner'>
            <Title title="예매" />
            <div className='flex flex-col w-full justify-start'>
                <section className='flex'> {/* 영화설명 */}
                    <h2>{name}</h2>
                    <h2>{roomId}</h2>
                    <h2>{`${day} ${time}`}</h2>
                </section>
                <section className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <p className=' people'>인원</p>
                        {[1, 2, 3, 4, 5].map((num, idx) =>
                            <button className={`w-8 h-8 mx-2 border-2 border-[#008AB6] flex justify-center items-center 
                            ${parseInt(num) === 1
                                    ? "selected" : ""}`}
                                key={idx + 1}
                                onClick={(e) => onselect(e)}>
                                {num}
                            </button>)}
                    </div>
                    <div >
                        <button className={`flex flex-col items-center p-2 rounded-md ${state.seatid.length === state.cnt ? "opacity-100 selected" : "opacity-30"}`}
                            disabled={state.seatid.length === state.cnt ? false : true} onClick={onticketing}>
                            <strong className="font-[#fff]">예매하기</strong>
                            <AiOutlineRight className="text-4xl" />
                        </button>
                    </div>
                </section>
            </div>
            <Seats seats={seats} />
        </div >
    )
}

export default SelectSeat

export async function getServerSideProps(ctx) {
    return {
        props: ctx.query
    }
}