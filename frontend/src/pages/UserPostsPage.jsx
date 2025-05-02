import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsList from '../components/posts/PostsList';
import PostForm from '../components/posts/PostForm';
import { getUserPosts, createPost } from '../api/posts';
import useAuth from '../hooks/useAuth';

const UserPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await getUserPosts(authTokens);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, authTokens, navigate]);

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await createPost(postData, authTokens);
      setPosts([newPost, ...posts]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Create New Post'}
        </button>
      </div>
      {showForm && <PostForm onSubmit={handleCreatePost} />}
      <PostsList posts={posts} />
    </div>
  );
};

export default UserPostsPage;