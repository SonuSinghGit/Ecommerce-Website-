/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid
  const context = useContext(myContext)
  const { mode, loading } = context
  return (

    <Layout>
     order
     <h1>Name:{name} </h1>
     <h1>Rollno: {rollno} </h1>
    </Layout>
  
  )
}

export default Order