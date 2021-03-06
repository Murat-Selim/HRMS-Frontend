import React, { useState } from 'react'
import EmployerService from '../../services/employerService';
import * as Yup from "yup";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";
import { Button, Modal, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
//import { useHistory } from 'react-router-dom';

export default function EmployerUpdate({ employer }) {
    
    //const history = useHistory();

    const [open, setOpen] = useState(false);

    const initialValues = {
      id:employer.id,
      email:employer.email,
      password:employer.password,
      passwordRepeat: employer.passwordRepeat,
      companyName:employer.companyName,
      webAddress:employer.webAddress,
      phoneNumber:employer.phoneNumber,
      isActivated: true
    };

    const validationSchema = Yup.object({
      email:Yup.string().required("email boş bırakılamaz"),
      password:Yup.string().required("şifre boş bırakılamaz"),
      passwordRepeat:Yup.string().required("şifre tekrarı boş bırakılamaz"),
      companyName:Yup.string().required("şirket ismi boş bırakılamaz"),
      webAddress:Yup.string().required("web adres boş bırakılamaz"),
      phoneNumber:Yup.string().required("Tel Numarası boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
      const {email, password, passwordRepeat, companyName, webAddress, phoneNumber, isActivated} = values
                let data = {
                  id: employer.id,
                  email,
                  password,
                  passwordRepeat,
                  companyName,
                  webAddress,
                  phoneNumber,
                  isActivated
                }
                let employerService = new EmployerService();
                employerService.updateEmployer(data)
                .then((result) => result.data.data)   
                //history.push("/employerUpdateConfirm")             
                toast.success("Bilgiler personelin onayının ardından güncellenecektir.")
                setOpen(false)  
    }

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content="Güncelle" color="green"/>}
      >
        <Modal.Header>Bilgilerini Güncelle</Modal.Header>
        <Modal.Content>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit = {(values) => handleOnSubmit(values)}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
               <Form.Field>
                    <HrmsTextInput name="companyName" placeholder="Şirket ismi" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="webAddress" placeholder="Web Site" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="phoneNumber" placeholder="Tel Numarası" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="email" placeholder="Email" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="password" placeholder="Şifre" />
               </Form.Field>
               <Form.Field>
                  <HrmsTextInput name="passwordRepeat" placeholder="Şifre Tekrarı"/>    
              </Form.Field>
            <Modal.Actions>
              <Button content="Güncelle" type="submit" color="blue"/>
              <Button content="Vazgeç" color="red" onClick={() => setOpen(false)}/>
            </Modal.Actions>
          </Form>
          )}
          </Formik>
        </Modal.Content>
      </Modal>
    </div>
  );
}