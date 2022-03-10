
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from '../styles/Carrito.module.css';

const Carrito = ({ carrito, actualizarCantidad, eliminarProductoCarrito }) => {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce( (total, producto) => total + (producto.precio * producto.cantidad), 0);
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <Layout pagina={'Carrito de Compras'} carrito={carrito}>
        <h1 className="heading">Carrito</h1>
        <main className={`${styles.contenido} contenedor`}>
            <div className={styles.carrito}>
              <h2>Artículos</h2>
                {carrito.length === 0 ? (
                    <div className={styles.vacio}>
                        <h2>No hay productos en el carrito</h2>
                        <p>Agrega productos al carrito para poder comprarlos</p>
                    </div>
                ) : (
                  carrito.map( producto => (
                    <div key={producto.id} className={styles.producto}>
                        <div>
                          <Image 
                            layout="responsive"
                            width={160}
                            height={360}
                            src={producto.imagen}
                            alt={producto.nombre}
                          />
                        </div>

                        <div>
                          <p className={styles.nombre}>{producto.nombre}</p>
                         
                          <div className={styles.cantidad}>
                            <p>Cantidad:</p>
                            <select 
                              value={producto.cantidad}
                              className={styles.select}
                              onChange={e => actualizarCantidad({
                                id: producto.id,
                                cantidad: parseInt(e.target.value)
                              })}
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                            </select>
                          </div>

                          <p className={styles.precio}><span>${producto.precio}</span></p>
                          <p className={styles.subtotal}>Subtotal: $ <span>{producto.precio * producto.cantidad}</span></p>
                        </div>
                          <button
                            type="button"
                            className={styles.eliminar}
                            onClick={() => eliminarProductoCarrito(producto.id)}
                          >x</button>
                    </div>
                ))
              )}
            </div>
            <div className={styles.resumen}>
                <h3>Resumen del pedido</h3>
                { total > 0 ? (
                  <>
                    <p>Total a pagar: ${total}</p>
                  </>
                ) : (
                  <p>No hay productos</p>
                )}
            </div>
        </main>    
    </Layout>
  )
}

export default Carrito;

