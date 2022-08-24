import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import './Signup.scss';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const positions = ['top-right'];
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClick = () => setShowConfirm(!showConfirm);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: positions,
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user',
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: 'Registration Successful please refresh the page',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      return;
    }
    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'piyushproj');
      fetch('https://api.cloudinary.com/v1_1/doqlrg2gx/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing='5px'>
      <FormControl id='firstInput' isRequired>
        <FormLabel color='#bee3f8'>First name</FormLabel>
        <Input
          id='firstInput'
          borderColor='#3b4253'
          placeholder='Enter Your Name'
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='emailInput' isRequired>
        <FormLabel color='#bee3f8'>Email Address</FormLabel>
        <Input
          id='emailInput'
          borderColor='#3b4253'
          type='email'
          placeholder='Enter Your Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='PasswordInput' isRequired>
        <FormLabel color='#bee3f8'>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            id='PasswordInput'
            borderColor='#3b4253'
            type={show ? 'text' : 'password'}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='3rem'>
            <Button
              id='buttons'
              h='1.75rem'
              size='sm'
              onClick={handleClick}
              bg='transparent'
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
      <FormControl id='ConfirmInput' isRequired>
        <FormLabel color='#bee3f8'>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            id='ConfirmInput'
            borderColor='#3b4253'
            type={show ? 'text' : 'password'}
            placeholder='Enter your password again'
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width='3rem'>
            <Button
              id='buttons'
              h='1.75rem'
              size='sm'
              onClick={handleConfirmClick}
              bg='transparent'
            >
              {showConfirm ? (
                <AiOutlineEye size={16} />
              ) : (
                <AiOutlineEyeInvisible size={16} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='picInput'>
        <FormLabel color='#bee3f8'>Upload your Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          borderColor='#3b4253'
          id='picInput'
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
        bg='#bee3f8'
        color='#2c5282'
        id='signUpBtn'
        _focus={{ boxShadow: 'none' }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
