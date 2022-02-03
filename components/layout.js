import Head from "next/head"
import Link from "next/link"

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <meta name="author" content="isBack" />
                <meta name="Description" content="Nextjs 공부 영화 예약 페이지 만들기" />
                <meta name="Keywords" content="Nextjs,영화,예약,영화예약,isBack" />
            </Head>
            <header className="flex justify-center h-20 items-center">
                <Link href="/" passHref>
                    <div style={{ fontSize: 40, color: '#008AB6', textAlign: 'center', cursor: 'pointer' }}>
                        {`Back's Movie`}
                    </div>
                </Link>
            </header>
            <nav>
                <ul className="flex flex-row items-center justify-center h-10 p-1 mb-2">
                    <Link href="/" passHref>
                        <li className=" m-1 text-base hover:border-b-4 border-[#008AB6]">최신영화</li>
                    </Link>
                    <Link href={{
                        pathname: `/movies/booking`,
                        query: {}
                    }} as={`/movies/booking`} passHref>
                        <li className=" m-1 text-base hover:border-b-4 border-[#008AB6]">예매</li>
                    </Link>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout