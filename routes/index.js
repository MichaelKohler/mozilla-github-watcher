const express = require('express');
const StorageHandler = require('../lib/storage-handler');
const router = express.Router();
const storageHandler = new StorageHandler();

const REPO_KEY = 'REPOSITORIES';
const WIKI_KEY = 'WIKI_EDITS';
const MAX_RETURN_ROWS_NEW = 200;
const MAX_RETURN_ROWS_UPDATED = 200;

/* GET home page. */
router.get('/', (req, res, next) => {
  const repos = storageHandler.getStorageItem(REPO_KEY).sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }).slice(0, MAX_RETURN_ROWS_NEW);;

  const updatedRepos = storageHandler.getStorageItem(REPO_KEY).sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  }).slice(0, MAX_RETURN_ROWS_UPDATED);

  const wikiEdits = storageHandler.getStorageItem(WIKI_KEY);

  res.render('index', {
    title: 'What is happening inside Mozilla?',
    repos,
    updatedRepos,
    wikiEdits
  });
});

module.exports = router;
