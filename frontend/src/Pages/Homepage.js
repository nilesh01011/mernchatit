import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Login from '../components/Authentication/login/Login';
import Signup from '../components/Authentication/Signup/Signup';
import { FaUserShield, FaUserPlus } from 'react-icons/fa';
import styled from 'styled-components';

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) history.push('/chats');
  }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
        borderColor='#3b4253'
        boxShadow='lg'
        background='transparent'
      >
        <Text fontSize='4xl' textAlign='center' color='#bee3f8'>
          Chat-It
        </Text>
      </Box>
      {/* Tabs Titls End */}
      {/* =======step 5 add Login and Registers===== */}
      <Box
        color='#d0d2d6'
        borderColor='#3b4253'
        mb='30px'
        w='100%'
        p={4}
        borderRadius='lg'
        borderWidth='1px'
        boxShadow='lg'
      >
        <Tabs isFitted variant='soft-rounded'>
          <TabList w='100%' mb='1.5em'>
            <Tab
              w='50%'
              gap='1.5'
              color='#718096'
              _focus={{ boxShadow: 'none' }}
            >
              <FaUserShield />
              Login
            </Tab>
            <Tab
              w='50%'
              gap='1.5'
              _focus={{ boxShadow: 'none' }}
              color='#718096'
            >
              <FaUserPlus />
              Sign Up
            </Tab>
          </TabList>
          {/* =======step 5 add Login and Registers===== */}
          <ContainerContent>
            <TabPanels>
              <TabPanel className='tabsContent'>
                {/* ====Login Added==== */}
                <Login />
                {/* ====Login Added==== */}
              </TabPanel>
              <TabPanel className='tabsContent'>
                {/* ====SignUp Added==== */}
                <Signup />
                {/* ====SignUp Added==== */}
              </TabPanel>
            </TabPanels>
          </ContainerContent>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;

const ContainerContent = styled.div`
  @media screen and (max-width: 576px) {
    & {
      & .tabsContent {
        padding: 0;
      }
    }
  }
`;
