import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { Home } from './pages/home'

export const App = () => (
<ChakraProvider>
<Home />
</ChakraProvider>
)