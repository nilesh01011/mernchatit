import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
          bg='#bee3f8'
          color='#262d3f'
          _hover={{
            background: '#98c9e5',
          }}
        />
      )}
      <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          color='#bee3f8'
          bg='#262d3f'
          borderColor='#3b4253'
          h='410px'
        >
          <ModalHeader
            className='HeaderTitle'
            fontSize='40px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              w='auto'
              h='140px'
              src={user.pic}
              alt={user.name}
            />
            <Text className='emailText' fontSize={{ base: '28px', md: '30px' }}>
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter display='flex' justifyContent='center'>
            <Button
              bg='#bee3f8'
              color='#262d3f'
              className='profileButtons'
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
