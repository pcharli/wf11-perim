const {createApp, ref, onMounted, watch} = Vue
const app = Vue.createApp({
    name:"PWA",
    setup() {
        const products = ref([
            {
                label: "bière",
                echeance: "2024-01-17 10:00",
                notif: false
            },
            {
                label: "Sauce",
                echeance: "2024-01-17 12:30",
                notif: false
            }
        ])

        //gestion tabs active
        const the_statut = ref(false)
        const hidden = ref(null)
        const visibilityChange = ref(null)

        if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
            hidden.value = "hidden";
            visibilityChange.value = "visibilitychange";
        
        }

        const handleVisibilityChange = () => {
            //alert('change')
            if (document.hidden) {
                document.title = "pause"
                the_statut.value = false
                if (Notification.permission === "granted") {
                    console.log("Notification envoyée")
                    /*
                    myNotification = new Notification('Tu me quittes ?', {
                        body: "Envoyé par Pierre",
                        icon: "icons/android-icon-36x36.png",
                        vibrate: [200,100,200,100,200,100,200],
                        //onclick: "https://www.lesoir.be"
                    })
                    */
                }
            } else {
                document.title = "play"
                the_statut.value = true
                //console.log(document.unloaded) 
            }
         }
         //Notifications
         //NOTIFICATION
        const notifyMe = (produit=null) => {
            console.log(produit)
            let myNotification = null
            const options = {
                body: (produit) ? produit+" périmé" : "Envoyé par Pierre",
                icon: "icons/android-icon-36x36.png",
                vibrate: [200,100,200,100,200,100,200],
                url: "https://www.lesoir.be"
            }
            if( !("Notification" in window) ) {
                alert('Pas de notification dans ce navigateur')
            } else if (Notification.permission === "granted") {
                console.log("Notification possible")
                myNotification = new Notification('Attention !', options)
            } else { //demande de permission
                Notification.requestPermission().then( permission => {
                    if (permission === "granted") {
                        console.log("Notification possible")
                        myNotification = new Notification('Oh, Thank You !', options)
                    }
                })
            }
            /*
            myNotification.onclick = () => {
                alert('click')
                //openWindow(options.url)
            }
            */
        }

        if(Notification.permission !== 'granted') {
            if(confirm('Recevoir notifications ?')) {
                //notifyMe()
            }
        }

        onMounted(()=> {
            //console.log('mounted')
            document.addEventListener(visibilityChange.value, handleVisibilityChange, false);
            //notifyMe()
            setTimeout(()=> {
                setInterval( () => {
                products.value.map(product => {
                    product.date = new Date(product.echeance)
                    console.log(product.date)
                    if(product.date < new Date() && !product.notif) {
                        //console.log('dépassé')
                        product.notif = true
                        notifyMe(product.label)
                    }
                })
            },2000)
            },5000)
            
        })


        watch( () => the_statut.value, //getter
                (newVal, oldVal) => { 
                    //alert("new " + newVal)
                    //console.log("old " + oldVal)
         })


        return {products, the_statut}
    }
})
app.config.globalProperties.$filters = {
    //formater une date dans la langue locale
    dateFr(value) {
      const date = new Date(value).toLocaleDateString()
      const time = new Date(value).toLocaleTimeString()
      return date + ' ' + time
    }
  }
app.mount("#app")

