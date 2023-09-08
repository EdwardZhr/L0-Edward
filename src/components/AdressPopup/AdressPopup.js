import Popup from "../Popup/Popup";


export default class AdressPopup extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this.handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._btn = this._popup.querySelector('.popup__save-btn')
        this._methods = this._popup.querySelectorAll('.popup__method')
        this._courierFieldset = this._popup.querySelector('.popup__adress-fieldset--courier')
        this._pointFieldset = this._popup.querySelector('.popup__adress-fieldset--point')
        this._delBtns = this._popup.querySelectorAll('.popup_del-btn')
    }


    _getInputValues() {
        this._formValues = {};
        
        this._inputList.forEach(input => {
            if (input.checked) {
                if (input.name === 'way') {
                    this._formValues[input.name] = input.value
                } else {
                    const data = JSON.parse(input.value) 
                    this._formValues[input.name] = data.adress
                    this._formValues.grade = data.grade
                }
                
            }
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._btn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._getInputValues()
            this.handleFormSubmit(this._getInputValues());
        });

        this._delBtns.forEach((item) => {
            item.addEventListener('click', (evt) => {
                evt.preventDefault()
                item.parentNode.remove()
            })
        })

        this._methods.forEach((item) => {
            item.addEventListener('click', () => {
                if (item.querySelector('input').value === 'Пункт выдачи') {
                    this._courierFieldset.classList.add('popup__adress-fieldset--hidden')
                    this._pointFieldset.classList.remove('popup__adress-fieldset--hidden')
                } else {
                    this._courierFieldset.classList.remove('popup__adress-fieldset--hidden')
                    this._pointFieldset.classList.add('popup__adress-fieldset--hidden')
                }
            })
        })
    }
}