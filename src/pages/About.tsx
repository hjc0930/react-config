import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from '@/stores/posts';

interface AboutProps { }

const About: React.FC<AboutProps> = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const posts = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postAdded({
      id: nanoid(),
      title,
      content
    }))
  }

  return (
    <>
      <section>
        <form onSubmit={handleSumbit}>
          <input type="text" name='title' value={title} onChange={(e) => {
            setTitle(e.target.value)
          }} placeholder='请输入' />
          <input type='text' name='content' value={content} onChange={(e) => {
            setContent(e.target.value)
          }} placeholder='请输入' />
          <input type='submit' value='Sumbit' />
        </form>
      </section>
      <section>
        <h2>Posts</h2>
        {
          posts.map(post => (
            <article className="post-excerpt" key={post.id}>
              <h3>{post.title}</h3>
              <p className="post-content">{post.content.substring(0, 100)}</p>
            </article>
          ))
        }
      </section>
    </>
  );
};
export default About