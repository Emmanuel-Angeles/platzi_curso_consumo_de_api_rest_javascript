const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_WHBXXuKiUtMzQ2u89rV9F5xRBXMntcCPhFfplKFzbvdROiSpqtlbsIp0Zo3ZbcX4'
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites'
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_KEY = 'live_WHBXXuKiUtMzQ2u89rV9F5xRBXMntcCPhFfplKFzbvdROiSpqtlbsIp0Zo3ZbcX4'

const spanError = document.getElementById('error')

// fetch(API)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector("img")

//         img.src = data[0].url
//     })

// async function imageGenerate() {
//     const response = await fetch(API_URL)
//     const data = await response.json()
//     const img = document.querySelector("img")


//     console.log(data)
//     img.src = data[0].url

// imageGenerate()


async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json()
    console.log('Random')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error' + res.status
    } else {
        const img1 = document.getElementById("img1")
        const img2 = document.getElementById("img2")
        const btn1 = document.getElementById("btn1")
        const btn2 = document.getElementById("btn2")

        img1.src = data[0].url
        img2.src = data[1].url

        btn1.onclick = () => saveFavouriteMichi(data[0].id)
        btn2.onclick = () => saveFavouriteMichi(data[1].id)
    }
}

async function loadFavoritesMichis() {
    const res = await fetch(API_URL_FAVORITES, {
        headers: {
            'x-api-key': API_KEY,
        }
    })
    const data = await res.json()
    console.log("Favoritos")
    console.log(data)


    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error' + res.status + data.message
    } else {
        const section = document.getElementById('favoritesMichis')
        section.innerHTML = ""
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Michis favoritos')
        h2.appendChild(h2Text)
        section.appendChild(h2)
        data.forEach(michi => {
            const img = document.createElement('img')
            const article = document.createElement('article')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Sacar el michi de favoritos')

            img.src = michi.image.url
            img.width = 150
            btn.appendChild(btnText)
            btn.onclick = () => deleteFavouriteMichi(michi.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)

        })
    }
}

async function saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify({
            image_id: id
        })
    })

    const data = await res.json()

    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
        console.log("dsdsddddddddddd")
        spanError.innerHTML = 'Hubo un error' + res.status + data.message
    } else {
        console.log("Michi guardado en favoritos")
        loadFavoritesMichis()
    }
}


async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY,
        }
    })

    const data = await res.json()

    if (res.status !== 200) {
        console.log("dsdsddddddddddd")
        spanError.innerHTML = 'Hubo un error' + res.status + data.message
    } else {
        console.log("Michi eliminado en favoritos")
        loadFavoritesMichis()
    }
}

loadRandomMichis()
loadFavoritesMichis()