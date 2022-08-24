import { Stack } from '@chakra-ui/layout';
import { Skeleton, SkeletonCircle } from '@chakra-ui/skeleton';

const ChatLoading = () => {
  return (
    // sidebar loading chats Skeleton
    <Stack mt='10px'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonCircle size='9' />
        <Skeleton w='84%' height='35px' />
      </div>
    </Stack>
  );
};

export default ChatLoading;
