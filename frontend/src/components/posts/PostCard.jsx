import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl font-bold text-blue-600 hover:underline mb-2">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>By {post.author.username}</span>
        <div>
          <span>
            Created: {formatDate(post.created_at)}
          </span>
          {post.updated_at !== post.created_at && (
            <span className="ml-2">
              (Updated: {formatDate(post.updated_at)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;