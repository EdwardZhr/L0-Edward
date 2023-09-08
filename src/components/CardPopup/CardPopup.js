import Popup from "../Popup/Popup";
import visa from '../../images/card-visa.svg'
import mir from '../../images/card-mir.svg'
import hz from '../../images/card-hz.svg'
import mastercard from '../../images/card-mastercard.svg'


export default class CardPopup extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this.handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._btn = this._popup.querySelector('.popup__save-btn')
    }


    _getInputValues() {
        this._formValues = '';
        this._inputList[0].value = mir
        this._inputList[1].value = visa
        this._inputList[2].value = mastercard
        this._inputList[3].value = hz
        
        this._inputList.forEach(input => {
            if (input.checked) {
                this._formValues = input.value
            }
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._btn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });
    }
}