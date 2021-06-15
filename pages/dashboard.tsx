import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { ApolloError } from '@apollo/client';
import { AppBarProps } from '@material-ui/core/AppBar'
import { Box, Typography } from '@material-ui/core';
import { AlertProps, Alert, AlertTitle } from '@material-ui/lab';
import Wrapper from '../src/components/Wrapper'
import { isLoggedIn } from '../src/lib/auth';
import { useMeQuery } from '../src/generated/graphql';
import * as ROUTES from "../src/lib/routes"

export default function Dashboard() {
  const [alert, setAlert] = useState<ApolloError | null>(null)
  const router = useRouter()
  const { data, loading, error } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  })
  
  const headerProps = {
    page: 'dashboard',
    bgColor: 'secondary' as AppBarProps["color"]
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push(ROUTES.LOGIN)
    }
  }, [])

  return (
    <Wrapper headerProps={headerProps} user={data?.me}>
      {loading
        ?
          <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
            <Typography variant="h5" color='secondary'>
              Loading...
            </Typography>
          </Box>
        : error
          ?
            <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
              {
                alert &&
                  <Alert severity='error' onClose={() => setAlert(null)}>
                    <AlertTitle>{alert.name}</AlertTitle>
                    {alert.message}
                  </Alert>
              }
            </Box>
          : <div className="root">Hello {data?.me?.name}</div>
      }
    </Wrapper>
  )
}
