import * as React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/button'
import { Link, useMatch } from 'react-router-dom'

export const NavLink = ({ to, ...rest }) => {
  const match = useMatch(to)
  return <Button as={Link} to={to} size="sm" isActive={!!match} variant="ghost" {...rest} />
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
}
