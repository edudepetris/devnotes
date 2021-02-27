import {hot} from 'react-hot-loader/root'
import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {useFormik} from 'formik'
import * as Yup from 'yup'

import {
  FormControl,
  FormLabel,
  Alert,
  Icon,
  Box,
  Text,
  Flex,
  Heading,
  Input,
  Button,
  AlertIcon,
  AlertDescription,
  CircularProgress,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core'
import ThemeToggler from '../../components/ThemeToggler'
import ThemeProvider from '../../components/ThemeProvider'

const LoginForm = ({
  authenticityToken,
  errorMessage,
  resource,
  infoMessage,
  signInPath,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  /* eslint-disable react/forbid-prop-types */
  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      user: {
        email: (resource && resource.email) || '',
        password: '',
      },
    },
    validationSchema: Yup.object().shape({
      user: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      }),
    }),
    onSubmit: () => {
      setIsLoading(true)
      document.querySelector('form').submit()
    },
  })
  /* eslint-enable react/forbid-prop-types */

  return (
    <Box>
      <Box textAlign="center">
        <Heading>Login</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form
          method="POST"
          acceptCharset="UTF-8"
          action={signInPath}
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="authenticity_token"
            value={authenticityToken}
          />
          <input type="hidden" name="commit" value="Login" />

          {errorMessage && (
            <Box my={4}>
              <Alert status="error" borderRadius={4}>
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </Box>
          )}

          {infoMessage && (
            <Box my={4}>
              <Alert status="info" borderRadius={4}>
                <AlertIcon />
                <AlertDescription>{infoMessage}</AlertDescription>
              </Alert>
            </Box>
          )}

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="test@test.com"
              boxSize="lg"
              name="[user][email]"
              id="user_email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user.email}
            />
            {touched.user &&
            touched.user.email &&
            errors.user &&
            errors.user.email ? (
              <Text mt={1} variant="caption" color="red.500">
                {errors.user.email}
              </Text>
            ) : null}
          </FormControl>

          <FormControl mt={6}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="*******"
                boxSize="lg"
                name="[user][password]"
                id="user_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.user.password}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.5rem"
                  boxSize="sm"
                  onClick={handlePasswordVisibility}
                  data-testid="password-view"
                >
                  {showPassword ? (
                    <Icon name="view-off" />
                  ) : (
                    <Icon name="view" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {touched.user &&
            touched.user.password &&
            errors.user &&
            errors.user.password ? (
              <Text mt={1} variant="caption" color="red.500">
                {errors.user.password}
              </Text>
            ) : null}
          </FormControl>
          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
            width="full"
            mt={4}
          >
            {isLoading ? (
              <CircularProgress isIndeterminate w="24px" h="24px" color="teal" />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

LoginForm.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  signInPath: PropTypes.string.isRequired,
}

const SignInScreen = ({
  authenticityToken,
  errorMessage,
  resource,
  infoMessage,
  signInPath,
  signUpPath,
  resetPasswordPath,
}) => {
  return (
    <ThemeProvider>
      <ThemeToggler />
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <LoginForm
            authenticityToken={authenticityToken}
            errorMessage={errorMessage}
            resource={resource}
            infoMessage={infoMessage}
            signInPath={signInPath}
          />
          <Flex justify="space-between">
            <Text as="a" href={signUpPath} color="teal.400" fontSize="sm">
              Sign up
            </Text>
            <Text
              as="a"
              href={resetPasswordPath}
              color="teal.400"
              fontSize="sm"
            >
              Forgot your password?
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

SignInScreen.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  signInPath: PropTypes.string.isRequired,
  signUpPath: PropTypes.string.isRequired,
  resetPasswordPath: PropTypes.string.isRequired,
}

export default hot(SignInScreen)
