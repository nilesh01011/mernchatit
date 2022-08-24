import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/layout';

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius='full'
      m={1}
      mb={2}
      variant='solid'
      fontSize={12}
      bg='#98c9e5'
      color='#262d3f'
      key={user._id}
      cursor='pointer'
      fontWeight='650'
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
