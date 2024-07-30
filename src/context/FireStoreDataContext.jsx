import { createContext, useState, useEffect } from 'react';

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';

import { firestoreDB, storageDocs } from '../firebase/firebaseConfig';

import {
  ref,
  uploadBytes,
  getBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

export const FireStoreDataContext = createContext();

const FireStoreDataProvider = (props) => {
  const [items, setItems] = useState([]);
  
  const [itemsInventario, setItemsInventario] = useState([]);

  const [toggleOrders, setToggleOrders]=useState(false)

  console.log(toggleOrders)

  const itemCollection = query(
    collection(firestoreDB, 'orders'),
    where('takenByCustomer', '==', toggleOrders),
    where("city", "==", "san carlos")
  );





  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getDocs(itemCollection)
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log('No results!');
        }

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(documents);
      })
      .catch((err) => {
        console.log('Error searching items', err);
      });

    isMounted = false;
  }, [toggle]);



  const itemCollectionInventario = query(
    collection(firestoreDB, 'inventario'),
    where("sucursal", "==", "San Carlos")
  );


   useEffect(() => {
    let isMounted = true;

    getDocs(itemCollectionInventario)
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log('No results!');
        }

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItemsInventario(documents);
      })
      .catch((err) => {
        console.log('Error searching items', err);
      });

    isMounted = false;
  }, [toggle]);
  //============================= images functions ===========================//


  const postCollection = collection(firestoreDB, 'inventario');



  const handleFileAdd = (selectedFile, postBody) => {
    const filesFolderRef = ref(
      storageDocs,
      `projectFiles/${selectedFile?.name}`
    );
    uploadBytes(filesFolderRef, selectedFile)
      .then(() => {
        getDownloadURL(filesFolderRef).then((url) => {
          postBody.imgName = selectedFile.name;
          postBody.imgUrl = url;
          addDoc(postCollection, postBody);
          setToggle(!toggle);
        });
      })
      .catch((error) => console.log(error));
  };

  //============================= images functions end ===========================//

  const deleteById = async (id, imgName) => {
    const aDoc = doc(firestoreDB, 'inventario', id);
    try {
      await deleteDoc(aDoc);

      const desertRef = ref(storageDocs, `projectFiles/${imgName}`);

      deleteObject(desertRef)
        .then(() => {
          console.log(imgName, 'se elimino de Storage');
        })
        .catch((error) => {
          console.log('ocurrio un error: ', error);
        });
    } catch (error) {
      console.error(error);
    }
  };




  const UpdateById = async (id, obj) => {
    const aDoc = doc(firestoreDB, 'orders', id);
    try {
      await updateDoc(aDoc, obj);
    } catch (error) {
      console.error(error);
    }
  };



   const UpdateByIdInventario = async (id, obj) => {
    const aaDoc = doc(firestoreDB, 'inventario', id);
    try {
      await updateDoc(aaDoc, obj);
    } catch (error) {
      console.error(error);
    }
  };






  return (
    <FireStoreDataContext.Provider
      value={{
        items,
        deleteById,
        UpdateById,
        handleFileAdd,
        setToggle,
        toggle,
        toggleOrders,
        setToggleOrders,
        UpdateByIdInventario,
        itemsInventario
      }}
    >
      {props.children}
    </FireStoreDataContext.Provider>
  );
};

export default FireStoreDataProvider;
