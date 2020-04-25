const { uuid } = require("uuidv4")

class RepositoryController {
    constructor(){
        this.repositories = []
    }
    
    index(){
        return this.repositories
    }

    create({ title, url, techs }){
        const newRepository = { id: uuid(), title, url, techs, likes: 0 }
        this.repositories.push(newRepository)
        return newRepository
    }

    update(id, { title, url, techs }){
        let updatedRepository
        
        this.repositories = this.repositories.map(repository => {
            if(repository.id !== id) return repository
            updatedRepository = { id, title, url, techs, likes: repository.likes }
            return updatedRepository
        })
        
        return updatedRepository
    }

    delete(id){
        let deletedRepository
        
        this.repositories = this.repositories.filter(repository => {
            if(!repository.id.includes(id)) return true
            deletedRepository = repository
            return false
        })

        return deletedRepository
    }

    addLike(id){
        let updatedRepository
        
        this.repositories = this.repositories.map(repository => {
            if(!repository.id.includes(id)) return repository
            updatedRepository = {
                ...repository,
                likes: ++repository.likes
            }
            return updatedRepository
        })

        return updatedRepository
    }
}

module.exports = new RepositoryController()