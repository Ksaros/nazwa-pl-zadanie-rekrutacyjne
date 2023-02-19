import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const Client = () => {
      const defaultData = {
            lawState: "",
            nameSurname: "",
            company: "",
            street: "",
            homeNumber: "",
            city: "",
            postalCode: "",
            state: "",
            phonePrefix: "",
            phone: "",
            email: "",
            pesel: "",
            nip: ""
      };
      const { slug } = useParams();
      const [client, setClient] = useState(defaultData);

      useEffect(() => {
            axios.get(`/json/${slug}`)
                  .then((response) => {
                        if (response.status === 200 && response.data) {
                              setClient(response.data);
                        }
                  })
                  .catch((err) => {
                        console.error('Niepowodzenie pobierania województw.');
                  });
      }, []);

      return (
            <>
                  <table className='table table-info table-sm table-bordered'>
                        <thead>
                              <tr>
                                    <th scope="col">Status prawny</th>
                                    {client && client.lawState !== "" && client.lawState === 0 ? <th scope="col">Imię i nazwisko</th> : <></>}
                                    {client && client.lawState !== "" && client.lawState === 1 ? <th scope="col">Firma</th> : <></>}
                                    <th scope="col">Ulica, nr domu</th>
                                    <th scope="col">Miejscowość, kod pocztowy</th>
                                    <th scope="col">Województwo</th>
                                    <th scope="col">Telefon</th>
                                    <th scope="col">Email</th>
                                    {client && client.lawState !== "" && client.lawState === 0 ? <th scope="col">PESEL</th> : <></>}
                                    {client && client.lawState !== "" && client.lawState === 1 ? <th scope="col">NIP</th> : <></>}
                              </tr>
                        </thead>
                        <tbody>
                              <tr>
                                    <td>{client && client.lawState !== "" ? client.lawState : <></>}</td>
                                    {client && client.lawState !== "" && client.lawState === 0 ? <td>{client.nameSurname}</td> : <></>}
                                    {client && client.lawState !== "" && client.lawState === 1 ? <td>{client.company}</td> : <></>}
                                    <td>{client && client.lawState !== "" ? `${client.street}, ${client.homeNumber}` : <></>}</td>
                                    <td>{client && client.lawState !== "" ? `${client.city}, ${client.postalCode}` : <></>}</td>
                                    <td>{client && client.lawState !== "" ? client.state : <></>}</td>
                                    <td>{client && client.lawState !== "" ? `${client.phonePrefix}, ${client.phone}` : <></>}</td>
                                    <td>{client && client.lawState !== "" ? client.email : <></>}</td>
                                    {client && client.lawState !== "" && client.lawState === 0 ? <td>{client.pesel}</td> : <></>}
                                    {client && client.lawState !== "" && client.lawState === 1 ? <td>{client.nip}</td> : <></>}
                              </tr>
                        </tbody>
                  </table>
            </>
      );
};

export default Client;
