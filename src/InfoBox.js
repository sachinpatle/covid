import { Card ,Typography,CardContent} from '@material-ui/core'
import React from 'react'
import './App.css';

function InfoBox({title,cases,active,isRed,total,...props}) {
    return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infobox--selected'}` } >

    <CardContent>
        <Typography className="info_title" color="textSecondary">
                {title}
        </Typography>
        <h2 className="info_cases">
        {cases} Todays
        </h2>
        <Typography className="info_total" color="textSecondary">
            {total} Total
        </Typography> 
    </CardContent>

    </Card>
    )
}

export default InfoBox
