import React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Center, Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.jpg'

export const Home = () => (
  <Box background={`url('${bg}') center / cover no-repeat`} h="100vh">
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Center h="100vh">
      <div>
        <Heading color="white" textAlign="center" mb="4">
          Top Travel Destination !
        </Heading>
        <Center>
          <Button as={Link} to="/offers">
            Explore The World
          </Button>
        </Center>
      </div>
    </Center>
  </Box>
)
