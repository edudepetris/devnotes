import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  FormLabel,
  FormControl,
  FormHelperText,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
import {ViewOffIcon, ViewIcon} from '@chakra-ui/icons'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import ThemeToggler from '../../components/ThemeToggler'
import ThemeProvider from '../../components/ThemeProvider'

const MyAccountForm = ({
  authenticityToken,
  errorMessages,
  myAccountPath,
  resource,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  /* eslint-disable react/forbid-prop-types */
  const {handleSubmit, values, touched, handleChange, errors} = useFormik({
    initialValues: {
      user: {
        email: (resource && resource.email) || '',
        password: '',
        password_confirmation: '',
        current_password: '',
      },
    },
    validationSchema: Yup.object().shape({
      user: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .required('Required')
          .min(6, '6 characters minimum'),
        password_confirmation: Yup.string().required('Required'),
        current_password: Yup.string().required('Required'),
      }),
    }),
    onSubmit: () => {
      setIsLoading(true)
      document.querySelector('form#edit_user').submit()
    },
  })
  /* eslint-enable react/forbid-prop-types */

  return (
    <Box>
      <Box textAlign="center">
        <Heading>Edit my account</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form
          id="edit_user"
          method="POST"
          acceptCharset="UTF-8"
          action={myAccountPath}
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="authenticity_token"
            value={authenticityToken}
          />
          <input type="hidden" name="_method" value="put" />

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

          <Text>{values.user.email}</Text>

          <FormControl id="password" mt={6}>
            <FormLabel>
              Password <Text as="i">(6 characters minimum)</Text>
            </FormLabel>

            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter New password"
                name="[user][password]"
                id="user_password"
                autoComplete="new-password"
                value={values.user.password}
                onChange={handleChange}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              leave blank if you don&apos;t want to change it.
            </FormHelperText>
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
              pr="4.5rem"
              type="password"
              placeholder="Repeat New password"
              name="[user][password_confirmation]"
              id="user_password_confirmation"
              autoComplete="new-password"
              value={values.user.password_confirmation}
              onChange={handleChange}
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

          <FormControl mt={6}>
            <FormLabel>Current password</FormLabel>
            <Input
              pr="4.5rem"
              type="password"
              placeholder="Current password"
              name="[user][current_password]"
              id="user_current_password"
              autoComplete="current-password"
              value={values.user.current_password}
              onChange={handleChange}
            />
            <FormHelperText>
              we need your current password to confirm your changes
            </FormHelperText>
            {touched.user &&
            touched.user.current_password &&
            errors.user &&
            errors.user.current_password ? (
              <Text mt={1} variant="caption" color="red.500">
                {errors.user.current_password}
              </Text>
            ) : null}
          </FormControl>

          <Button
            isLoading={isLoading}
            colorScheme="teal"
            variant="outline"
            type="submit"
            width="full"
            mt={4}
          >
            Update
          </Button>
        </form>
      </Box>
    </Box>
  )
}

MyAccountForm.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  myAccountPath: PropTypes.string.isRequired,
}

const MyAccountScreen = ({
  authenticityToken,
  resource,
  errorMessages,
  myAccountPath,
}) => {
  return (
    <ThemeProvider>
      <ThemeToggler />
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth={{base: 'auto', md: '600px'}}
          minWidth={{base: 'auto', md: '450px'}}
          borderWidth={{base: 0, md: 1}}
          borderRadius={8}
          boxShadow={{base: 'none', md: 'lg'}}
        >
          <MyAccountForm
            authenticityToken={authenticityToken}
            errorMessages={errorMessages}
            myAccountPath={myAccountPath}
            resource={resource}
          />
          <Flex justify="center">
            <Text as="a" href="/dashboard" color="teal.400" fontSize="sm">
              Go to dashboard
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

MyAccountScreen.propTypes = {
  resource: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  authenticityToken: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  myAccountPath: PropTypes.string.isRequired,
}

export default MyAccountScreen
