import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from '../../components/room/header'
import CardComp from '../../components/card'
import Main from '../../components/room/main'

const Room: NextPage = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <Main/>
        </div>
    )
}

export default Room
