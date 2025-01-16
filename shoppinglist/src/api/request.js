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
    response.records.forEach(element => {if (element.fields.password==password && element.fields.email==email) {
        
    }
        
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
                    "Account": ["recA4IYQB6gNaRY3V"],
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

export async function fetchItem (id) {
    const response = await request('tblk9bzkCovbKEKYK/' + id)
    console.log(response);
    return response
}