import { Grid } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'

const Groups = () => {
  return (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'block'
          },
          backgroundColor:'orange'
        }}
        sm={4}
        >
        Groups List
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          padding:'1rem 3rem'
        }}>
          group details
      </Grid>

    </Grid>
  )
}

export default Groups