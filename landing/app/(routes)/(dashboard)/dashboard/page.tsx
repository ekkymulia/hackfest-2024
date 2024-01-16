"use client"
import { Box } from '@/components/ui/styles/box'
import { Flex } from '@/components/ui/styles/flex'
import { Button } from '@nextui-org/react'
import React from 'react'

const DashboardPage = () => {
  return (
    <Box>
    <Flex
        css={{
        'gap': '$10',
        'padding': '$10',
        'alignItems': 'center',
        'justifyContent': 'center',
        '@sm': {
            flexWrap: 'nowrap',
        },
        }}
        direction={'row'}
    >
        <Button color="primary" css={{ marginTop: '$10'}} >
           Login Page
        </Button>
    </Flex>
</Box>
)
}

export default DashboardPage