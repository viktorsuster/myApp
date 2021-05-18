import { Box, Container, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { RiCodeSSlashFill } from 'react-icons/ri'
import { NavLink } from './NavLinks'

export const Header = () => {
  return (
    <Box as="header" p="4" shadow="base">
      <Container
        maxWidth="container.xl"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
      >
        <Link to="/">
          <RiCodeSSlashFill />
          <Text as="h2" fontWeight="bold">
            My First App
          </Text>
        </Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/offers">Offers</NavLink>
        </nav>
      </Container>
    </Box>
  )
}
