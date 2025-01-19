import { useAuth } from './auth'

const { token, setToken } = useAuth()

const AIRTABLE_API_BASE = 'https://api.airtable.com/v0/appZwk15FqN5pmjkM/';
const AIRTABLE_API_KEY = 'patcovSIWtWEms7J6.5bed5d3647fba273a26203140e9c6532e3ed046062c11bde42c50fca04b6701e'; // Sicherstellen, dass diese sicher bleibt!

// Generische Request-Funktion.
async function request (url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }

    if (AIRTABLE_API_KEY) {
        headers['Authorization'] = 'Bearer ' + AIRTABLE_API_KEY
    }

    const response = await fetch(AIRTABLE_API_BASE + url, { headers, ...options })

    if (response.ok) {
        return response.json()
    } else if (response.status === 422) {
        const data = await response.json()

        throw new ValidationError('validation failed', data.errors)
    } else {
        throw new Error(`Server error: ${await response.text()}`)
    }
}

export async function loginUser (email, password) {
    const response = await request('tblr15gBUGFQkzC2A')
    response.records.forEach(element => {
        if (element.fields.Password==password && element.fields.Email==email) {
        console.log(response.token, "pain")
        setToken(element.id)

        return response.token
    }
        //throw new Error('Login failed due to an unknown error')
    });
}


class ValidationError {
    message
    errors

    constructor (message, errors) {
        this.message = message
        this.errors = errors
    }
}


export async function fetchLists () {
    const response = await request('tbldSyH9OqgWNZigU')
    console.log(response);
    return response
}

export async function fetchList (id) {
    const response = await request('tbldSyH9OqgWNZigU/' + id)
    console.log(response);
    return response
}

export async function addList (name) {
    const response = await request('tbldSyH9OqgWNZigU', {
        method:"POST",
        body: JSON.stringify( {
            "records":[{
            "fields": {
                    "Account": [token.value],
                    "Name": name
                }}
            ]
            } )
    })
    console.log(response);
    return response
}

export async function deleteList (id) {
    const response = await request('tbldSyH9OqgWNZigU/'+id, {
        method:"DELETE"
    })
    console.log(response);
    return response
}

export async function fetchItems () {
    const response = await request('tblk9bzkCovbKEKYK')
    console.log(response);
    return response
}

export async function fetchItem (id) {
    const response = await request('tblk9bzkCovbKEKYK/' + id)
    console.log(response);
    return response
}

//look at later
export async function addItem (name,price) {
    const response = await request('tblk9bzkCovbKEKYK', {
        method:"POST",
        body: JSON.stringify( {
            "records":[{
            "fields": {
                    "Stores": ["recYJeO3J0vTFRCUL"],
                    "Name": name,
                    "Price":price
                }}
            ]
            } )
    })
    console.log(response);
    return response
}

export async function deleteItem (id) {
    const response = await request('tblIGaNlRrdw7bAXF/'+id, {
        method:"DELETE"
    })
    console.log(response);
    return response
}

export async function fetchStores () {
    const response = await request('tbl84xBjjyVqbrmF3')
    console.log(response);
    return response
}

export async function fetchItInLiRecords () {
    const response = await request('tblIGaNlRrdw7bAXF')
    console.log(response);
    return response
}

export async function addItemToList (list,item,amount) {
    const response = await request('tblIGaNlRrdw7bAXF', {
        method:"POST",
        body: JSON.stringify( {
            "records":[{
            "fields": {
                    "Lists": [list],
                    "Items": [item],
                    "Amount":amount
                }}
            ]
            } )
    })
    console.log(response);
    return response
}