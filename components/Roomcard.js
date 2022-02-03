const Roomcard = (info) => {
    const { room_id, time, eventClick } = info
    return (
        <div className="flex w-30 flex-row m-2" onClick={() => {
            eventClick({ time, room_id })
        }}>
            <strong className="m-1">{`${room_id}`}관</strong>
            <h3 className="rounded-full border-2 border-[#008AB6] text-center m-1 w-20 cursor-pointer">{time.substring(0, 5)}</h3>
        </div>
    )
}

export default Roomcard