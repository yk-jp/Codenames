import gstyle from '../../../utils/globalstyle.module.css'
import style from './style.module.css'

// import CardComp from '../../card'

const CardComp = () => {
    return (
        <div
            className={`${style.cardBox} ${gstyle.flex} ${gstyle.justifyCenter} ${gstyle.alignItemsCenter}`}
        >
            <p className={style.cardText}>AAAAAAAAAA</p>
        </div>
    )
}

const Main = () => {
    return (
        <div
            className={`${gstyle.flex} ${gstyle.justifyCenter} ${gstyle.flexCol}`}
        >
            <div className={`${gstyle.w80} ${style.statusContainer}`}>
                <div></div>
                <div>
                    <h3
                        className={`${gstyle.textCenter} ${gstyle.m0} ${gstyle.my1} ${style.fontText}`}
                    >
                        Blue's turn
                    </h3>
                </div>
                <div>
                    <h3
                        className={`${gstyle.textEnd} ${gstyle.m0} ${gstyle.my1} ${style.fontText}`}
                    >
                        <span>8</span> - <span>6</span>
                    </h3>
                </div>
            </div>
            <div className={`${gstyle.w80} ${style.gridContainer}`}>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>

                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>

                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
                <div>
                    <CardComp />
                </div>
            </div>
        </div>
    )
}

export default Main
