import Swal from "sweetalert2";
import { useState } from "react";

const Formulario = ({ addTodo }) => {
    const initialState = {
        nombre: "",
        descripcion: "",
        estado: "",
        prioridad: false,
    };

    const [todo, setTodo] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.nombre.trim()) {
            e.target[0].focus();
            return Swal.fire({
                title: "Error!",
                text: "Nombre ogligatorio",
                icon: "error",
            });
        }
        if (!todo.descripcion.trim()) {
            e.target[1].focus();
            return Swal.fire({
                title: "Error!",
                text: "Descripción ogligatoria",
                icon: "error",
            });
        }

        // agregar todo
        addTodo({
            nombre: todo.nombre,
            descripcion: todo.descripcion,
            estado:todo.estado,
            prioridad: todo.prioridad,
            id: Date.now(),
        });
        

        Swal.fire({
            title: "Éxito",
            text: "¡Todo agregado!",
            icon: "success",
        });

        // limpiar form
        setTodo(initialState);
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setTodo((old) => ({
            ...old,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <>
            <h3>Formulario</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="nombre"
                    name="nombre"
                    value={todo.nombre}
                    onChange={handleChange}
                    className="form-control mb-2"
                />
                <textarea
                    type="text"
                    placeholder="ingrese descripción"
                    name="descripcion"
                    value={todo.descripcion}
                    onChange={handleChange}
                    className="form-control mb-2"
                />
                <select
                    name="estado"
                    value={todo.estado}
                    onChange={handleChange}
                    className="form-control mb-2"
                >
                    <option value="pendiente">pendiente</option>
                    <option value="finalizado">finalizado</option>
                
                </select>

                <div className="form-check">
                    <input
                        type="checkbox"
                        name="prioridad"
                        id="idCheckbox"
                        checked={todo.prioridad}
                        onChange={handleChange}
                        className="form-check-input mb-2"
                    />
                    <label htmlFor="idCheckbox" className="form-check-label">
                        Dar prioridad
                    </label>
                </div>
                <button type="submit" className="btn btn-success">
                    Agregar
                </button>
            </form>
        </>
    );
};

export default Formulario;
