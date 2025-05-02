import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../api/posts';
import useAuth from '../hooks/useAuth';
import { deletePost, updatePost } from '../api/posts';
import PostForm from '../components/posts/PostForm';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (error) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id, authTokens);
        navigate('/');
      } catch (error) {
        setError('Failed to delete post');
      }
    }
  };

  const handleUpdate = async (updatedPost) => {
    try {
      const data = await updatePost(id, updatedPost, authTokens);
      setPost(data);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update post');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {isEditing ? (
        <PostForm
          initialData={post}
          onSubmit={handleUpdate}
          isEditing={true}
        />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{post.content}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span>By {post.author.username}</span>
            <div>
              <span>
                Created: {new Date(post.created_at).toLocaleString()}
              </span>
              {post.updated_at !== post.created_at && (
                <span className="ml-2">
                  (Updated: {new Date(post.updated_at).toLocaleString()})
                </span>
              )}
            </div>
          </div>
          {user && user.user_id === post.author.id && (
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;