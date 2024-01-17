const version = 1.01

const cacheName = "demo-v1"

const files2Cache = [
    '/',
    'sw.js',
    'index.html',
    'main.js',
    'install.js',
    'style.css',
    "manifest.json",
    "register-sw.js",
    'icons/favicon.ico',
    'icons/android-icon-36x36.png',
    'icons/android-icon-192x192.png',
    'icons/android-icon-96x96.png',
    'icons/android-icon-512x512.png',
    'vue.js'
]

const files2Cache2 = [
    "index.html",
    "contact.html"
]

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(cacheName)
    await cache.addAll(resources)
}

self.addEventListener('install', e => {
    console.log('Install SW version ' + version)
    e.waitUntil(
        addResourcesToCache(files2Cache)
    )
    return self.skipWaiting()
})

self.addEventListener('activate', e => {
    console.log('Activate SW version ' + version)
    return self.clients.claim()
})

//Priorité au cache
const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request)
    return responseFromCache
}

//Priorité au réseau
const networkFirst = async (request) => {
    const responseFromNetwork = await fetch(request)
    .catch( ()=> {
        return caches.match(request)
    })
    return responseFromNetwork
}



//simple fetch general
self.addEventListener('fetch', e => {
    const requestUrl = new URL(
        e.request.url
    )
    if(!requestUrl.href.includes("https://api")) {
        e.respondWith(networkFirst(requestUrl))
    }
    else {
        e.respondWith(networkFirst(requestUrl))
    }
})