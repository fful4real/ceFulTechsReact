import React from 'react'
import * as Yup from 'yup'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Spinner from '../../../../components/spinner/spinner';
import { Formik } from 'formik'
import AxiosAgent from '../../../../axios-agent'
import { setAccountsModalHeadingAttempt, closeAccountsModalAttempt, updateAccountAsync } from '../../../../redux/accounts/accounts.action'
import { createStructuredSelector } from 'reselect'
import { selectAccountModalObject, selectAccounts } from '../../../../redux/accounts/accounts.selector'
import { selectBanks } from '../../../../redux/banks/BanksSelectors';
import { selectAccountTypes } from '../../../../redux/accountTypes/AccountTypesSelectors';
import { selectCurrencies } from '../../../../redux/currencies/currencies.selectors';
import { uid } from 'react-uid';
import { sanitizeString } from '../../../../helpers/helper';
import { showModalAlertAttempt } from '../../../../redux/fultechs/FulTechsActions';

const CreateAccountForm = ({customers,updateAccounts, currencies, accountTypes, banks, closeModal,accounts, addCustomer, showModalAlert})=> {
    let initialVals = {
        accountCode:'',
        accountName: '',
        accountNumber: '',
        accountBank: '',
        accountAccountType: '',
        accountCurrency: ''
    }
    const validationSchema = Yup.object().shape({
        accountCode: Yup.string()
                        .min(3,'Minimum 3 characters')
                        .max(9,'Maximum 9 characters')
                        .required('Please enter code'),
        accountName: Yup.string()
                        .required('Please enter account name')
                        .max(25,'Minimum 25 characters'),
    accountNumber: Yup.string()
                        .min(9,'Minimum 9 characters')
                        .max(20,'Minimum 20 characters')
                        .required('Please enter account number')
                        .matches(/^[0-9]+$/, 'Only numbers are accepted'),
    accountBank: Yup.string()
                        .required('Please select bank'),
    accountAccountType: Yup.string()
                        .required('Please select account type'),
        accountCurrency: Yup.string()
                            .required('Please select currency')
    });

    return (
        <Formik initialValues={initialVals} 
                validationSchema={validationSchema}
                onSubmit = {
                    (values, {setSubmitting, resetForm, setErrors})=>{  
                        const accountNumberExists = accounts.filter(account=>account.number.toLowerCase()===values.accountNumber.toLowerCase()).length?true:false
                        const accountCodeExists = accounts.filter(account=>account.code.toLowerCase()===values.accountCode.toLowerCase()).length?true:false
                        if(accountNumberExists){
                            setErrors({accountNumber: 'Account number already exists'})
                            return false
                        }
                        
                        if(accountCodeExists){
                            setErrors({accountCode: 'Account code already exists'})
                            return false
                        }
                        const code = sanitizeString(values.accountCode),
                                name = sanitizeString(values.accountName),
                                number = sanitizeString(values.accountNumber),
                                bank = values.accountBank,
                                accountType = values.accountAccountType,
                                currency = values.accountCurrency
                        const processValues = {
                            code,
                            name,
                            number,
                            bank,
                            accountType,
                            currency
                        }

                        console.log(JSON.stringify(processValues,null,2))
                        
                        AxiosAgent.request('post','ce_accounts',null, processValues)
                                .then(resp =>{
                                        console.log(resp.data)
                                       accounts = [resp.data, ...accounts]
                                       updateAccounts(accounts)
                                        showModalAlert('success', 'check-circle', 'Account Added')
                                        resetForm()
                                        setSubmitting(false)
                                    }
                                )
                                .catch(err => {
                                    console.log(err)
                                    showModalAlert('danger', 'block', 'There was an error adding account')
                                    setSubmitting(false)
                                }
                        );
                    }
                }
        >
        {({values,errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{
            return(
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="accountsValidateNumber">
                            <Form.Label>Account Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-wallet"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="accountNumber"
                                    value={values.accountNumber}
                                    placeholder="Account Number"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.accountNumber&&errors.accountNumber&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.accountNumber}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="accountValidateCode">
                            <Form.Label>Account Code</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-support"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="accountCode"
                                    value={values.accountCode}
                                    placeholder="Account code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.accountCode&&errors.accountCode&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.accountCode}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="accountsValidateName">
                            <Form.Label>Acoount Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-bubble"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="accountName"
                                    value={values.accountName}
                                    placeholder="Account Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.accountName&&errors.accountName&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.accountName}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                    <Form.Group as={Col} md="4" controlId="accountValidateAccountType">
                            <Form.Label>Account Type</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-layers"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <select 
                                    id="accountAccountType" 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    value={values.accountAccountType}
                                    name="accountAccountType"
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select account type</option>
                                    {
                                        accountTypes
                                        .map(({code, id, name})=>(
                                            <option key={`accountType-${uid({id})}`} value={`/api/account_types/${id}`}>{code}&nbsp;-&nbsp;{name}</option>
                                            ))
                                    }
                                </select>
                            </InputGroup>
                            {touched.accountAccountType&&errors.accountAccountType&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.accountAccountType}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="accountsValidateBank">
                            <Form.Label>Bank</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-briefcase"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <select 
                                    id="accountBank" 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    value={values.accountBank}
                                    name="accountBank"
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select bank</option>
                                    {
                                        banks
                                        .map(({code, id, name})=>(
                                            <option key={`bank-${uid({id})}`} value={`/api/banks/${id}`}>{code}&nbsp;-&nbsp;{name}</option>
                                            ))
                                    }
                                </select>
                            </InputGroup>
                            {touched.accountBank&&errors.accountBank&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.accountBank}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="accountValidateCurrency">
                            <Form.Label>Currency</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-drawar"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <select 
                                    id="accountCurrency" 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    value={values.accountCurrency}
                                    name="accountCurrency"
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select currency</option>
                                    {
                                        currencies
                                        .map(({currencyCode, id, currencyLabel})=>(
                                            <option key={`currency-${uid({id})}`} value={`/api/currencies/${id}`}>{currencyCode}&nbsp;-&nbsp;{currencyLabel}</option>
                                            ))
                                    }
                                </select>
                            </InputGroup>
                            {touched.accountCurrency&&errors.accountCurrency&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.accountCurrency}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationSubmitForm">
                            <Button className="btn-block" disabled={isSubmitting} variant="success" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Add Account"
                                }
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationCancel">
                            <Button className="btn-block" onClick={closeModal} disabled={isSubmitting} variant="secondary" size="lg" type="button">
                                Close
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            )
        }}

        </Formik>
    )
}

const mapDispatchToProps = {
    showModalAlert: showModalAlertAttempt,
    setModalHeading: setAccountsModalHeadingAttempt,
    closeModal: closeAccountsModalAttempt,
    updateAccounts: updateAccountAsync
}

const mapStateToProps = createStructuredSelector({
    accountsModal: selectAccountModalObject,
    accounts:selectAccounts,
    banks: selectBanks,
    accountTypes: selectAccountTypes,
    currencies: selectCurrencies,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm)
