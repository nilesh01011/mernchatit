import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#262d3f'
      _hover={{
        background: '#3b4253',
      }}
      w='100%'
      d='flex'
      alignItems='center'
      px={3}
      py={2}
      mb={2}
      borderRadius='lg'
      color='#bee3f8'
      borderColor='#3b4253'
    >
      <Avatar
        mr={2}
        size='sm'
        cursor='pointer'
        name={user.name}
        src={user.pic}
        bg='#bee3f8'
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
