import Head from "next/head";

const Title = ({ title }) => {
    return (
        <Head>
            <title>{`${title} | backMovie `}</title>
        </Head>
    )
}

export default Title;
