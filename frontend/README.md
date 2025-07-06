# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Lo que se encuentra en la carpeta son todos los archivos, directorios y componentes necsarios para el desarrollo
del Frontend de la aplicación de Rodi, hecho mediante la biblioteca de React.
Algunas de las funcionalidades realizadas son: - Inicio de sesión: en él se podrá ingresar a un perfil mediante un mail y contraseña, registrarse por primera vez,
ingresar el olvido de la contraseña y una opcion de configuracion. - Inicio: en esta pantalla se podran ver los contenidos principales en cuanto a la interacción de la plataforma. Por
ejemplo en caso de acceder mediante un perfil de tipo "Empleador" se mostrarán distintos perfiles de tipo "Postulante" con su respectiva descripcion, ademas de poder realizar una búsqueda filtrada por puesto de trabajo (es decir por habilidades) y publicar ofertas de trabajo. Por el otro lado, aquellos que ingresen mediante un perfil de tipo "Postulante" podran observar diversas ofertas de trabajo a las cuales se pueden postular completando su
respectivo formulario, además de poder buscar ofertas filtradas por el puesto requerido por el "Empleador" que la realizó. También podran observar un listado de "Empleadores" destacados junto con una descripción de su historia y un formulario para poder postularse directamente a ella - Perfil: en él, tanto "Empleadores" como "Postulantes" podran ver su información cargada (foto de perfil, descripcion, etc) junto a la opcion de poder compartir su propio perfil por alguna plataforma externa a RoDi. Un "Postulante" podrá agregar proyectos, visualizarlos y eliminarlos si eso quisiera, además de sugerencias de perfiles a un lado.
