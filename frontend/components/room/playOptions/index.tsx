import { Button, TextField, Select, MenuItem } from '@mui/material'
import gstyle from '../../../utils/globalstyle.module.css'
import style from './style.module.css'

const PlayOptions = () => {

    return (
        <div className={`${gstyle.flex} ${gstyle.justifyCenter}`}>
            {/* <div>
                <Button
                    variant="outlined"
                    style={{ minWidth: '1.5em' }}
                    size="small"
                    className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                >
                    End Guess 
                </Button>
            </div> */}
{/* 
            <div className={`${gstyle.flex}`}>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Word"
                        size="small"
                        defaultValue=""
                    />
                </div>
                <Select
                    // value={age}
                    label="number"
                    // onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <div>
                    <Button
                        variant="outlined"
                        style={{ minWidth: '1.5em' }}
                        size="small"
                        className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                    >
                        End Guess
                    </Button>
                </div>
            </div> */}

            <div></div>
        </div>
    )
}

export default PlayOptions
