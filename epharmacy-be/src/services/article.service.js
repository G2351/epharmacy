const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Article } = require("../models/index");
class ArticleService {
  static getAllArticles = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const { rows: articles, count } = await Article.findAndCountAll(options);
    return {
      articles,
      count,
    };
  };

  static deleteArticle = async ({ id }) => {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("Article not found!");
    }
    const deleted = await Article.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
  static updateArticle = async ({ id }, payload) => {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("Article not found!");
    }
    await Article.update(payload, {
      where: {
        id,
      },
    });
  };
  static getArticleDetail = async ({ id }) => {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("Article không tồn tại!");
    }
    return article;
  };
  static createArticle = async (payload) => {
    const { title, description, content, image } = payload;
    const article = await Article.create(payload);
    if (!article) throw new BadRequestError("Create article error");
    return article;
  };
}

module.exports = ArticleService;
