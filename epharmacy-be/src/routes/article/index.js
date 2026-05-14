"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const ArticleController = require("../../controllers/article.controller");
const router = express.Router();

router.get("/articles", asyncHandler(ArticleController.getAllArticles));
router.get("/articles/:id", asyncHandler(ArticleController.getArticleDetail));
router.post("/articles", asyncHandler(ArticleController.createArticle));
router.patch("/articles/:id", asyncHandler(ArticleController.updateArticle));
router.delete("/articles/:id", asyncHandler(ArticleController.deleteArticle));

module.exports = router;
