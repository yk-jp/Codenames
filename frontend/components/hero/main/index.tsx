import gstyle from '../../../utils/globalstyle.module.css'
import style from './style.module.css'
import { Button, TextField } from '@mui/material'
import { Typography } from '@mui/material'

const Main = () => {
    return (
        <div
            className={`${gstyle.h100} ${gstyle.flex} ${gstyle.alignItemsCenter} ${gstyle.flexCol}`}
        >
            <div className={`${gstyle.my5} ${style.descWidth} ${style.smW100}`}>
                <Typography variant="h6" align="center" display="block">
                    Play games with your friends. you can choose languages for
                    words, either japanese or english. Create a room and share
                    the invite link.
                </Typography>
            </div>

            <div
                className={`${gstyle.flex} ${gstyle.justifyCenter} ${gstyle.alignItemsCenter} ${style.dAlign}`}
            >
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="small"
                        className={style.sm1}
                        required
                    />
                </div>
                <div className={style.smW100}>
                    <Button
                        variant="outlined"
                        className={`${gstyle.outlinedBtnPurple} ${style.smW100}`}
                    >
                        Create room
                    </Button>
                </div>
            </div>

            <div className={`${gstyle.my5}`}>
                <div>
                    <Typography variant="h6" align="center" display="block">
                        Language Option
                    </Typography>
                </div>
                <div
                    className={`${gstyle.flex} ${gstyle.flexWrap} ${gstyle.my2}`}
                >
                    <div className={`${gstyle.mx05}`}>
                        <Button
                            variant="outlined"
                            className={`${gstyle.outlinedBtnPurple} ${gstyle.mx2}}`}
                        >
                            EN
                        </Button>
                    </div>
                    <div className={`${gstyle.mx05}`}>
                        <Button
                            variant="outlined"
                            className={`${gstyle.outlinedBtnPurple} ${gstyle.mx2}}`}
                            disabled
                        >
                            jp
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
