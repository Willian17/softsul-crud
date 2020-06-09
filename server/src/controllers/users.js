const database = require('../database/connection')
const validation = require('./validation')
const {authSecret} = require('../../.env')

const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}
module.exports = {
    async  index(request, response) {
        const getUsers = await database('users').select()
        return response.json(getUsers)
    },

    async create(request, response) {
        const { name, email, confirmPassword } = request.body
        let { password } = request.body

        try {
            validation.existsOrError(name, "Nome não informado!")
            validation.existsOrError(email, "Email não informado!")
            validation.existsOrError(password, "Senha não informada")
            validation.passwordSizeOrError(password, "A senha deve conter no mínimo 8 caracteres")
            validation.passwordSecureOrError(password, "Senha deve conter no mínimo 1 letra maiúscula, 1 minúscula e 1 número")
            validation.existsOrError(confirmPassword, "Confirmação de senha não informada")
            validation.equalsOrError(password, confirmPassword, "Confirmação de senha inválida")

            const emailDb = await database('users').where({ email })
            validation.notExistsOrError(emailDb, "Email já cadastrado")

        } catch (error) {
            return response.status(400).send(error)
        }

        password = encryptPassword(password)

        await database('users')
            .insert({
                name,
                email,
                password
            })
            .then(() => response.status(204).send())
            .catch(err => response.status(500).send(err))
    },
    async auth(request, response) {
        const {email , password} = request.body
        
        if(!email || !password){
            return response.status(400).send('informe email e senha')
        }

        const user = await database('users')
        .where({email})
        .first()

        if(!user){
            return response.status(400).send('Email inválido')
        }

        const isMatch = bcrypt.compareSync(password , user.password)

        if(!isMatch){
            return response.status(400).send('Senha inválida')
        }
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            iat: now,
            exp: now + ( 60 * 60 * 24 * 3)
        }
        return response.json({
            ...payload,
            token: jwt.encode(payload , authSecret)
        })
    },

    validateToken(request, response) {
        const userData = request.body || null
 
         try{
             if(userData){
                 const token = jwt.decode(userData.token , authSecret)
                 if(new Date( (token.exp * 1000) > new Date())){
                    return response.send(true)
                 }
             }
         }catch(msg){
             console.log(msg)
           return response.status(500).send(msg)
         }
 
        return response.send(false)
     },
    async delete(request, response) {
        const id = request.params.id
        await database('users')
            .where({ id })
            .del()
        return response.status(204).send()
    }

}