const { faker } = require("@faker-js/faker");
const { client } = require("../src/config/database");
const { addCommentQuery } = require("../src/models/postCommentQueries");

const generateFakeComment = (length) => {
  const generateFakeCommentModel = () => ({
    description: faker.person.jobDescriptor(),
    user_id: faker.number.int({ min: 1, max: 51 }),
    post_id: faker.number.int({ min: 1, max: 500 }),
  });

  const comments = Array.from({ length: length }, generateFakeCommentModel);

  comments.forEach(async (comment) => {
    const { description, user_id, post_id } = comment;
    const query = {
      text: addCommentQuery,
      values: [description, user_id, post_id],
    };
    try {
      await client.query(query);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  generateFakeComment,
};
