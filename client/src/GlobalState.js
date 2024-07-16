import React , {createContext , useState , useEffect} from 'react'
import  axios  from 'axios'
import Cookies from "js-cookie"

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
 const token = Cookies.get('token');
  const [Categories , setCategories] = useState();
  const [Acheteur , setAcheteur] = useState();
  const [Vendeur , setVendeur] = useState();
  const [Admin , setAdmin] = useState();
  const [Products , setProducts] = useState();
  const [tutoriel , setTutotiel]= useState();
  const [carteRech , setCarteRech] = useState();
  const[bids , setBids] = useState();
  const[permissions , setPermissions] = useState();
  const[roles , setRoles] = useState();
  const[admins , setAdmins] = useState();
  const [commandes , setCommandes] = useState();
  const [users , setUsers] = useState();
  useEffect(()=>{
    const getAllAcheteur = async() =>{
      try {
          const  res = await axios.get('http://192.168.0.108:8081/admin/users/Acheteur');
          console.log("Acheteur:",res.data);
          setAcheteur(res.data)
      } catch (error) {
          console.log(error);
      }
  }
  const getAllVendeur = async() =>{
    try {
        const  res = await axios.get('http://192.168.0.108:8081/admin/users/Vendeur');
        console.log("Vendeur:",res.data);
        setVendeur(res.data)
    } catch (error) {
        console.log(error);
    }
}

    const getAllCategories = async() =>{
        try {
            const  res = await axios.get('http://192.168.0.118:8081/api/category/getAll');
            console.log("categories:",res.data);
            setCategories(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getAllProducts = async() =>{
        try {
            const  res = await axios.get('http://192.168.0.108:8081/api/product/getAll');
            console.log("Products:",res.data);
            setProducts(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getAllTuto = async ()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/api/tuto/getAll');
          console.log('tutorial:' , res.data);
          setTutotiel(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getCarteRechar = async()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/api/carte/getAll');
        console.log('cartes:' , res.data);
        setCarteRech(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    const getAllBids = async()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/api/bid/getAll')
        console.log("all bids:" , res.data)
        setBids(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllPermissions = async()=>{
      try {
        const res = await axios.get('http://localhost:5000/service/services')
        console.log("all permissions:" , res.data)
        setPermissions(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllRoles = async()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/admin/allRoles')
        console.log("all roles:" , res.data)
        setRoles(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllAdmin = async()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/admin/users/Admin')
        console.log("all Admins:" , res.data)
        setAdmins(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllCommandes = async()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/api/commandes/toutes-les-commandes')
        console.log("all Commandes:" , res.data)
        setCommandes(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllUsers = async()=>{
      try {
        const res = await axios.get('http://192.168.0.108:8081/admin/users/Acheteur')
        console.log("all Users:" , res.data)
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
getAllVendeur()
getAllAcheteur()
getAllUsers();
getAllCommandes();
getAllAdmin();     
getAllCategories();
getAllProducts();
getAllTuto();
getAllBids();
getCarteRechar();
getAllPermissions();
getAllRoles();
  } , [token])
  
   const state ={
    Categories : Categories,
    Products : Products,
    tutorials : tutoriel,
    bids : bids,
    cartes: carteRech,
    Permissions : permissions,
    Roles : roles,
    Admins :  admins,
    Commandes : commandes,
    Users : users



  }

  return(
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
  )
}