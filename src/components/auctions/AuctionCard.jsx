import { useContext, useState } from 'react';
import { FireStoreDataContext } from '../../context/FireStoreDataContext';
  import './auctionCard.css'








export const AuctionCard = ({ items, UpdateById, UpdateByIdInventario }) => {



    const formateador = new Intl.DateTimeFormat("es-MX", { dateStyle: 'long', timeStyle: 'short' });
   
    const milisegundosComoFecha = (milisegundos) => {
        return formateador.format(new Date(milisegundos));
    }; 



    const { deleteById, setToggle, toggle, toggleOrders, setToggleOrders, itemsInventario } = useContext(FireStoreDataContext);

    const[noteState, setNoteState]=useState('')



    let currentDate = new Date();

    let dueDate = currentDate.setHours(
        currentDate.getHours() /* + itemDuration.current.value */,
    )


    const handleToggle =(id, el)=>{

        if(noteState.length <= 0){
                alert('Falta el Numero Nota de Venta')
                return
        }

        const obj = el

        obj.takenByCustomer = true
        el.historiSale = dueDate
        obj.notaDeVenta = noteState

        UpdateById(id, obj)

        setToggle(!toggle)


        //=====//================ Inventario  // 

        obj.items.map((el,i)=>{

               const a = itemsInventario.filter(ele => ele.id === el.id )[i]


                if (a.historiSales === undefined) {
                    console.log('undefined')

                        a.historiSales = [];
                        a.historiSales.push(dueDate);

                        a.notaDeVenta = []
                        a.notaDeVenta.push(noteState)

                        a.stockSanCarlos = a?.stockSanCarlos - el.quantity

                        UpdateByIdInventario(a.id, a)

                } else {
console.log('else')
                        a.historiSales.push(dueDate);
                        a.notaDeVenta.push(noteState)

                        a.stockSanCarlos = a?.stockSanCarlos - el.quantity

                        UpdateByIdInventario(el.id, a)

                }
            
        })
    }






  const handleToggleOrders =()=>{
        setToggleOrders(!toggleOrders)
        setToggle(!toggle)
  }





     return (
        <div className='card p-4'>
         <h3 className='text-white mb-4'>ORDENES DE SAN CARLOS</h3>
        <button className='btn btn-info ' onClick={handleToggleOrders}> {toggleOrders ? 'Entregados' : 'Por Entregar'} </button>
       
           
            {items.map((el, i) => (

                    <div key={i} className="item">

                        <hr />

                        <div className="texto">
                            <h3>Comprador: {el.buyer.name}</h3>

                            <p>
                                Fecha de Compra:{" "}
                                {new Date(el.date).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                })}
                            </p>

                           {el.items.map((el, i) => (
                                <b key={i}> 
                                    <img style={{width:'100px'}} src={el.imgUrl}/><br />
                                    Cantidad: { el.quantity}, <br /> 
                                    Tallas: {el.talla.map((elee, i)=>(<span key={i+'elee'}> {elee},</span>))} <br /><br />
                                </b>
                            ))} 

                            

                            <p>Correo: {el.buyer.email}</p>
                            <p>Celular: {el.buyer.phone}</p>
                            <p>Ciudad: {el.city}</p>
                            {/*<p>Clave de Compra: {el.id}</p>*/}

                            

                            <p className='m-0'>Total: {el.total}</p>
                            
                            <br/>

                            {
                                el.takenByCustomer === true &&
                                    <>
                                            <p className='mt-2'> Pagado el : <b>{milisegundosComoFecha(el?.historiSale || 0)}</b></p>
                                            <p> Nota de Venta : <b>No. {el.notaDeVenta}</b></p>
                                    </>
                            }

                        </div>

                            {
                                el.takenByCustomer === false &&
                                    <>
                                            <p className='m-0'>Status: <b>{el.takenByCustomer ? 'Entregado' : 'Pendiente'}</b></p>
                                            <input className='my-3' type="number" min='0' placeholder='# Nota de Venta' value={noteState} onChange={(e)=>setNoteState(e.target.value)}/>
                                    </>
                            }

                            <br/>

                        <button 
                            disabled={el.takenByCustomer === true ? true : false}
                            className={el.takenByCustomer === true ? 'btn btn-outline-primary mt-0' : 'btn btn-primary mt-4' }  onClick={()=>handleToggle(el.id, el)}> 

                                    {el.takenByCustomer ? 'Entregado' : 'Marcar como Entregada'}
                        </button>

                        <hr />

                    </div>

                ))}
        </div>
    );
};





























