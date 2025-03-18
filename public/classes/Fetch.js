const { response } = require("express")

class Fetch {


    static get(url, params = {}) {
        return Fetch.request('GET', url, params)
    }

    static delete(url, params = {}) {
        return Fetch.request('DELETE', url, params)
    }

    static post(url, params = {}) {
        return Fetch.request('POST', url, params)
    }

    static put(url, params = {}) {
        debugger
        return Fetch.request('PUT', url, params)
    }
    static request(method, url, params = {}) {


        return new Promise((resolve, reject) => {
            
            let request;
            //GET METHOD CANNOT RECEIVE BODY
            switch(method.toLowerCase()){
                case 'get' :
                    request = url;
                break;
                default: 
                request =  new Request(url,{
                    method, //when the key and value para has the same name, you can just need to put the one time the name
                    body: JSON.stringify(params), //params comes like a object json, here we need to converto to string json
                    headers: new Headers({
                        'Content-Type' : 'application/json'
                    })
                })
    
            }

            fetch(request).then(response => {
                response.json().then(json => {
                    resolve(json)
                }).catch(e => {
                    {
                        reject(e);
                    }
                })
            }).catch(e => {
                {
                    reject(e);
                }
            })

        })

    }

}