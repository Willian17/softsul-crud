const database = require('../database/connection')
const validation = require('./validation')

module.exports = {
    async  index(request, response) {
        await database('branches')
            .select('id', 'name', 'city')
            .then(data => response.json(data))
            .catch(error => response.status(500).send(error))
    },

    async create(request, response) {
        const { name, city, CNPJ, address, email, latitude, longitude } = request.body

        try {
            validation.existsOrError(name, 'Nome não informado')
            validation.existsOrError(city, 'Cidade não informada')
            validation.existsOrError(CNPJ, 'CNPJ não informado')
            validation.existsOrError(address, 'Endereço não informado')
            validation.existsOrError(email, 'Email não informado')
            validation.existsOrError(latitude, 'Latitude não informada')
            validation.existsOrError(longitude, 'Longitude não informado')
            validation.validateCnpjOrError(CNPJ , 'CNPJ inválido')

        } catch (error) {
            return response.status(400).send(error)
        }

        await database('branches')
            .insert({
                name,
                city,
                CNPJ,
                address,
                email,
                latitude,
                longitude,
            })
            .then(() => response.status(204).send())
            .catch(err => response.status(500).send(err))
    },
    async search(request, response) {
      const search =  (request.query.search).toLowerCase()
      await database('branches')
      .select('id' , 'name' , 'city')
      .then(branches => {
          if(branches){
              const filteredBranches = branches.filter(branche => branche.name.toLowerCase().includes(search))
              return response.json(filteredBranches)
          }else{
              response.send()
          }
      })
      .catch(error => {
        return response.status(500).send(error)
      })
    },
    async indexById(request , response){
        const id = request.params.id
        await database('branches')
        .where({id})
        .first()
        .then(data => response.json(data))
        .catch(error => response.status(500).send(error))
        
    },
    async update(request , response){
        const id = request.params.id
        const branche = request.body

        await database('branches')
        .where({id})
        .update(branche)
        .then(()=> response.status(204).send())
        .catch(error => response.status(500).send(error))
    },
    async remove(request , response){
        const id = request.params.id
        await database('branches')
        .where({id})
        .del()
        .then( ()=> response.status(204).send())
        .catch(error => response.status(500).send(error))
    }
}