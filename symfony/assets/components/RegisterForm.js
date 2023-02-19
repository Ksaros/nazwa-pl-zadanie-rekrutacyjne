import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
      const defaultData = {
            lawState: "0",
            nameSurname: "",
            company: "",
            street: "",
            homeNumber: "",
            city: "",
            postalCode: "",
            state: "default",
            phonePrefix: "+48",
            phone: "",
            email: "",
            pesel: "",
            nip: ""
      };
      const defaultErrors = {
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
      const [data, setData] = useState(defaultData);
      const [errors, setErrors] = useState(defaultErrors);
      const [states, setStates] = useState([]);

      const handleOnChange = (e) => {
            setData({
                  ...data,
                  [e.target.name]: e.target.value
            });
      };

      const handleLawStateChange = (e) => {
            if (e.target.value === "0") {
                  setData({
                        ...data,
                        lawState: e.target.value,
                        company: "",
                        nip: ""
                  });
            } else {
                  setData({
                        ...data,
                        lawState: e.target.value,
                        nameSurname: "",
                        pesel: ""
                  });
            }
      };

      const validateData = (form) => {
            if (typeof data !== 'object') {
                  return;
            }

            let e = { ...defaultErrors };

            if (data.lawState === "0") {
                  if (!/.+\s.+/.test(data.nameSurname)) {
                        e.nameSurname = "Musisz podać imię i nazwisko.";
                        form.querySelector('#nameSurname').setCustomValidity(true);
                  } else {
                        form.querySelector('#nameSurname').setCustomValidity('');
                  }

                  if (!/^\d{11}$/.test(data.pesel)) {
                        e.pesel = "PESEL musi zawierać 11 cyfr.";
                        form.querySelector('#pesel').setCustomValidity(true);
                  } else {
                        form.querySelector('#pesel').setCustomValidity('');
                  }
            } else {
                  if (!data.company) {
                        e.company = "Proszę uzupełnić pole.";
                        form.querySelector('#company').setCustomValidity(true);
                  } else {
                        form.querySelector('#company').setCustomValidity('');
                  }

                  if (!/^\d{10}$/.test(data.nip)) {
                        e.nip = "NIP musi zawierać 10 cyfr.";
                        form.querySelector('#nip').setCustomValidity(true);
                  } else {
                        form.querySelector('#nip').setCustomValidity('');
                  }
            }

            if (!data.street) {
                  e.street = "Proszę uzupełnić pole.";
                  form.querySelector('#street').setCustomValidity(true);
            } else {
                  form.querySelector('#street').setCustomValidity('');
            }

            if (!data.homeNumber || !/^\d+([a-z])?$/.test(data.homeNumber)) {
                  e.homeNumber = "Proszę uzupełnić pole.";
                  form.querySelector('#homeNumber').setCustomValidity(true);
            } else {
                  form.querySelector('#homeNumber').setCustomValidity('');
            }

            if (!data.city) {
                  e.city = "Proszę uzupełnić pole.";
                  form.querySelector('#city').setCustomValidity(true);
            } else {
                  form.querySelector('#city').setCustomValidity('');
            }

            if (!data.postalCode || !/^\d{2}-\d{3}$/.test(data.postalCode)) {
                  e.postalCode = "Wzór kodu pocztowego __-___";
                  form.querySelector('#postalCode').setCustomValidity(true);
            } else {
                  form.querySelector('#postalCode').setCustomValidity('');
            }

            if (data.state === defaultData.state) {
                  e.state = "Proszę wybrać województwo.";
                  form.querySelector('#state').setCustomValidity(true);
            } else {
                  form.querySelector('#state').setCustomValidity('');
            }

            if (data.phonePrefix !== defaultData.phonePrefix && !/^\+\d{2}$/.test(data.phonePrefix)) {
                  e.phonePrefix = "Wzór prefix-u: +__";
                  form.querySelector('#phonePrefix').setCustomValidity(true);
            } else {
                  form.querySelector('#phonePrefix').setCustomValidity('');
            }

            if (!/^\d{9}$/.test(data.phone)) {
                  e.phone = "Proszę uzupełnić pole.";
                  form.querySelector('#phone').setCustomValidity(true);
            } else {
                  form.querySelector('#phone').setCustomValidity('');
            }

            if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
                  e.email = "Wzór adresu email: example@address.com";
                  form.querySelector('#email').setCustomValidity(true);
            } else {
                  form.querySelector('#email').setCustomValidity('');
            }

            setErrors(e);
      };

      const register = async (form) => {
            return await axios.post(`/client/create`, data)
                  .then((response) => {
                        if (response.data && response.data.success) {
                              form.reset();
                              if (!form.classList.contains('was-validated')) {
                                    form.classList.remove('was-validated');
                              }

                              alert("Poprawnie dodano klienta.");
                        }
                        if (response.data && !response.data.success && response.data.data) {
                              let e = { ...defaultErrors };
                              for (const prop in response.data.data) {
                                    form.querySelector('#' + prop).setCustomValidity(true);
                                    e[prop] = response.data.data[prop];
                              }

                              setErrors(e);
                              form.checkValidity();
                              if (!form.classList.contains('was-validated')) {
                                    form.classList.add('was-validated');
                              }
                        }
                  })
                  .catch((err) => {
                        console.error('Niepowodzenie rejestracji klienta.');
                  });
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            console.log(e);
            validateData(e.target);
            if (!e.target.classList.contains('was-validated')) {
                  e.target.classList.add('was-validated');
            }

            if (!e.target.checkValidity()) {
                  e.preventDefault();
                  e.stopPropagation();

                  return false;
            }

            e.preventDefault();
            register(e.target);

            return true;
      };

      useEffect(() => {
            if (!states.length) {
                  axios.get('http://api.dro.nazwa.pl/')
                        .then((response) => {
                              if (response.status === 200 && response.data.length) {
                                    setStates(response.data);
                              }
                        })
                        .catch((err) => {
                              console.error('Niepowodzenie pobierania województw.');
                        });
            }
      }, []);

      const resetForm = (e) => {
            if (e.target.classList.contains('was-validated')) {
                  e.target.classList.remove('was-validated');
            }

            setData({ ...defaultData });
            setErrors({ ...defaultErrors });
      };

      return (
            <div className='container'>
                  <h2>DANE IDENTYFIKACYJNE</h2>
                  <hr />

                  <form className='w-50 m-auto needs-validation' id='registerForm' onSubmit={handleSubmit} onReset={resetForm} noValidate>
                        <fieldset className="row mb-3">
                              <span className="col-sm-4 col-form-label">Status prawny:</span>
                              <div className="col-sm-8">
                                    <div className="form-check d-inline-block m-2">
                                          <input className="form-check-input" type="radio" name="lawState" id="lawState1" value="0" onChange={handleLawStateChange} checked={data.lawState === "0"} />
                                          <label className="form-check-label" htmlFor="lawState1">
                                                klient indywidualny
                                          </label>
                                    </div>
                                    <div className="form-check d-inline-block">
                                          <input className="form-check-input" type="radio" name="lawState" id="lawState2" value="1" onChange={handleLawStateChange} checked={data.lawState === "1"} />
                                          <label className="form-check-label" htmlFor="lawState2">
                                                Firma
                                          </label>
                                    </div>
                              </div>
                        </fieldset>
                        {(data.lawState !== "1") ? <div className="row mb-3">
                              <label htmlFor="nameSurname" className="col-sm-4 col-form-label">Imię i nazwisko:</label>
                              <div className="col-sm-8">
                                    <input type="text" className="form-control" id="nameSurname" name="nameSurname" onChange={handleOnChange} required />
                                    <div className="invalid-feedback">
                                          {errors.nameSurname}
                                    </div>
                              </div>
                        </div> : <></>}

                        {data.lawState !== "0" ? <div className="row mb-3">
                              <label htmlFor="company" className="col-sm-4 col-form-label">Firma:</label>
                              <div className="col-sm-8">
                                    <input type="text" className="form-control" id="company" name="company" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.company}
                                    </div>
                              </div>
                        </div> : <></>}

                        <div className="row mb-3">
                              <label htmlFor="street" className="col-sm-4 col-form-label">Ulica, nr domu:</label>
                              <div className="col-sm-6">
                                    <input type="text" className="form-control" id="street" name="street" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.street}
                                    </div>
                              </div>
                              <div className="col-sm-2">
                                    <input type="text" className="form-control" id="homeNumber" name="homeNumber" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.homeNumber}
                                    </div>
                              </div>
                        </div>
                        <div className="row mb-3">
                              <label htmlFor="city" className="col-sm-4 col-form-label">Miejscowość, kod pocztowy:</label>
                              <div className="col-sm-6">
                                    <input type="text" className="form-control" id="city" name="city" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.city}
                                    </div>
                              </div>
                              <div className="col-sm-2">
                                    <input type="text" className="form-control" id="postalCode" name="postalCode" placeholder="__-___" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.postalCode}
                                    </div>
                              </div>
                        </div>
                        <div className="row mb-3">
                              <label htmlFor="state" className="col-sm-4 col-form-label">Województwo:</label>
                              <div className="col-sm-8">
                                    <select id="state" value={data.state} name="state" className="form-control" onChange={handleOnChange}>
                                          <option value="default">Województwo</option>
                                          {states.map((state, i) => (<option key={i} value={state}>{state}</option>))}
                                    </select>
                                    <div className="invalid-feedback">
                                          {errors.state}
                                    </div>
                              </div>
                        </div>
                        <div className="row mb-3">
                              <label htmlFor="phonePrefix" className="col-sm-4 col-form-label">Telefon:</label>
                              <div className="col-sm-2">
                                    <input type="text" className="form-control" id="phonePrefix" name="phonePrefix" placeholder='+48' onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.phonePrefix}
                                    </div>
                              </div>
                              <div className="col-sm-6">
                                    <input type="text" className="form-control" id="phone" name="phone" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.phone}
                                    </div>
                              </div>
                        </div>
                        <div className="row mb-3">
                              <label htmlFor="email" className="col-sm-4 col-form-label">Email:</label>
                              <div className="col-sm-8">
                                    <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange} placeholder="example@address.com" required />
                                    <div className="invalid-feedback">
                                          {errors.email}
                                    </div>
                              </div>
                        </div>
                        {data.lawState !== "1" ? <div className="row mb-3">
                              <label htmlFor="pesel" className="col-sm-4 col-form-label">PESEL:</label>
                              <div className="col-sm-8">
                                    <input type="text" className="form-control" id="pesel" name="pesel" onChange={handleOnChange} />
                                    <div className="invalid-feedback">
                                          {errors.pesel}
                                    </div>
                              </div>
                        </div> : <></>}

                        {data.lawState !== "0" ? <div className="row mb-3">
                              <label htmlFor="nip" className="col-sm-4 col-form-label">NIP:</label>
                              <div className="col-sm-8">
                                    <input type="text" className="form-control" id="nip" name="nip" onChange={handleOnChange} required />
                                    <div className="invalid-feedback">
                                          {errors.nip}
                                    </div>
                              </div>
                        </div> : <></>}
                  </form>

                  <hr />
                  <div className='d-flex flex-row justify-content-end'>
                        <button type='reset' form='registerForm' className="btn btn-light bg-transparent">ANULUJ</button>
                        <button type='submit' form='registerForm' className="btn btn-primary">ZAPISZ</button>
                  </div>
            </div>
      );
};

export default RegisterForm;
