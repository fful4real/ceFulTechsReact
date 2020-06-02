import React from 'react'
import * as Yup from 'yup'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Spinner from '../../../../components/spinner/spinner';
import { Formik } from 'formik'
import AxiosAgent from '../../../../axios-agent'
import { setAccountsModalHeadingAttempt, closeAccountsModalAttempt, updateAccountAsync } from '../../../../redux/accounts/accounts.action'
import { createStructuredSelector } from 'reselect'
import { selectAccountModalObject, selectAccounts, selectCurrentAccount } from '../../../../redux/accounts/accounts.selector'
import { selectCurrencies } from '../../../../redux/currencies/currencies.selectors';
import { uid } from 'react-uid';
import { sanitizeString } from '../../../../helpers/helper';
import { showModalAlertAttempt } from '../../../../redux/fultechs/FulTechsActions';
import { withRouter } from 'react-router-dom';

const TransferAmountForm = ({updateAccounts,match, account, closeModal,accounts, showModalAlert})=> {

    account = accounts.filter(filtAccount=>filtAccount.id===account)[0]
    console.log(match.params.id)
    accounts = accounts.filter(filterAccount=>(filterAccount.currency.currencyCode===account.currency.currencyCode)&&(filterAccount.id!==account.id))
    let initialVals = {
        transferAmount:'',
        toAccount: '',
        note:''
    }
    const validationSchema = Yup.object().shape({
        transferAmount: Yup.string()
                        .required('Please enter transfer amount')
                        .matches(/^[0-9]+$/, 'Only numbers are accepted'),
            toAccount: Yup.string()
                        .required('Please select account')
    });

    return (
        <Formik initialValues={initialVals} 
                validationSchema={validationSchema}
                onSubmit = {
                    (values, {setSubmitting, resetForm, setErrors})=>{  
                        if(values.transferAmount>account.balance){
                            setErrors({transferAmount: 'Amount too high'})
                            return false
                        }
                        const transferAmount = sanitizeString(values.transferAmount),
                                toAccount = sanitizeString(values.toAccount),
                                note = sanitizeString(values.note)

                        const processValues = {
                            transferAmount,
                            toAccount,
                            note
                        }

                        console.log(JSON.stringify(processValues,null,2))
                        
                        AxiosAgent.request('patch',`ce_accounts/${account.id}/transfer`,null, processValues)
                                .then(resp =>{
                                        console.log(resp.data)
                                        showModalAlert('success', 'check-circle', 'Amount transferred')
                                        resetForm()
                                        setSubmitting(false)
                                    }
                                )
                                .catch(err => {
                                    console.log(err)
                                    showModalAlert('danger', 'block', 'There was an error transferring amount')
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
                        <Form.Group as={Col} md="4" controlId="accountsTransferValidateAmount">
                            <Form.Label>Amount</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-wallet"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="transferAmount"
                                    value={values.transferAmount}
                                    placeholder={`Amount < ${account.balance}`}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.transferAmount&&errors.transferAmount&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.transferAmount}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="accountTransferValidateFromAccount">
                            <Form.Label>From Account</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-layers"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <select 
                                    id="accountTransferFromAccount" 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    value={values.fromAccount}
                                    name="fromAccount"
                                    disabled={true}
                                >
                                    <option value="">{`${account.code} - ${account.number}`}</option>
                                </select>
                            </InputGroup>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="accountTransferValidateToAccount">
                            <Form.Label>To Account</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-layers"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <select 
                                    id="accountTransferToAccount" 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    value={values.toAccount}
                                    name="toAccount"
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select to account</option>
                                    {
                                        accounts
                                        .map(({code, id, number})=>(
                                            <option key={`account-${uid({id})}`} value={id}>{code}&nbsp;-&nbsp;{number}</option>
                                            ))
                                    }
                                </select>
                            </InputGroup>
                            {touched.toAccount&&errors.toAccount&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.toAccount}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="accountTransferValidateNote">
                            <Form.Label>Note</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-notebook"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    as="textarea" 
                                    rows="3"
                                    name="note"
                                    value={values.note}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                    onChange={handleChange} 
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationSubmitForm">
                            <Button className="btn-block" disabled={isSubmitting} variant="danger" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Transfer"
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
    currencies: selectCurrencies,
    account: selectCurrentAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferAmountForm))
