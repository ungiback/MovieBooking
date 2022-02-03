import axios from 'axios';
import CardView from '../components/cardView';
import Title from '../components/HeadTtile'

export default function Home({ results }) {
  return (
    <>
      <Title title="Home" />
      <div className='inner flex flex-wrap justify-around'>
        {results.map(movie => <CardView key={movie.id} {...movie} />)}
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const { data: { results } } = await axios('http://localhost:3000/api/movies');
  return {
    props: {
      results,
    }
  }
}