export const onTicketing = async (values) => {
    const res = await fetch('/api/ticketing/insert', {
        method: 'POST',
        body: JSON.stringify({
            ...values,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8", }
    })
    return res.ok
}

export const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json()
    let error
    if (res.status !== 200) {
        error =  new Error(data.msg)
    }
    return {data,error}
}