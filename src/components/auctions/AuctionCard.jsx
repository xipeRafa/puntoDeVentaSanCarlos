import { useContext } from 'react';
import { FireStoreDataContext } from '../../context/FireStoreDataContext';
  import './auctionCard.css'








export const AuctionCard = ({ items, UpdateById }) => {

  const formateador = new Intl.DateTimeFormat("es-MX", { dateStyle: 'long', timeStyle: 'short' });
   
  const milisegundosComoFecha = (milisegundos) => {
      return formateador.format(new Date(milisegundos));
  }; 



  const { deleteById, setToggle, toggle, toggleOrders, setToggleOrders, UpdateByIdInventario } = useContext(FireStoreDataContext);





  const handleToggle =(id, el)=>{

        const obj = el

      

        obj.takenByCustomer = true

        UpdateById(id, obj)

        setToggle(!toggle)

<<<<<<< HEAD
         //=====//================//
=======
        //=====//================//
>>>>>>> ce836bdbff490378be8a44a1a1cbb505b5600cef

        obj.items.map((el,i)=>{

            if(el?.stockHermosillo===undefined){
<<<<<<< HEAD
                el.stockSanCarlos = el?.stockSanCarlos - el.quantity
                UpdateByIdInventario(el.id, el)
                console.log('sancarlos update')
            }else{
                el.stockHermosillo = el?.stockHermosillo - el.quantity
                UpdateByIdInventario(el.id, el)
                console.log('hermosillo update ')
            }

        })
=======
                obj.items[i].stockSanCarlos = el?.stockSanCarlos - el.quantity
                UpdateById(id, obj)
            }else{
                obj.items[i].stockHermosillo = el?.stockHermosillo - el.quantity
                UpdateById(id, obj)
            }

        })


>>>>>>> ce836bdbff490378be8a44a1a1cbb505b5600cef
  }

  const handleToggleOrders =()=>{
        setToggleOrders(!toggleOrders)
        setToggle(!toggle)
  }



     return (
        <div className='card p-2'>
         <h3 className='text-white'>ORDENES DE SAN CARLOS</h3>
        <button className='btn btn-info m-2' onClick={handleToggleOrders}> {toggleOrders ? 'Entregados' : 'Por Entregar'} </button>
       
           
            {items.map((el, i) => (

                    <div key={i} className="item">

                        <hr />

                        <div className="texto">
                            <h3>Comprador: {el.buyer.name}</h3>

                            {el.items.map((el, i) => (
                                <b key={i}>Producto ID: {el.id} <br /><br /></b>
                            ))}

                            <p>Correo: {el.buyer.email}</p>
                            <p>Celular: {el.buyer.phone}</p>
                            <p>Ciudad: {el.city}</p>
                            <p>Clave de Compra: {el.id}</p>

                            <p>
                                Fecha:{" "}
                                {new Date(el.date).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            <p>Total: {el.total}</p>
                            <b>Status: {el.takenByCustomer ? 'Entregado' : 'Pendiente'}</b>

                        </div>

                        <button className='btn btn-outline-primary mt-2'  onClick={()=>handleToggle(el.id, el)}> 
                            {el.takenByCustomer ? 'Entregado' : 'Marcar como entregada'}
                        </button>

                        <hr />

                    </div>

                ))}
        </div>
    );
};

















