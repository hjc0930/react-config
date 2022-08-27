export const getPosts = async () => {
  const response = await fetch('http://127.0.0.1:3000/posts');
  return response.json();
}