const { faker } = require("@faker-js/faker");

import { client } from "../src/config/database";
import { addPostQuery } from "../database/queries/postCommentQueries";

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

export default {
  generateFakePost,
};
