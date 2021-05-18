import * as React from 'react'
import { Helmet } from 'react-helmet'
import { sortBy, uniqBy } from 'lodash-es'
import { differenceInMonths } from 'date-fns'
import { uniqueId } from 'lodash'
import { SearchIcon } from '@chakra-ui/icons'
import {
  useToast,
  Spinner,
  Tooltip,
  Center,
  Text,
  Box,
  Flex,
  Input,
  Radio,
  Checkbox,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  RadioGroup,
  Grid,
} from '@chakra-ui/react'
import bg from '../assets/bg.jpg'
import { Header } from './components/Header'
import { Card } from '../components/Card'
import { useOffers } from '../hooks'

const initialActiveFilters = {
  newOnly: false,
  country: 'all',
}

const isNew = (date) => differenceInMonths(new Date(), new Date(date)) <= 6

export const Offers = () => {
  const { data, error, isLoading } = useOffers()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [activeFilters, setActiveFilters] = React.useState(initialActiveFilters)
  const toast = useToast()

  if (error) {
    toast({
      status: 'error',
      title: 'Oi! Something went wrong!',
      description: 'We will fix the problem as soon as possible.',
    })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const searchResults = data.filter(({ country, city }) => {
    return (country + city).toLowerCase().includes(searchTerm.toLowerCase())
  })

  const onlyNewSearchResults = activeFilters.newOnly
    ? searchResults?.filter((item) => isNew(item.createdAt))
    : searchResults

  const onlyNewSearchResultsSortedByCountry = sortBy(
    uniqBy(onlyNewSearchResults, ({ country }) => country),
    ({ country }) => country
  )

  const onlyNewSearchResultsFilteredByCountry =
    activeFilters.country === 'all'
      ? onlyNewSearchResults
      : onlyNewSearchResults?.filter(({ country }) => country === activeFilters.country)

  return (
    <>
      <Helmet>
        <title>Offers</title>
      </Helmet>
      <Header />
      <Stack
        justifyContent="center"
        w="100vw"
        h="280px"
        mb="5"
        background={`url('${bg}') center / cover no-repeat`}
      >
        <Center margin="auto">
          <Tooltip hasArrow label="Search dream destination" bg="yellow.400">
            <InputGroup>
              <InputLeftElement children={<SearchIcon color="gray.300" />} />
              <Input
                type="search"
                placeholder="Search..."
                size="lg"
                w="lg"
                color="white"
                variant="filled"
                fontWeight="semibold"
                fontSize="xl"
                onChange={handleSearch}
                value={searchTerm}
              />
            </InputGroup>
          </Tooltip>
        </Center>
      </Stack>
      <Center>
        <Flex>
          <Box width="15vw" overflow="hidden">
            <Text fontWeight="bold" fontSize="18">
              FILTERS
            </Text>
            <Checkbox
              mt="3"
              onChange={(e) => {
                setActiveFilters((prevState) => {
                  return {
                    ...prevState,
                    newOnly: e.target.checked,
                  }
                })
              }}
              checked={activeFilters.newOnly}
            >
              New Only
            </Checkbox>
            <Text fontWeight="bold" mt="3" fontSize="15">
              FILTER BY COUNTRY
            </Text>
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <RadioGroup
                onChange={(country) =>
                  setActiveFilters((prevState) => {
                    return { ...prevState, country }
                  })
                }
                value={activeFilters.country}
              >
                <Grid mt="3">
                  <Radio value="all">ALL</Radio>
                  {onlyNewSearchResultsSortedByCountry.map(({ id, country }) => (
                    <Radio key={id} value={country}>
                      {country}
                    </Radio>
                  ))}
                </Grid>
              </RadioGroup>
            )}
          </Box>
          <Box width="50vw">
            <Text color="gray.400">{data.length} offers found</Text>
            <SimpleGrid mt="3" minChildWidth="200px" spacingX="20px" spacingY="20px">
              {isLoading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                onlyNewSearchResultsFilteredByCountry?.map(
                  ({
                    thumbnail,
                    nights,
                    city,
                    country,
                    price,
                    rating,
                    reviewCount,
                    id,
                    createdAt,
                  }) => (
                    <Card
                      key={uniqueId()}
                      ImageUrl={thumbnail}
                      numberOfNights={nights}
                      destination={`${city}, ${country}`}
                      formattedPrice={new Intl.NumberFormat('sk', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                      }).format(price)}
                      rating={rating}
                      reviewsCount={reviewCount}
                      linkTo={`/offers/${id}`}
                      isNew={isNew(createdAt)}
                    />
                  )
                )
              )}
            </SimpleGrid>
          </Box>
        </Flex>
      </Center>
    </>
  )
}
