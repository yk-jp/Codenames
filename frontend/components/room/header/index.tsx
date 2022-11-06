import { Button } from '@mui/material'
import gstyle from '../../../utils/globalstyle.module.css'
import style from './style.module.css'

const Header = () => {
    return (
        <div>
            <Button
                variant="outlined"
                className={`${gstyle.outlinedBtnPurple} ${gstyle.mx2}}`}
            >
               Rule 
            </Button>
            <Button
                variant="outlined"
                className={`${gstyle.outlinedBtnPurple} ${gstyle.mx2}}`}
            >
               Chat Log 
            </Button>
            <Button
                variant="outlined"
                className={`${gstyle.outlinedBtnPurple} ${gstyle.mx2}}`}
            >
               Team 
            </Button>
        </div>
    )
}

export default Header
