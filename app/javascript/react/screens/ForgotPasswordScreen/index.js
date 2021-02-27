import {hot} from 'react-hot-loader/root'
import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {useFormik} from 'formik'
import * as Yup from 'yup'

import {
  FormControl,
  FormLabel,
  Alert,
  Box,
  Text,
  Flex,
  Heading,
  Input,
  Button,
  AlertIcon,
  AlertDescription,
  CircularProgress,
} from '@chakra-ui/react'
import ThemeToggler from '../../components/ThemeToggler'
import ThemeProvider from '../../components/ThemeProvider'

const ForgotPasswordForm = ({
  authenticityToken,
  errorMessage,
  resource,
  forgotPasswordPath,
}) => {
  const [isLoading, setIsLoading] = useState(false)

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
      },
    },
    validationSchema: Yup.object().shape({
      user: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      }),
    }),
    onSubmit: () => {
      setIsLoading(true)
      document.querySelector('form#forgot_password_form').submit()
    },
  })
  /* eslint-enable react/forbid-prop-types */

  return (
    <Box>
      <Box textAlign="center">
        <Heading>Forgot your password?</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form
          id="forgot_password_form"
          method="POST"
          acceptCharset="UTF-8"
          action={forgotPasswordPath}
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

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder=""
              size="lg"
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
              'Send me reset password instructions'
            )}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

ForgotPasswordForm.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  forgotPasswordPath: PropTypes.string.isRequired,
}

const ForgotPasswordScreen = ({
  authenticityToken,
  errorMessage,
  resource,
  signInPath,
  signUpPath,
  forgotPasswordPath,
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
          <ForgotPasswordForm
            authenticityToken={authenticityToken}
            errorMessage={errorMessage}
            resource={resource}
            forgotPasswordPath={forgotPasswordPath}
          />
          <Flex justify="space-between">
            <Text as="a" href={signInPath} color="teal.400" fontSize="sm">
              Log in
            </Text>
            <Text as="a" href={signUpPath} color="teal.400" fontSize="sm">
              Sign up
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

ForgotPasswordScreen.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  signInPath: PropTypes.string.isRequired,
  signUpPath: PropTypes.string.isRequired,
  forgotPasswordPath: PropTypes.string.isRequired,
}

export default hot(ForgotPasswordScreen)
