import { Typography } from '@mui/material'
import style from './style.module.css'

const CardComp = () => {
    return (
        <div className={`${style.cardBox}`}>
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

export default CardComp
