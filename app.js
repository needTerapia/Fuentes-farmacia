let dato
fetch('http://localhost:8000/datos')
.then(res => res.json())
.then(result => {
    dato = result
    
})

let nombre=[]
let contra=[]
var respon
const btn = document.getElementById('btn').addEventListener('click', () => {
    let user = document.getElementById('text').value 
    let password = document.getElementById('password').value 
    
    for(let i = 0; i < dato.length; i++) {
       if(dato[i].nombre_user == user && dato[i].pass == password) {
           if(dato[i].roll == 'admin'){
               console.log('eres admin')
               location.href = "./admin.html"
           }else{
            location.href = "./empleados.html"
            respon = dato[i].nombre_user
           }
       }
       
    }

})

