import { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { checkValidity, updateObject } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ],
                },
                value: 'fastest',
                validation: {},
                valid: false,
            },
        },
        formIsValid: false,
    };

    inputChangeHandler = (event, inputIdentifier) => {
        // const updatedOrderForm = {
        //     ...this.state.orderForm, // clone order form in state
        // };
        const updatedFormElement = updateObject(
            this.state.orderForm[inputIdentifier],
            {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.validation),
                touched: true,
            }
        );
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier], // clone object in state at index = inputIdentifier
        // };
        // updatedFormElement.value = event.target.value; // assign value when user onChange input to value in updatedFormElement
        // updatedFormElement.valid = this.checkValidity(
        //     updatedFormElement.value,
        //     updatedFormElement.validation
        // );
        // updatedFormElement.touched = true;
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement,
        });
        // updatedOrderForm[inputIdentifier] = updatedFormElement; // assign object (at index = inputIdentifier) =  updatedFormElement (at index = inputIdentifier)

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        });
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] =
                this.state.orderForm[formElementIdentifier].value; // add infor user to formData
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        };
        this.props.onOrderBurger(order, this.props.token);
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            // change object to array to  loop
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) =>
                            this.inputChangeHandler(event, formElement.id)
                        }
                    />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
}; // get data from redux store

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) =>
            dispatch(actions.purchaseBurger(orderData, token)),
    };
}; // dispatch action to redux store

export default connect(mapStateToProps, mapDispatchToProps)(ContactData); // connect component to redux store
