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

   const[tallaState, setTallaState]=useState({})

    console.log(tallaState)

    const handleTallaState=(e)=>{
        let str = e.target.value
        let talla = str.split(',')

        if(e.target.value.length>2){
        //console.log('return', e.target.value.length)
            return
        }
        setTallaState({...tallaState, [e.target.name] : talla})
    }
 



    let currentDate = new Date();

    let dueDate = currentDate.setHours(
        currentDate.getHours() /* + itemDuration.current.value */,
    )


    const handleToggle =(id, el)=>{

        // if(noteState.length <= 0){
        //         alert('Falta el Numero Nota de Venta')
        //         return
        // }

        const obj = el

        obj.takenByCustomer = true
        // el.historiSale = dueDate
        // obj.notaDeVenta = noteState

        UpdateById(id, obj)

        setToggle(!toggle)


        //=====//================ Inventario  // 

        // obj.items.map((el,i)=>{

        //        const a = itemsInventario.filter(ele => ele.id === el.id )[i]


        //         if (a.historiSales === undefined) {


        //                 a.historiSales = [];
        //                 a.historiSales.push(dueDate);

        //                 a.notaDeVenta = []
        //                 a.notaDeVenta.push(noteState)

        //                 a.stockSanCarlos = a?.stockSanCarlos - el.quantity

        //                 UpdateByIdInventario(a.id, a)

        //         } else {

        //                 a.historiSales.push(dueDate);
        //                 a.notaDeVenta.push(noteState)

        //                 a.stockSanCarlos = a?.stockSanCarlos - el.quantity

        //                 UpdateByIdInventario(el.id, a)

        //         }
            
        // })


        // obj.items.map((el,i)=>{

        //     const aa = itemsInventario.filter(ele => ele.id === el.id)[0]


        //     for (let ind = 0; ind < Object.keys(tallaState).length ; ind++) {

        //             let everyValueArr = tallaState[Object.keys(tallaState)[ind]] // de la primer llave te da el primer valor y de la segunda llave te da el segundo objeto


        //             for (let i = 0; i < everyValueArr.length ; i++) {
        //                     let b = aa.talla.filter(el => el !== everyValueArr[i])
        //                     aa.talla = b

        //                     UpdateByIdInventario(Object.keys(tallaState)[ind], aa)
        //             }   

        //     }

            
        //     setToggle(!toggle)
        //     console.log(Object.values(tallaState).flat())

        // })
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

                           {el.items.map((ele, i) => (
                                <b key={i}>
                                    <p>{ele.id} </p>
                                    <img style={{width:'100px'}} src={ele.imgUrl}/>
                                    - Cantidad: { ele.quantity} <br /> 

                               {/*     <span className={el.takenByCustomer === true && 'd-none'}> Tallas: </span>
                                    
                                    {ele.talla.map((elem, i)=>(
                                        <b key={i+'talla'} className={el.takenByCustomer === true && 'd-none'}>{elem}, {''}</b>
                                    ))} <br />

                                    <input className={el.takenByCustomer === true ? 'd-none' : 'c-r'}
                                            type="text" placeholder='Talla Escogida' 
                                            name={ele.id} value={tallaState[ele.id]}
                                            onChange={(e)=>handleTallaState(e)}/><br /><br /><br />*/}
                                </b>
                            ))}

                            
                           <br />
                            <p>Correo: {el.buyer.email}</p>
                            <p>Celular: {el.buyer.phone}</p>
                            <p>Ciudad: {el.city}</p>
                            {/*<p>Clave de Compra: {el.id}</p>*/}

                            

                            <p className='m-0'>Total: {el.total}</p>
                            
                            <br/>

                         {/*   {
                                el.takenByCustomer === true &&
                                    <>
                                            <p className='mt-2'> Pagado el : <b>{milisegundosComoFecha(el?.historiSale || 0)}</b></p>
                                            <p> Nota de Venta : <b>No. {el.notaDeVenta}</b></p>
                                    </>
                            }*/}

                        </div>

                           {/* {
                                el.takenByCustomer === false &&
                                    <>
                                            <p className='m-0'>Status: <b>{el.takenByCustomer ? 'Entregado' : 'Pendiente'}</b></p>
                                            <input className='my-3 c-r' type="number" min='0' placeholder='# Nota de Venta' value={noteState} onChange={(e)=>setNoteState(e.target.value)}/>
                                    </>
                            }*/}

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





























