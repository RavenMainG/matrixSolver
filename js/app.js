const menu = document.querySelector('.menu')
const boton = document.querySelector('.menu-boton')
const fila = document.querySelector('.clonar')

const listaFilas = document.querySelector('.matriz')

const botonAgregarFila = document.querySelector('.agregar')
const botonQuitarFila = document.querySelector('.quitar')
const botonBorrar = document.querySelector('.borrar')
const botonCalcular = document.querySelector('.calcular')

let contadorFilas = 2


console.log(contadorFilas)

boton.addEventListener('click', () =>{
    menu.classList.toggle('menu-activo')
    console.log('presion');
})

botonQuitarFila.addEventListener('click', () => {
    if(contadorFilas > 2){
        let eliminar = listaFilas.lastChild
        listaFilas.removeChild(eliminar)
        contadorFilas --
        console.log(contadorFilas)
    }
})

botonAgregarFila.addEventListener('click', () => {
    if(contadorFilas <= 4) {
        let filaClonada = fila.cloneNode(true)
        filaClonada.setAttribute("id", `${contadorFilas + 1}`)
        console.log(filaClonada)
        listaFilas.appendChild(filaClonada).classList.remove('clonar')
        contadorFilas ++
        console.log(contadorFilas)
    }
})

botonBorrar.addEventListener('click', () => {
    let eliminar
    let iterador = contadorFilas
    let inputs
    for (let i = iterador; i > 2; i--){
        eliminar = listaFilas.lastChild
        listaFilas.removeChild(eliminar)
        contadorFilas --
    }
    inputs = document.querySelectorAll('input')
    inputs[0].value = ''
    inputs[1].value = ''
})

botonCalcular.addEventListener('click', () => {
    let inputs = document.querySelectorAll('input')
    const arrSistema = []
    for(let i = 0; i < contadorFilas; i++) {
        arrSistema.push(inputs[i].value)
    }

    let str
    let matches
    let arrMatriz = []
    for(let i = 0; i < contadorFilas; i++) {
        console.log(i)
        str = arrSistema[i]
        console.log(str)
        matches = str.match(/[\+\-]?\d+/g)
        console.log(matches)
        for(let i = 0; i < matches.length; i++){
            matches[i] = Number(matches[i])
        }
        arrMatriz.push(matches)

    }
    console.log(arrMatriz)
    let solucion = Object.values(metodoGauss(arrMatriz))
    let solString = solucion.toString()
    
    let label = document.querySelector('.label')
    label.innerHTML = `(${solString})`
})
// 1x+2y-1z=-1
// 2x-1y+1z=9
// 1x+3y+3z=6



const modFila = (fila, pivote, sesgo) => {
    let newFila = []
    for(let i = 0; i < pivote.length; i++) {
        newFila.push((sesgo * pivote[i]) + fila[i])
    }
    return newFila
}

const metodoGauss = (array) => {
    // Declaracion de variables
    let numVariables = array[0].length - 1
    const pivote = array[0]
    let camFila1, camFila2, camFila3, camFila4
    let x, y, z, a, b
    const newArr = []

    switch (numVariables) {
        case 2:
            console.table(array)
            camFila1 = modFila(array[1], pivote, (array[1][0] / -array[0][0]))
            y = (camFila1[2] / camFila1[1])
            x = (pivote[2] + ( -pivote[1] * y)) / pivote[0]
            console.table([pivote, camFila1])
            console.log({x, y})
            return {x, y}
            break
        case 3:
            camFila1 = modFila(array[1], pivote, (array[1][0] / -array[0][0]))
            camFila2 = modFila(array[2], pivote, (array[2][0] / -array[0][0]))
            camFila2 = modFila(camFila2, camFila1, (camFila2[1] / -camFila1[1]))
            console.log([array[0], camFila1, camFila2])


            z = (camFila2[3] / camFila2[2])
            y = ((camFila1[3] + (-camFila1[2] * z)) / camFila1[1])
            x = (pivote[3] + (-pivote[2] * z) + (-pivote[1] * y)) / pivote[0]
            // console.log(x.toPrecision(3))
            // console.log(y.toPrecision(3))
            // console.log(z.toPrecision(3))
            return {x, y, z}
            break;
        case 4:
            console.table(array)
            camFila1 = modFila(array[1], pivote, (array[1][0] / -array[0][0]))
            camFila2 = modFila(array[2], pivote, (array[2][0] / -array[0][0]))
            camFila3 = modFila(array[3], pivote, (array[3][0] / -array[0][0]))
            camFila2 = modFila(camFila2, camFila1, (camFila2[1] / -camFila1[1]))
            camFila3 = modFila(camFila3, camFila1, (camFila3[1] / -camFila1[1]))
            camFila3 = modFila(camFila3, camFila2, (camFila3[2] / -camFila2[2]))
            newArr.push(pivote, camFila1, camFila2, camFila3)
            console.table(newArr)
            a = (camFila3[4] / camFila3[3])
            z = (camFila2[4] + ( -camFila2[3] * a)) / camFila2[2]
            y = (camFila1[4] + ( -camFila1[3] * a) + ( -camFila1[2] * z)) / camFila1[1]
            x = (pivote[4] + ( -pivote[3] * a) + ( -pivote[2] * z) + ( -pivote[1] * y)) / pivote[0]
            // console.log({a, z, y, x})
            return {x, y, z, a}
            break;
        case 5:
            console.table(array)
            camFila1 = modFila(array[1], pivote, (array[1][0] / -array[0][0]))
            camFila2 = modFila(array[2], pivote, (array[2][0] / -array[0][0]))
            camFila3 = modFila(array[3], pivote, (array[3][0] / -array[0][0]))
            camFila4 = modFila(array[4], pivote, (array[4][0] / -array[0][0]))
            camFila2 = modFila(camFila2, camFila1, (camFila2[1] / -camFila1[1]))
            camFila3 = modFila(camFila3, camFila1, (camFila3[1] / -camFila1[1]))
            camFila4 = modFila(camFila4, camFila1, (camFila4[1] / -camFila1[1]))
            camFila3 = modFila(camFila3, camFila2, (camFila3[2] / -camFila2[2]))
            camFila4 = modFila(camFila4, camFila2, (camFila4[2] / -camFila2[2]))
            camFila4 = modFila(camFila4, camFila3, (camFila4[3] / -camFila3[3]))
            
            b = (camFila4[5] / camFila4[4])
            a = (camFila3[5] + ( -camFila3[4] * b)) / camFila3[3]
            z = (camFila2[5] + ( -camFila2[4] * b) + ( -camFila2[3] * a)) / camFila2[2]
            y = (camFila1[5] + ( -camFila1[4] * b) + ( -camFila1[3] * a) + ( -camFila1[2])) / camFila1[1]
            x = (pivote[5] + ( -pivote[4] * b) + ( -pivote[3] * a) + ( -pivote[2]) + ( -pivote[1])) / pivote[0]
            console.table([pivote ,camFila1, camFila2, camFila3, camFila4])
            console.log(x)
            return {x, y, z, a, b}
            break
        default:
            break;
    }
    
    
}
