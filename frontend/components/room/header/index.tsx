import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gstyle from '../../../utils/globalstyle.module.css'
import style from './style.module.css'

const Header = () => {
    const router = useRouter()
    const roomId = router.query.id
    return (
        <>
            <div className={`${gstyle.flex} ${gstyle.justifyCenter}`}>
                <div
                    className={`${style.wAuto} ${gstyle.flex} ${gstyle.justifyEnd}
                    `}
                >
                    <div className={gstyle.pl05}>
                        <Button
                            variant="outlined"
                            style={{ minWidth: '1.5em' }}
                            size="small"
                            className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                            disabled
                        >
                            Game Start
                        </Button>
                    </div>
                    <div className={gstyle.pl05}>
                        <Button
                            variant="outlined"
                            style={{ minWidth: '1.5em' }}
                            size="small"
                            className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                            disabled
                        >
                            Shuffle Member  
                        </Button>
                    </div>
                    <div className={gstyle.pl05}>
                        <Button
                            variant="outlined"
                            style={{ minWidth: '1.5em' }}
                            size="small"
                            className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                            disabled
                        >
                            Rule
                        </Button>
                    </div>
                    <div className={gstyle.pl05}>
                        <Button
                            variant="outlined"
                            style={{ minWidth: '1.5em' }}
                            size="small"
                            className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                            disabled
                        >
                            Chat Log
                        </Button>
                    </div>
                    <div className={gstyle.pl05}>
                        <Button
                            variant="outlined"
                            style={{ minWidth: '1.5em' }}
                            size="small"
                            className={`${gstyle.outlinedBtnPurple} ${style.btn}`}
                            disabled
                        >
                            Team
                        </Button>
                    </div>

                    <div className={`${gstyle.flex} ${gstyle.alignItemsBase} ${gstyle.pl05}`}>
                        <Link href={`${roomId}`} className={style.link}>Invite Link</Link>
                    </div>
                </div>
            </div>
            <hr className={style.divider} />
        </>
    )
}

export default Header
