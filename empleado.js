const ventana = document.querySelector('.ventana')
let id
let tarea
let fecha_i
let fecha_f
let hora_i
let hora_f
let user
fetch('http://localhost:8000/responsable')
.then(res => res.json())
.then(result => {
    if(result.length > 0) {
        tarea = result[0].tarea
    fecha_i = result[0].fecha_inicio
    fecha_f = result[0].fecha_final
    hora_i = result[0].hora_inicio
    hora_f = result[0].hora_final
    user = result[0].responsable
    id = result[0].id
        
    let p = document.createElement('p')
    p.innerHTML = `Hola ${user}, en esta fecha: ${fecha_i} en la hora ${hora_i} se te asigno la siguente tarea: ${tarea} que
    deberas cumplir hasta la fecha limite ${fecha_f} a las ${hora_f} suerte.`

    ventana.appendChild(p)
    }
    else{
        ventana.innerHTML = `<h1>No tienes tareas</h1>
                    <input type="button" value="Salir" class="btn_salir">`
                    ventana.querySelector(".btn_salir").addEventListener("click",salir)
    }

})

const btn_fin = document.querySelector('.btn_fin').addEventListener('click', () =>{
    fetch(`http://localhost:8000/fin/${id}`,{
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
        ventana.innerHTML = `<h1>Tarea finalizada!! ✔️</h1>
                            <input type="button" value="Salir" class="btn_salir">`
                    ventana.querySelector(".btn_salir").addEventListener("click",salir)
        alert('Tarea eliminada')
})

const salir = ()=>{
    location.href = "http://localhost:8000"
}