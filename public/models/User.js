class User {
    constructor(name, gender, birth, country, email, password, photo, admin) {
        this.id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id() {
        return this._id;
    }
    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }


    set register(value) {
        this._register = value;
    }

    set name(value) {
        this._name = value;
    }

    set gender(value) {
        this._gender = value;
    }

    set birth(value) {
        this._birth = value;
    }

    set country(value) {
        this._country = value;
    }

    set email(value) {
        this._email = value;
    }

    set password(value) {
        this._password = value;
    }

    set photo(value) {
        this._photo = value;
    }

    set admin(value) {
        this._admin = value;
    }



    loadFromJSON(json) {

        for (let name in json) {

            switch (name) {

                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                   if(name.substring(0,1) === "_") this[name] = json[name];
            }

        }

    }

    static getUsersStorage() {

       return Fetch.get('users');
    
    }


    toJSON() {
        let json = {};
        Object.keys(this).forEach(key => {

            if (this[key] !== undefined) json[key] = this[key];

        })

        return json;
    }


    save() {

        return new Promise((resolve, reject) => {

            let promise;
            
            if (this.id) {
            //toJSON() converte a json in stringfy json, I am using this method because some cases normal json becom Object[object]
             promise = Fetch.put(`users/${this.id}`, this.toJSON())
             

            } else {

            promise = Fetch.post(`users`, this.toJSON())
          
            }
          
            promise.then(data=>{
                //load from json coverte a json from database in to a user object
                this.loadFromJSON(data);

                resolve(this);

            }).catch(e=>{
             
                reject(e);

            })
        })
    }



    remove() {
      return Fetch.delete(`users/${this.id}`)
    }
}