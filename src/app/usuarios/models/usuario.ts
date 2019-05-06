import { TipoUsuario } from './tipo-usuario';
import { TipoCliente } from './tipo-cliente';

export class Usuario {

	/**
	 * Constructor de la clase.
	 * @param id number
	 * @param nombre string
	 * @param apellido_paterno string
	 * @param apellido_materno string
	 * @param correo string
	 * @param estado boolean
	 * @param id_tipo_usuario number
	 * @param id_tipo_cliente number
	 */
    constructor(
		public id?: number,
		public nombre?: string,
		public apellido_paterno?: string,
		public apellido_materno?: string,
		public correo?: string,
		public estado?: boolean,
		public id_tipo_usuario?: number,
		public id_tipo_cliente?: number,
		public fkid_tipousuario?: TipoUsuario,
		public fkid_tipocliente?: TipoCliente
	) { }
}
