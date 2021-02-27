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
} from '@chakra-ui/react'
import ThemeToggler from '../../components/ThemeToggler'
import ThemeProvider from '../../components/ThemeProvider'

const SignUpForm = ({
  authenticityToken,
  errorMessages,
  resource,
  signUpPath,
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
        password_confirmation: '',
      },
    },
    validationSchema: Yup.object().shape({
      user: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .required('Required')
          .min(6, '6 characters minimum'),
        password_confirmation: Yup.string().required('Required'),
      }),
    }),
    onSubmit: () => {
      setIsLoading(true)
      document.querySelector('form#new_user_form').submit()
    },
  })
  /* eslint-enable react/forbid-prop-types */

  return (
    <Box>
      <Box textAlign="center">
        <Heading>Sign up</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form
          id="new_user_form"
          method="POST"
          acceptCharset="UTF-8"
          action={signUpPath}
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="authenticity_token"
            value={authenticityToken}
          />
          <input type="hidden" name="commit" value="Login" />

          {errorMessages && errorMessages.length > 0 && (
            <Box my={4}>
              <Alert status="error" borderRadius={4} flexDirection="column">
                <AlertIcon />
                {errorMessages.map((msg, index) => (
                  <AlertDescription key={`error-${index + 1}`}>
                    {msg}
                  </AlertDescription>
                ))}
              </Alert>
            </Box>
          )}

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder=""
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
            <FormLabel>
              Password <Text as="i">(6 characters minimum)</Text>
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="*******"
                boxSize="lg"
                name="[user][password]"
                id="user_password"
                autocomplete="new-password"
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

          <FormControl mt={6}>
            <FormLabel>Password confirmation</FormLabel>
            <Input
              type="password"
              placeholder="*******"
              boxSize="lg"
              name="[user][password_confirmation]"
              id="user_password_confirmation"
              onChange={handleChange}
              autocomplete="new-password"
              onBlur={handleBlur}
              value={values.user.password_confirmation}
            />
            {touched.user &&
            touched.user.password_confirmation &&
            errors.user &&
            errors.user.password_confirmation ? (
              <Text mt={1} variant="caption" color="red.500">
                {errors.user.password_confirmation}
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
              'Sign Up'
            )}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

SignUpForm.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  signUpPath: PropTypes.string.isRequired,
}

const SignUpScreen = ({
  authenticityToken,
  errorMessages,
  resource,
  signInPath,
  signUpPath,
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
          <SignUpForm
            authenticityToken={authenticityToken}
            errorMessages={errorMessages}
            resource={resource}
            signUpPath={signUpPath}
          />
          <Flex justify="center">
            <Text as="a" href={signInPath} color="teal.400" fontSize="sm">
              Log in
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

SignUpScreen.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  signInPath: PropTypes.string.isRequired,
  signUpPath: PropTypes.string.isRequired,
}

export default hot(SignUpScreen)
