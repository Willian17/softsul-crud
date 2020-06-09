import Vue from 'vue'

export const userKey = '__user'
export const baseApiUrl = 'http://localhost:3333'
export function showError(e){
    if(e.response.data){
        Vue.toasted.global.msgError({msg: e.response.data})
    } else if(typeof e === 'string'){
        Vue.toasted.global.msgError({msg: e})
    } else{
        Vue.toasted.global.msgError()
    }
}

export default {baseApiUrl , userKey , showError}