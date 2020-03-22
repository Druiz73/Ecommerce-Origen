import React from 'react';
import mediosDePago from '../../imgs/mediosDePago.png';
import './footer.css'

export default function Footer(props) {

    return (
        <div className="container-fluid">
            <div className="row bg-dark mx-auto">
                <div className="col-12 col-sm-12 col-lg-4 mt-1 ml-lg-3">
                    <h2 className="text-white mt-3 text-center mb-4 " >Seguinos</h2>
                    <div className="d-flex justify-content-between mx-auto my-auto">
                        <i className="fa fa-facebook-square fa-3x text-white rounded-circle" ></i>
                        <i className="fa fa-twitter-square fa-3x text-white rounded-circle" ></i>
                        <i className="fa fa-youtube fa-3x text-white rounded-circle" ></i>
                        <i className="fa fa-instagram fa-3x text-white rounded-circle" ></i>
                    </div>
                </div>
                <div className="medios col-12  col-lg-4 mt-1 ">
                    <h2 className="text-white mt-3 text-center mb-4 " >Medios de Pago</h2>
                    <img src={mediosDePago} alt="medios de pago" className="my-auto img-fluid" />
                </div>
                <div className="row col-lg-4 col-sm-12 text-sm-center mt-1 col-lg-3 text-white mt-sm-5 mx-sm-autp">
                    <div className="col-sm-6">
                        <h2 className="text-white mb-4">Contactanos</h2>
                        <p>381-413-0023</p></div>
                    <div className="col-sm-6 ">
                        <h2>AV. Brigido Terán 257</h2>
                        <p>San Miguel de Tucumán</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
