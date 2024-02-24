import Testimonio from './Testimonio';

//EN ESTE COMPONENTE TENEMOS UN ARRAY DE OBJETOS QUE CONTIENE LAS PROPS QUE SE VAN A PASAR AL COMPONENTE TESTIMONIOS PARA LUEGO PODER HACER UN MAP CON EL MISMO Y QUE CADA ITERACION DEVUELVA UN TESTIMONIO
export default function Nosotros() {

    const testimonios = [
        {
            nombre: 'Eddie Areco',
            imagenNombre: 'testimonio-eddie',
            testimonio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus recusandae impedit odit deserunt molestiae suscipit, expedita ipsam. Consectetur in consequatur qui alias! Eveniet veritatis vero quam quidem quis accusantium. Iure!',
        },
        {
            nombre: 'Felipe Luis Gonzalez',
            imagenNombre: 'testimonio-felipe',
            testimonio: '¡Esta página web es genial! Me encanta la amplia variedad de bebidas que ofrecen, tanto alcohólicas como no alcohólicas. Además, la interfaz es muy fácil de usar y el proceso de compra es rápido y sencillo. Definitivamente la recomendaría a mis amigos.'
        },
        {
            nombre: 'Marcos Sosa',
            imagenNombre: 'testimonio-marcos',
            testimonio: 'Esta página web es una excelente opción para comprar bebidas. Me gusta que no solo se centren en las opciones alcohólicas, sino que también ofrezcan una variedad de alternativas no alcohólicas para aquellos que no beben o quieren opciones más saludables. Además, el servicio de entrega es rápido y confiable.',
        },
        {
            nombre: 'Luciana Perez',
            imagenNombre: 'testimonio-luciana',
            testimonio: 'Estoy impresionada con la selección de bebidas que tienen disponible en esta página web. Es perfecta para cuando organizo reuniones en casa, ya que puedo encontrar todo lo que necesito en un solo lugar. Además, el diseño del sitio es moderno y atractivo, lo que hace que la experiencia de compra sea aún más placentera!',
        },
        {
            nombre: 'Ayelen Casusa',
            imagenNombre: 'testimonio-ayelen',
            testimonio: '¡Qué descubrimiento esta página web! Me encanta que tengan una sección dedicada a bebidas no alcohólicas, lo cual es perfecto para mí ya que prefiero opciones sin alcohol. La navegación por el sitio es fluida y la información sobre cada producto es muy útil. Sin duda volveré a comprar aquí.',
        }
    ]

    return (

        <>

            <h1 className="text-white text-4xl m-3">Experiencias de nuestros usuarios</h1>

            {testimonios.map(testimonio => (
                <Testimonio
                    nombre={testimonio.nombre}
                    imagenNombre={testimonio.imagenNombre}
                    testimonio={testimonio.testimonio}
                />
            )
            )}


        </>

    )

}
