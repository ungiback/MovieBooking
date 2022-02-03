/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from "react"
import { addSeatid, removeSeatid } from "../store/redux/reducers/seatselection"
import { useDispatch, useSelector } from "react-redux"

const Seats = (props) => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.seatselection)
    const { St, seats } = props

    const onselect = useCallback(e => {
        e.preventDefault()
        const toggle_true = (Target) => {
            dispatch(addSeatid(parseInt(Target.getAttribute('seatid'))))
            Target.classList.add('selected')
        }
        const toggle_false = (Target) => {
            dispatch(removeSeatid(parseInt(Target.getAttribute('seatid'))))
            Target.classList.remove('selected')
        }
        e.target.classList.value.includes("selected") ? toggle_false(e.target) : toggle_true(e.target)
    }, [])

    useEffect(() => {
        [...document.querySelectorAll('.selected')].map((i, idx) => idx > 0 ? i.classList.remove('selected') : "")
    }, [state.justdepsforEffect])


    return (
        <div className="mt-4  bg-gray-200 py-2">
            <button onClick={() => onReset()}>reset</button>
            <p className="text-center text-2xl">SCREEN</p>
            <section className="mb-16 flex">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-200" />
                    <p>가능</p>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-200" />
                    <p>불가능</p>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#008AB6]" />
                    <p>체크</p>
                </div>
            </section>

            <div className="flex flex-col" id="isSelected">
                {Object.entries(St).map((row, idx) => (
                    <div key={idx} className="flex mb=1">
                        <strong className="mr-16 my-2 ml-2">{row[0]}</strong>
                        <div className="flex justify-center items-center w-full " id="buttons">
                            {Object.entries(row[1]).map((col, idx) =>
                                seats?.includes(parseInt(col[0])) ?
                                    <button disabled key={idx} className="bg-orange-200 w-12 h-8 rounded-lg mx-4">x</button>
                                    :
                                    <button key={idx} seatid={col[0]} className="bg-green-300 w-12 h-8 rounded-lg mx-4" onClick={(e) => onselect(e)}>{col[1]}</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Seats