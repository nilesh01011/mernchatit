import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import ChatLoading from '../ChatLoading';
import { Spinner } from '@chakra-ui/spinner';
import ProfileModal from './ProfileModal';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { getSender } from '../../config/ChatLogics';
import UserListItem from '../userAvatar/UserListItem';
import { ChatState } from '../../Context/ChatProvider';
import './style.scss';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

function SideDrawer() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const positions = ['top-right'];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: positions,
      });
    }
  };

  return (
    <>
      <Box
        d='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='#262d3f'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
        borderColor='#3b4253'
        color='#bee3f8'
      >
        <Tooltip
          label='Search Users to chat it'
          hasArrow
          placement='bottom'
          bg='#bee3f8'
          color='#3b4253'
          borderRadius='5px'
        >
          <SearchingContainer>
            <Button className='buttons' variant='ghost' onClick={onOpen}>
              <BsSearch />
              <Text
                className='searchText'
                d={{ base: 'none', md: 'flex' }}
                px={4}
              >
                Search User
              </Text>
            </Button>
          </SearchingContainer>
        </Tooltip>
        <Text fontSize='2xl' fontFamily='Josefin Sans' pr='10px'>
          Chat-It
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize='2xl' m={1} />
            </MenuButton>
            <MenuList pl={2} borderColor='#3b4253' bg='#98c9e5' color='#262d3f'>
              {!notification.length && 'No New Messages'}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  _hover={{
                    background: '#98c9e5',
                  }}
                  className='messagesBoxs'
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              color='#bee3f8'
              className='buttons'
              bg='#262d3f'
              as={Button}
              id='profileBtn'
              borderWidth='1px'
              borderColor='#3b4253'
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size='sm'
                cursor='pointer'
                name={user.name}
                src={user.pic}
                bg='#bee3f8'
              />
            </MenuButton>
            <MenuList
              color='#bee3f8'
              bg='#262d3f'
              borderColor='#3b4253'
              className='tooltipContainer'
            >
              <ProfileModal user={user}>
                <MenuItem className='lists'>My Profile</MenuItem>{' '}
              </ProfileModal>
              <MenuDivider />
              <MenuItem className='lists' onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent color='#bee3f8' bg='#262d3f'>
          <DrawerHeader borderBottomWidth='1px' borderColor='#3b4253'>
            Search Users
          </DrawerHeader>
          <DrawerBody pt='1rem'>
            <Box d='flex' pb={4}>
              <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                borderColor='#bee3f8'
                color='#bee3f8'
                className='inputesSearch'
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                className='searchBtn'
                color='#bee3f8'
                bg='#3b4253'
                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => accessChat(u._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml='auto' d='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;

const SearchingContainer = styled.div`
  & {
    & .buttons {
      &:hover {
        background: #3b4253;
      }
    }
  }

  @media screen and (max-width: 480px) {
    & {
      & .searchText {
        display: none;
      }
    }
  }
`;
