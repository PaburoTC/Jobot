# Jobot

En Jobot, alojado en [jobot.es](https://jobot.es), podrás observar todos los eventos (teatros, conciertos, danza, etc) subvencionados por la Comunidad de
Madrid disponibles en este instante. Además, podrás darte de alta en nuestra mailinglist customizable para ser el 
primero en enterarte de los eventos que te interesan.

Esta aplicación ha sido desarrollada usando [React](https://es.reactjs.org/). A continuación encontrarás una breve
documentación del código de la aplicación, divido en sus componentes. Todos los componentes de la aplicación son de tipo
funcional en vez de clase para favorecer el rendimiento.

## Register

El componente [register](https://jobot.es/register) como su propio nombre indica, es el componente encargado de dar de
alta a nuevos usuarios. Como toque extra, los campos del formulario se validan de forma dinámica a medida que el usuario
los va a rellenar. Queremos evitar el proceso iterativo de rellenar el formulario, intentar enviarlo, solucionar los
errores en los inputs y vuelta a empezar. Con la validación dinámica, solo pulsarás el botón de enviar una vez. 
La validación no solo se limita a comprobar los caracteres del campo en cuestión, sino que llega tan lejos como informar
al usuario en tiempo real si el nombre de usuario o correo escogido ya está dado de alta en Jobot.

Una vez completado el formulario, se almacena una cookie con el ID del usuario y la vista cambia al componente Main.

## Login

Login es responsable de verificar a usuarios ya existentes. Pese a compartir estética con Register, su comportamiento es mucho
más sencillo que el de este. Login comprueba que la contraseña (o mejor dicho, su hash) coincide con el correspondiente
al nombre de usuario o correo aportados. De ser idénticos, se guarda una cookie con el ID del usuario y la vista cambia 
al componente Main.

La funcionalidad de iniciar sesión con Google aún no está implementada, pero ¡estamos trabajando en ello para implementarla
lo antes posible!

## Main

Main es la página principal de Jobot, donde podrás seleccionar los días de la semana en los que te interesan que ocurran 
eventos, para que nosotros te avisemos de ellos. No solo eso, también verás un listado con todos los eventos disponibles
para que no te pierdas nada de nada.

## Event

Event es el componente que modela la vista de un evento. Carece de lógica pues realmente es pura vista.

## API

Para desarrollar Jobot he creado mi propia REST API en DJango, pero por motivos de seguridad (muchas claves quedan sueltas por el repo),
el código fuente del mismo aún no es público, pero pronto lo será. Dando gran importancia a la privacidad y al manejo de 
datos sensibles, los correos de los usuarios están cifrados bajo AES256 modo CBC y sus contraseñas están almacenadas tras
aplicarlas SHA512. Los correos han de ser cifrados y no hasheados pues deben ser recuperados para recibir correos de la
mailing list.

Quedo a vuestra disposición para solventar cualquier bug que hayaís encontrado o para escuchar vuestro feedback, el cuál
es más que bienvenido. ¡Disfrutad de Jobot!
