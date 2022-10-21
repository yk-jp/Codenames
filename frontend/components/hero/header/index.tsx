import { Typography } from '@mui/material'
import style from './style.module.css'

const Header = () => {
    return (
        <div className={style.mTop3}>
            <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: 'bold' }}
            >
                Codenames
            </Typography>
        </div>
    )
}

export default Header
