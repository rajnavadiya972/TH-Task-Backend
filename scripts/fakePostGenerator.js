const { faker } = require("@faker-js/faker");
const { client } = require("../src/config/database");
const { addPostQuery } = require("../database/queries/postCommentQueries");

const generateFakePost = (length) => {
  const generateFakePostModel = () => ({
    title: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    user_id: faker.number.int({ min: 1, max: 51 }),
  });

  const posts = Array.from({ length: length }, generateFakePostModel);

  posts.forEach(async (post) => {
    const { title, description, user_id } = post;
    const query = {
      text: addPostQuery,
      values: [title, description, user_id],
    };
    try {
      await client.query(query);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  generateFakePost,
};
