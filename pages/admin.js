import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from "react";
import { Account, AccountContext } from "../components/Account";
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';


export default function Admin() {

    return (
        <Dashboard />
    );
};