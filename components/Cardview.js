import Image from "next/image"
import Link from "next/link"
import style from '../styles/Cardview.module.css'

const CardView = (props) => {
    const { id, title, poster_path, overview } = props;
    const descript = overview.substring(0, 70)
    return (
        <div className={style.card}>
            <Image className={style.img} src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} width={220} height={360} />
            <div className={style.dark}></div>
            <div className={style.content}>
                <p className="h-auto text-ellipsis overflow-hidden font-bold text-base text-[#E6F4F1] ml-2 mr-2">
                   {`${descript}...`}
                </p>
                <Link href={`/movies/detail-view/${id}`} passHref>
                    <button className="bg-[#008AB6] w-20 m-1 text-center font-bold rounded-md text-[#E6F4F1]">상세보기</button>
                </Link>
            </div>
        </div >
    )
}

export default CardView
