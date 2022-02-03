import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import Title from '../../../components/HeadTtile'
import useSWR from 'swr'

const fetcher = async function (url) {
    const response = await fetch(url);
    const result = await response.json();
    return result
}

const Midx = ({ data }) => {
    const { data: res } = useSWR(() => `/api/backmovie/${parseInt(data.id)}`, fetcher)
    return (
        <div className="inner">
            <Title title={data.title} />
            <div className="border-b-4 border-[#4B4453] pb-4 ">
                <p className="font-bold text-4xl text-[#4B4453]">영화 상세</p>
            </div>
            <section className="flex flex-row pt-2 pb-2 mt-7">
                <div className=" pr-2 mr-1">
                    <Image src={`https://image.tmdb.org/t/p/original${data.poster_path}`} width={270} height={357} alt={data.title} />
                </div>
                <div className="flex-col w-full justify-between items-center">
                    <div className=" border-b-2 border-[#4B4453] w-full mb-12 content-center">
                        <strong className="text-2xl font-medium w-full">{data.original_title}</strong>
                    </div>
                    <div className="text-blue">
                        <dt>장르: {data.genres.map((item, idx) => (idx + 1) === data.genres.length ? `${item.name} ` : `${item.name},`)} / {data.runtime}분</dt>
                        <dt>공식페이지: {data.homepage ? <Link className="cursor-pointer" href={data.homepage}>{data.homepage}</Link> : "없음"}</dt>
                    </div>
                    <div className="">
                        {!res?.isP ?
                            <button disabled={true} className="w-24 mt-20 bg-[#008AB6] text-center text-[#E6F4F1] font-bold h-10 rounded-md">상영안함</button>
                            :
                            <Link href={{
                                pathname: `/movies/booking`,
                                query: {
                                    id: data.id
                                }
                            }} as={`/movies/booking`} passHref>
                                <button className="w-24 mt-20 bg-[#008AB6] text-center text-[#E6F4F1] font-bold hover:bg-[#003581] h-10 rounded-md">예매하기</button>
                            </Link>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Midx

export async function getServerSideProps({ params }) {
    const { data } = await axios(`http://localhost:3000/api/movie/${params.midx}`)
    return {
        props: { data }
    }
}

