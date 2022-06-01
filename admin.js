const personal = document.querySelector('.personal')
let lista = ""
const tareas = document.querySelector('.tareas')
let lista2 = ""

fetch('http://localhost:8000/api/tareas')
.then(res => res.json())
.then(data => {
    for(let i = 0; i < data.length; i++) {
        lista2+= `<ul>    <li>${data[i].tarea}</li>
                          <li>${data[i].fecha_inicio}</li>
                          <li>${data[i].fecha_final}</li>
                          <li>${data[i].hora_inicio}</li>
                          <li>${data[i].hora_final}</li>
                          <li>${data[i].responsable}</li></ul>`
    }
    tareas.innerHTML = lista2
})


fetch('http://localhost:8000/api')
.then(res => res.json())
.then(result => {
    imprimir(result)
    getUser(result)
})

const imprimir = (result)=>{
    for(let i = 0; i < result.length; i++) {
        lista+= `<ul> <li>${result[i].nombre}</li>
                          <li class="user">${result[i].nombre_user}</li>
                          <li>${result[i].puesto}</li>
                          <a class="btn-d" href="#"><i class="fa-solid fa-trash-can"></i></a></ul>`
    }
    personal.innerHTML = lista
    let btns = personal.querySelectorAll('.btn-d')
    btns.forEach(d => {
        d.addEventListener('click', btnBorrar)
    });
}

let users= ""
let select = document.createElement('select')
const getUser = (result) =>{
    for(let i = 0; i < result.length; i++) {
        users+= `<option>${result[i].nombre_user}</option>`
    }
    
}


const btnBorrar = (e)=>{
    let user = e.target.parentElement.parentElement.querySelector('.user').innerText
    
    if(confirm('¿Esta seguro que quiere eliminar a '+ user)==true){
        e.target.parentElement.parentElement.remove()
        console.log(e.target.parentElement.parentElement)
        fetch(`http://localhost:8000/api/${user}`,{
            method:'DELETE',
            headers:{
                'content-type': 'application/json' 
            },
        })
        .then((res)=>{
            if (res.ok){
                console.log('borrado')
            }
            else{
                console.log('no borrado')
            }
        })
    }
    
}

//boton agregar datos

const modal = document.querySelector('.modal')
const btn_add = document.querySelector('.btn-add').addEventListener('click',()=>{
    modal.style.visibility = 'visible'
})

function cerrar(){
    modal.style.visibility = 'hidden'
}


const btn_env = document.querySelector('.btn_env').addEventListener('click',()=>{
    let nombre = document.querySelector('.nombre').value;
    let password = document.querySelector('.password').value;
    let user = document.querySelector('.usuario').value;
    let  roll = document.querySelector('.roll').value;
    let  puesto = document.querySelector('.puesto').value;

    if(roll == 'Administrador') roll = 'admin'


    fetch('http://localhost:8000/api',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "nombre_user": `${user}`,
            "pass": `${password}`,
            "nombre": `${nombre}`,
            "roll": `${roll}`,
            "puesto": `${puesto}`,
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    location.reload()
})

//boton asignar tarea
const form_tarea = document.querySelector('.form_tarea')


const modal2 = document.querySelector('.modal2')
const btn_tarea = document.querySelector('.btn-tarea').addEventListener('click',()=>{
    modal2.style.visibility = 'visible'
    select.innerHTML = users
    select.classList.add('users')
    form_tarea.appendChild(select)
})

const btn_crear = document.querySelector('.crear').addEventListener('click',()=>{
    let nom_tarea = document.querySelector('.tarea').value
    let fecha_inicio = document.querySelector('.inicio').value
    let fecha_final = document.querySelector('.final').value
    let users = document.querySelector('.users').value
    let hora_inicio =document.querySelector('.hora').value +":" + document.querySelector('.minuto').value
    let hora_final =document.querySelector('.hora2').value +":" + document.querySelector('.minuto2').value

    fetch('http://localhost:8000/api/tarea',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "tarea": `${nom_tarea}`,
            "fecha_inicio": `${fecha_inicio}`,
            "fecha_final": `${fecha_final}`,
            "hora_inicio": `${hora_inicio}`,
            "hora_final": `${hora_final}`,
            "responsable": `${users}`
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    location.reload()
})

function cerrarTarea(){
    modal2.style.visibility = 'hidden'
}

const salir = document.querySelector('.btn-cerrar').addEventListener('click', ()=>{
    location.href = "http://localhost:8000"
})