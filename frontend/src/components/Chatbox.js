import { Box } from '@chakra-ui/layout';
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center'
      flexDir='column'
      p={3}
      w={{ base: '100%', md: '68%' }}
      borderRadius='lg'
      borderWidth='1px'
      bg='#262d3f'
      borderColor='#3b4253'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
