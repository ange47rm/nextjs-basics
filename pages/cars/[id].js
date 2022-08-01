import { clearPreviewData } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router' // Allows us to access the query params from the URL
import Head from 'next/head';

export default function Car({ car }) {

    const router = useRouter();
    const { id } = router.query

    return (<>
        <Head>
            <title>{car.color} - {car.id}</title>
        </Head>

        <h1>Car selected: {id}</h1>
        <img src={car.image} width="300px" />
    </>)
}

export async function getServerSideProps({ params }) { // SSR

    const request = await fetch(`http://localhost:3000/${params.id}.json`); // Simulates server request and returns data in json file in public folder.
    const data = await request.json(); // Converts data to JSON

    return {
        props: { car: data },
    }
}
// getServerSideProps() does the exact same as getStaticProps(), however it's triggered after a request, rather than at build time.


// export async function getStaticProps({ params }) { // SSG

//     const request = await fetch(`http://localhost:3000/${params.id}.json`); // Simulates server request and returns data in json file in public folder.
//     const data = await request.json(); // Converts data to JSON

//     return {
//         props: { car: data },
//     }
// }
// // getStaticProps() tells next to pre-render page.
// // When the site is built, nextJS automatically calls this function then sends the results as 'props' to the component itself.


// export async function getStaticPaths({ params }) { // SSG

//     const request = await fetch(`http://localhost:3000/cars.json`); // Simulates server request and returns data in json file in public folder.
//     const data = await request.json(); // Converts data to JSON

//     const paths = data.map(car => {
//         return { params: { id: car } }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }
// getStaticPaths() tells next which dynamic page to pre-render
// The job of this function is to return a paths object that contains an array with every route for this dynamic URL.
// In this demo we only have 3 routes (ford, lambo, tesla)

// You can access this content by navigating to http://localhost:3000/cars/mazda

// IF YOU WANT TO IMPLEMENT SSR - COMMENT OUT getStaticPaths() AND getStaticProps().
// IF YOU WANT TO IMPLEMENT SSG - COMMENT OUT getServerSideProps().