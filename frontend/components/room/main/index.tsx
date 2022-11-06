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
        <div className={`${gstyle.flex} ${gstyle.justifyCenter}`}>
            <div className={`${gstyle.w80} ${style.gridContainer}`}>
                <div
                >
                    <CardComp 
                    />
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
