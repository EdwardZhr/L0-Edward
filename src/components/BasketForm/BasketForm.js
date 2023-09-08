export default class Validator {
    constructor(formSelector) {
        this._formElement = document.querySelector(formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll('.basket-form__section-input'));
        this._buttonElement = this._formElement.querySelector('.sidebar__btn');
        this._inputsContainer = this._formElement.querySelector('.basket-form__section-content--inputs');
        this._phoneNumberInput = this._formElement.querySelector('.basket-form__section-input--number');
        this._iinNumberInput = this._formElement.querySelector('.basket-form__section-input--inn');
    }

    _showInputError = (inputElement, errorElement) => {
        errorElement.classList.remove('basket-form__section-input-error--hidden')
        inputElement.classList.add('basket-form__section-input--err')
    };
    
    _hideInputError = (inputElement, errorElement) => {
        errorElement.classList.add('basket-form__section-input-error--hidden');
        inputElement.classList.remove('basket-form__section-input--err')
    };
    
    _checkInputValidity = (inputElement,) => {
        const errorElement = this._formElement.querySelector(`.basket-form__section-input-error--${inputElement.id}`);

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement);
            if (inputElement.classList.contains('basket-form__section-input--inn')) {
                const helpElement = this._formElement.querySelector(`.basket-form__section-input-help`);
                helpElement.classList.add('basket-form__section-input-help--hidden')
            }
        } else {
            this._hideInputError(inputElement, errorElement);
            if (inputElement.classList.contains('basket-form__section-input--inn')) {
                const helpElement = this._formElement.querySelector(`.basket-form__section-input-help`);
                helpElement.classList.remove('basket-form__section-input-help--hidden')
            }
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid || !inputElement.value;
      }); 
    };

    _validate = (inputElement) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._inputList.forEach((inputElement) => {
                    if (!inputElement.value) {
                        const errorElement = this._formElement.querySelector(`.basket-form__section-input-error--${inputElement.id}`);
                        this._showInputError(inputElement, errorElement)
                    }
                    if (inputElement.classList.contains('basket-form__section-input--inn')) {
                        const helpElement = this._formElement.querySelector(`.basket-form__section-input-help`);
                        helpElement.classList.add('basket-form__section-input-help--hidden')
                    }
                })
                this._inputsContainer.scrollIntoView({ behavior: "smooth" })
            })
        } else {
            this._buttonElement.removeEventListener('click', (evt) => {
                evt.preventDefault();
                this._inputList.forEach((inputElement) => {
                    if (!inputElement.value) {
                        const errorElement = this._formElement.querySelector(`.basket-form__section-input-error--${inputElement.id}`);
                        this._showInputError(inputElement, errorElement)
                    }
                })
                this._inputsContainer.scrollIntoView({ behavior: "smooth" })
            })

        }
    };


    _setEventListeners = () => {
        this._toggleButtonState();
      
        this._inputList.forEach((inputElement) => {
            
            inputElement.addEventListener('input', () => {
                if (inputElement.value) {
                    const placeholderElement = this._formElement.querySelector(`.basket-form__section-input-placeholder--${inputElement.id}`);
                    placeholderElement.classList.remove('basket-form__section-input-placeholder--hidden')
                } else {
                    const placeholderElement = this._formElement.querySelector(`.basket-form__section-input-placeholder--${inputElement.id}`);
                    placeholderElement.classList.add('basket-form__section-input-placeholder--hidden')
                }
            })


            inputElement.addEventListener('blur', () => {
                this._validate(inputElement)
                this._toggleButtonState();
                inputElement.removeEventListener('input', () => {
                    this._validate(inputElement)
                })
                if (inputElement.value && !inputElement.validity.valid) {
                    inputElement.addEventListener('input', () => {
                        this._validate(inputElement)
                    });
                }
            })
        });

        this._phoneNumberInput.addEventListener('input', () => {
            let phoneNumber = this._phoneNumberInput.value.replace(/\D/g, "");
            if (phoneNumber.length > 0) {
                phoneNumber = "+" + phoneNumber.substring(0, 1) + " " +
                              phoneNumber.substring(1, 4) + " " +
                              phoneNumber.substring(4, 7) + " " +
                              phoneNumber.substring(7, 9) + " " +
                              phoneNumber.substring(9, 11);
            }
            this._phoneNumberInput.value = phoneNumber;
        })
        
        this._iinNumberInput.addEventListener('input', () => {
            this._iinNumberInput.value = this._iinNumberInput.value.replace(/\D/g, '');
        })
    };

    enableValidation = () => {
        this._setEventListeners();
    };
}
