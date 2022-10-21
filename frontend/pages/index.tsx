import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/hero/header'
import Main from '../components/hero/main'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Codenames</title>
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <Main />
            </main>
            <footer></footer>
        </div>
    )
}

export default Home
