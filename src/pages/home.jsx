import React from 'react'
import { Box, Center, Heading, Button } from '@chakra-ui/react'
import bg from '../assets/bg.jpg'

export const Home = () => (
  <Box background={`url('${bg}') center / cover no-repeat`} h="100vh">
    <Center h="100vh">
      <div>
        <Heading color="white" textAlign="center" mb="4">
          Welcome!
        </Heading>
        <Button>Ready?</Button>
      </div>
    </Center>
  </Box>
)
