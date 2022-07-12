function createProduct(name, type, url = '', price = 0, description = '', amount = 1)
{
    return {name: name, url: url, amount: amount, price: price, description: description};
}

/* Añadir más productos */

export default [
    /* Alexander añadió estos elementos */
    createProduct('Bugatti Divo', 'car', 'assets/img/cars/bugatti-divo.jpg', 28030.0, `Es una variante especial del Chiron equipada con un chasis de mayor rigidez y un peso total reducido en 35 kilogramos. La aerodinámica también fue mejorada respecto de su hermano. Mantiene el motor naftero 8.0 de 16 cilindros en W con cuatro turbos que eroga 1.500 CV. Gracias a las mejoras mencionadas logró ganarle al Chiron “estándar” por 8,0 segundos en una prueba en el circuito de Nardò.`),
    createProduct('Pininfarina Battista', 'car', 'assets/img/cars/pininfarina-battista.jpg', 100001, `El número dos bien podría ser el número uno: no hay datos precisos de potencia, aunque sí se sabe que está por encima de los 1.900 CV. Incluso, para alejar especulaciones, el Battista utiliza los mismos motores eléctricos que el Rimac C_Two. En este caso, sin embargo, la aceleración de 0 a 100 km/h es de 2,0 segundos y la autonomía de 400 kilómetros.`),
    createProduct('Rimac C_Two', 'car', 'assets/img/cars/rimac c_two.jpg', 200001, `Por el momento, es el auto más potente construido hasta ahora. Los cuatro motores eléctricos que le dan vida generan un par que también es increíble: 234,5 kgm. Gracias a esos valores acelera de 0 a 100 km/h en 1,85 segundos. No hay datos de velocidad máxima, pero sí de autonomía: 550 kilómetros según el ciclo de homologación europea.`),
    createProduct('SSC Tuatara', 'car', 'assets/img/cars/ssc-tuatara.jpg', 200001, `Este hypercar estadounidense le debe su nombre aun lagarto de Nueva Zelandia. Utiliza un propulsor V8 5.9 biturbo, cuya potencia varía notablemente en función del carburante seleccionado: si usa nafta de calidad superior a los 98 octanos, puede alcanzar los 1.750 CV; si es menor, desarrolla 1.350 CV.`),
];