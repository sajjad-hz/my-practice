import express from 'express'
import ArticleController from '../../../controllers/api/admin/article'
import acl from '../../../middlewares/acl'

const router = express.Router()

router.get('',acl('WRITER'), ArticleController.list)
// router.get('/:id([0-9]+)', ArticleController.get)
router.get('/:id(\\d+)',acl('WRITER'), ArticleController.get)
// router.get('/create', ArticleController.create)
router.post('',acl('WRITER'), ArticleController.add)
// router.get('/:id(\\d+)/edit', ArticleController.edit)
router.put('/:id(\\d+)',acl('MODERATOR'), ArticleController.update)
router.delete('/:id(\\d+)',acl('ADMIN'), ArticleController.remove)

export default router

// RESTFUL API

// GET      /article        List
// GET      /article/:id    Get an article
// POST     /article        Create an article
// PUT      /article/:id    Full update an article
// PATCH    /article/:id    Partial update an article
// DELETE   /article/:id    Delete an article
