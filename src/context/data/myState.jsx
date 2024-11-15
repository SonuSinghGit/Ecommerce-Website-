/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect,useContext} from 'react'
import MyContext from './myContext';
import { fireDB} from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, deleteDoc, onSnapshot, orderBy, query, setDoc ,doc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getDocs} from "firebase/firestore";


function MyState(props) { 
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';

        }
    }

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  })

    const addProduct = async () => {
      if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
        return toast.error("All fields are required")
      }
       
      setLoading(true)
      try {
        const productRef = collection(fireDB, "products")
        await addDoc(productRef, products)
        toast.success("Product Add successfully")

       setTimeout(()=>{
         window.location.href='/dashboard'
       },800)
        getProductData()
        //closeModal()
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      setProducts("")
    }
  
    const [product, setProduct] = useState([]);

    const getProductData = async () => {
      setLoading(true)
      try {
        const q = query(
          collection(fireDB, "products"),
          orderBy("time"),
          // limit(5)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let productsArray = [];
          QuerySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProduct(productsArray)
          setLoading(false);
        });
        return () => data;
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  
    useEffect(() => {
      getProductData();
    }, []);

    //update product function
    const edithandle=(item)=>{
      setProducts(item)
    }
    
    const updateProduct = async ()=>{
      setLoading(true)
      try{
        await setDoc(doc(fireDB,'products.id'),products)
        toast.success("Product Updated successfully")
        setTimeout(()=>{
            window.location.href='/dashboard'
        },1000)
        getProductData();
        setLoading(false)
        
      }catch(error){
        console.log(error)
        setLoading(false);
      }
    }
   //delete product
    const deleteProduct = async (item)=>{
      setLoading(true)
      try{
        await deleteDoc(doc(fireDB,'products',item.id))
        toast.success("Product deleted successfully")
        getProductData();
        setLoading(false)
        
      }catch(error){
        console.log(error)
        setLoading(false);
      }
    }

   
  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading,setLoading,
      products, setProducts,addProduct,product,edithandle,updateProduct,deleteProduct, }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState;
