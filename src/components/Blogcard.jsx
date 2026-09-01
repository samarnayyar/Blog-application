const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xl mx-auto mb-8">
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
        <p className="text-gray-700 mb-4">{blog.description}</p>
      </div>
      
    </div>
  );
};

export default BlogCard;
