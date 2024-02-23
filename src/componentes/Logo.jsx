import '../css/Logo.css';
import logoEmporioAreco from "/imagenes/logoEA.png";
import Image from 'react-bootstrap/Image';

export default function Logo(src){
    return(
        <>
        
        <Image
        src= {logoEmporioAreco}
        thumbnail
        fluid
        className="imagen me-5"
        
        />

        </>
    )
}