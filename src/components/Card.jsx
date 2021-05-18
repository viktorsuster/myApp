import * as React from 'react'
import { Badge, Box, Image, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { times } from 'lodash-es'
import PropTypes from 'prop-types'

const Stars = ({ starsCount = 5, filledCount }) => {
  return times(starsCount, (i) => (
    <StarIcon key={i} color={i < filledCount ? 'teal.500' : 'gray.300'} />
  ))
}
export const Card = ({
  ImageUrl,
  numberOfNights,
  destination,
  formattedPrice,
  rating,
  reviewsCount,
  isNew,
  // linkTo,
}) => {
  return (
    <Box mb="4" maxW="60" borderRadius="md" overflow="hidden" shadow="base">
      <Image src={ImageUrl} />
      <Box p="4">
        <Text fontWeight="semibold" color="gray.500" fontSize="xs" textTransform="uppercase">
          {numberOfNights} {numberOfNights <= 1 ? 'night' : 'nights'}
        </Text>
        {isNew && (
          <Badge borderRadius="lg" p="1" backgroundColor="green.300" color="teal.900">
            New
          </Badge>
        )}

        <Text>{destination}</Text>
        <Text>{formattedPrice}</Text>
        <Stars filledCount={Math.floor(rating)} />
        <Text>{reviewsCount} reviews</Text>
      </Box>
    </Box>
  )
}
Card.propTypes = {
  ImageUrl: PropTypes.string,
  numberOfNights: PropTypes.number,
  destination: PropTypes.string,
  formattedPrice: PropTypes.string,
  rating: PropTypes.number,
  reviewsCount: PropTypes.number,
  // linkTo: PropTypes.string,
  isNew: PropTypes.bool,
}
