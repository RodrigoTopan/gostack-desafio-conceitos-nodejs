const express = require('express')

const router = express.Router()

/**
 * Controllers
 */
const repositoryController = require('./controllers/RepositoryController')

/**
 * Routes
 */
router.get("/repositories", (request, response) => {
    const repositories = repositoryController.index()
    return response.json(repositories)
})

router.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body
    const createdRepository = repositoryController.create({ title, url, techs })
    return response.json(createdRepository)
})

router.put("/repositories/:id", (request,response) => {
    const { id } = request.params
    const { title, url, techs, likes } = request.body
    
    if(likes){
        return response.json({ likes: 0 })
    }

    const updatedRepository = repositoryController.update(id, { title, url, techs })

    if(!updatedRepository){
        return response
            .status(400)
            .json({ error: "Repository doesn't exist"})
    }

    return response.json(updatedRepository)
})

router.delete("/repositories/:id", (request,response) => { 
    const { id } = request.params
    const deletedRepository = repositoryController.delete(id)

    if(!deletedRepository){
        return response
            .status(400)
            .json({ error: "Repository doesn't exist"})
    }
    
    return response.status(204).json(deletedRepository)
})

router.post("/repositories/:id/like", (request,response) => {
    const { id } = request.params
    const updatedRepository = repositoryController.addLike(id)

    if(!updatedRepository){
        return response
            .status(400)
            .json({ error: "Repository doesn't exist"})
    }

    return response.json({ likes: updatedRepository.likes })
})

module.exports = router
