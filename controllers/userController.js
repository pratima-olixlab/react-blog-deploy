const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Blog = mongoose.model('Blog');

module.exports.register = (req, res, next) => {
  console.log('Inside register function');
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save()
    .then((docs) => {
      res.send(docs)
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body; // Extract email and password from request body
  User.findOne({ email: email }).exec()
    .then((user) => {
      if (!user || !user.verifyPassword(password)) {
        return res.status(401).send('Invalid email or password');
      }
      res.status(200).json({ message: 'Login successful', user: { _id: user._id, username: user.username, email: user.email } });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports.postCategory = (req, res, next) => {
  console.log('Inside category function');
  var category = new Category();
  category.title = req.body.title;
  category.cover = req.file ? req.file.path : null; // Store image path if uploaded
  category.category = req.body.category;
  category.save()
    .then((docs) => {
      res.send(docs)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
}

module.exports.postBlog = (req, res, next) => {
  console.log('Inside blog function');
  var blog = new Blog();
  blog.cover = req.file ? req.file.path : null;
  blog.title = req.body.title;
  blog.category = req.body.category;
  blog.description = req.body.description;
  blog.date = req.body.date;
  blog.save()
    .then((docs) => {
      res.send(docs)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
}

module.exports.getCategory = (req, res, next) => {
  Category.find()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports.getBlog = (req, res, next) => {
  Blog.find()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports.getBlogById = (req, res, next) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then(blog => {
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json(blog);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports.getCategoryById = (req, res, next) => {
  const categoryId = req.params.id;
  Category.findById(categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports.deleteBlogById = (req, res, next) => {
  const blogId = req.params.id; // Extract the blog ID from request params
  Blog.findByIdAndDelete(blogId)
    .then(blog => {
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports.editBlogById = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    let updateFields = req.body;
    if (req.file) {
      updateFields.cover = req.file.path;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateFields, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.editCategoryById = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    let updateFields = req.body;
    if (req.file) {
      updateFields.cover = req.file.path;
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateFields, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', updatedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.postComment = async (req, res, next) => {
  const blogId = req.params.id;
  const { text } = req.body;
  const userId = blogId;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const newComment = {
      text,
      user: userId
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json({ message: 'Comment added successfully', newComment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.getCommentsByBlogId = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};