import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectAllPosts } from '@/stores/posts';

interface PostsProps { }

const Posts: React.FC<PostsProps> = (props) => {
  const { } = props;
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state: any) => state.posts.status);

  // useEffect(() => {
  //   if (postsStatus === 'idle') {

  //   }

  // }, [postsStatus, dispatch])

  return (
    <ul>
      {
        posts.map(item => (
          <li key={item.id}>{item.name}</li>
        ))
      }
    </ul>
  );
};
export default Posts