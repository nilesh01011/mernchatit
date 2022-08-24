import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const positions = ['top-right'];
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      toast({
        title: 'Login Successful please refresh the page',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing='10px'>
      <FormControl id='email' isRequired>
        <FormLabel color='#bee3f8'>Email Address</FormLabel>
        <Input
          borderColor='#3b4253'
          value={email}
          type='email'
          placeholder='Enter Your Email Address'
          onChange={(e) => setEmail(e.target.value)}
          id='EmailInput'
        />
      </FormControl>
      <FormControl id='loginPassword' isRequired>
        <FormLabel color='#bee3f8'>Password</FormLabel>
        <InputGroup>
          <Input
            id='passwordInput'
            value={password}
            borderColor='#3b4253'
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder='Enter your password'
          />
          <InputRightElement width='3rem'>
            <Button
              id='buttons'
              bg='transparent'
              h='1.75rem'
              size='sm'
              onClick={handleClick}
            >
              {show ? (
                <AiOutlineEye size={16} />
              ) : (
                <AiOutlineEyeInvisible size={16} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 30 }}
        onClick={submitHandler}
        isLoading={loading}
        bg='#bee3f8'
        color='#2c5282'
        id='loginBtn'
        _focus={{ boxShadow: 'none' }}
      >
        Login
      </Button>
      <Button
        variant='solid'
        width='100%'
        bg='#E53E3E'
        _hover={{
          background: '#C53030',
        }}
        color='#fff'
        onClick={() => {
          setEmail('guest-example@gmail.com');
          setPassword('123456');
        }}
        _focus={{ boxShadow: 'none' }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
