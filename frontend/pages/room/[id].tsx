import type { NextPage } from 'next'
import gstyle from '../../utils/globalstyle.module.css'
import Header from '../../components/room/header'
import Main from '../../components/room/main'

const Room: NextPage = () => {
    return (
        <div className={`${gstyle.my2}`}>
            <Header />
            <Main />
        </div>
    )
}

export default Room
