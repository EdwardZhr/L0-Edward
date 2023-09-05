export default class ListItem {
    constructor(data, templateSelector, separateNumber, updateGoods, deleteGood, checkGood) {
        this._goodUrl = data.goodUrl;
        this._imgUrl = data.imgUrl;
        this._name = data.name;
        this._brand = data.brand;
        this._color = data.color;
        this._size = data.size;        
        this._place = data.place;
        this._company = data.company;
        this._balance = data.balance;
        this._newPrice = data.newPrice;
        this._oldPrice = data.oldPrice;
        this._selected = data.selected;
        this._isLiked = data.isLiked;
        this._isChecked = data.isChecked;
        this._id = data.id;
        this._templateSelector = templateSelector;
        this._separateNumber = separateNumber;
        this._updateGoods = updateGoods;
        this._deleteGood = deleteGood;
        this._checkGood = checkGood;
    }

    _getTemplate() {
        const item = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.list-item')
          .cloneNode(true);
        
        return item;
      }
    
    _like() {
        this._postponeIcon.classList.add('list-item__btn-postpone--active');
    }

    _dislike() {
        this._postponeIcon.classList.remove('list-item__btn-postpone--active');
    }

    _deleteItem() {
        this._item.remove();
        this._item = null;
        this._deleteGood(this._id)
    }

    _handleChangeQuantity() {
        this._newSpan = document.createElement('span');
        this._oldSpan = document.createElement('span');
        this._newSpan.classList.add('list-item__price-new-som');
        this._newSpan.textContent = ' сом';
        this._oldSpan.classList.add('list-item__price-old-som');
        this._oldSpan.textContent = ' сом';


        this._newPriceElement.textContent = `${this._separateNumber(this._newPrice * this._selected)}`;
        this._oldPriceElement.textContent = `${this._separateNumber(this._oldPrice * this._selected)}`;
        this._newPriceElement.appendChild(this._newSpan);
        this._oldPriceElement.appendChild(this._oldSpan);

        if (this._balance - this._selected <= 2 && this._balanceElement.classList.contains('list-item__balance--hidden')) {
            this._balanceElement.classList.remove('list-item__balance--hidden')
        }

        if (this._balance - this._selected > 2 && !this._balanceElement.classList.contains('list-item__balance--hidden')) {
            this._balanceElement.classList.add('list-item__balance--hidden')
        }

        if (this._balance - this._selected <= 2 && !this._balanceElement.classList.contains('list-item__balance--hidden')) {
            this._balanceElement.textContent = `Осталось ${this._balance - this._selected} шт.`;
        }

        if (this._selected < 2) {
            this._minusBtn.disabled = true;
        }

        if (this._selected >= 2 && this._minusBtn.disabled === true) {
            this._minusBtn.disabled = false
        }
    
        if (this._balance - this._selected === 0) {
            this._plusBtn.disabled = true;
        }

        if (this._balance - this._selected > 0 && this._plusBtn.disabled === true) {
            this._plusBtn.disabled = false
        }
    }

    _minus() {
        this._numeric.value = --this._selected
        this._handleChangeQuantity()
        this._updateGoods(this._id, this._selected)        
    }

    _plus() {
        this._numeric.value = ++this._selected
        this._handleChangeQuantity()
        this._updateGoods(this._id, this._selected)    
    }

    _check(id) {
        this._checkGood(id)
    }

    

    _setEventListeners() {
        this._postponeIcon = this._item.querySelector('.list-item__btn-postpone');
        this._deleteIcon = this._item.querySelector('.list-item__btn-del');
        this._minusBtn = this._item.querySelector('.list-item__minus');
        this._plusBtn = this._item.querySelector('.list-item__plus')
        this._numeric = this._item.querySelector('.list-item__numeric')
        this._checkbox = this._item.querySelector('input')
        
        
        this._postponeIcon.addEventListener('click', (event) => {
            event.preventDefault()
            if (this._isLiked) {
                this._dislike();
            } else {
                this._like();
            }
            this._isLiked = !this._isLiked;
        });

        this._deleteIcon.addEventListener('click', (event) => {
            event.preventDefault()
            this._deleteItem()
        });

        this._minusBtn.addEventListener('click', (event) => {
            event.preventDefault()
            this._minus()
        });

        this._plusBtn.addEventListener('click', (event) => {
            event.preventDefault()
            this._plus()
        })

        this._numeric.addEventListener('input', () => {
            this._numeric.value = this._numeric.value.replace(/\D/g, '');
            if (!this._numeric.value) {
                return
            }
            if (this._numeric.value > this._balance) {
                this._numeric.value = this._balance
            }
            this._selected = this._numeric.value;
            this._handleChangeQuantity()
            this._updateGoods(this._id, this._selected) 
        })

        this._checkbox.addEventListener('input', (event) => {
            this._check(this._id)
        })
      }

    generateItem() {
        this._item = this._getTemplate();
        this._priceElement = this._item.querySelector('.list-item__price');
        this._newPriceElement = this._item.querySelector('.list-item__price-new');
        this._oldPriceElement = this._item.querySelector('.list-item__price-old');
        this._balanceElement = this._item.querySelector('.list-item__balance');
        this._colorElement = this._item.querySelector('.list-item__good-color');
        this._sizeElement = this._item.querySelector('.list-item__good-size');
        this._minusBtn = this._item.querySelector('.list-item__minus');
        this._plusBtn = this._item.querySelector('.list-item__plus');
        this._storeElement = this._item.querySelector('.list-item__good-store')
        this._placeElement = this._item.querySelector('.list-item__good-place');
        this._companyElement = this._item.querySelector('.list-item__good-company');
        this._countElement = this._item.querySelector('.list-item__count');
        this._checkboxWrapElement = this._item.querySelector('.list-item__checkbox-wrap');
        this._imgElement = this._item.querySelector('.list-item__good-img');
        this._infoElement = this._item.querySelector('.list-item__good-info');
        this._titleElement = this._item.querySelector('.list-item__good-title');
        this._photoSizeElement = this._item.querySelector('.list-item__good-photo-size');
        this._companyTooltipElement = this._item.querySelector('.list-item__tooltip--company');
        this._priceTooltipElement = this._item.querySelector('.list-item__tooltip--price');
        
        this._newSpan = document.createElement('span');
        this._oldSpan = document.createElement('span');


        this._item.querySelector('.list-item__good-title').href = this._goodUrl;
        this._imgElement.href = this._goodUrl;
        this._item.querySelector('img').src = this._imgUrl;
        this._item.querySelector('img').alt = this._name;

        this._newSpan.classList.add('list-item__price-new-som');
        this._newSpan.textContent = ' сом';
        this._oldSpan.classList.add('list-item__price-old-som');
        this._oldSpan.textContent = ' сом';

        if (this._brand) {
            this._titleElement.textContent = `${this._name}, ${this._brand}`;
        } else {
            this._titleElement.textContent = this._name;
        }

        if (this._color) {
            this._colorElement.textContent = `Цвет: ${this._color}`;
            this._colorElement.classList.remove('list-item__good-color--hidden');
        }

        if (this._size) {
            this._sizeElement.textContent = `Размер: ${this._size}`;
            this._photoSizeElement.textContent = this._size;
            this._sizeElement.classList.remove('list-item__good-size--hidden');
            this._photoSizeElement.classList.remove('list-item__good-size-photo--hidden');
        }

        if (this._color || this._size) {
            this._item.querySelector('.list-item__good-properties').classList.remove('list-item__good-properties--hidden');
        }

        if (this._balance !== 0) {
            this._storeElement.classList.remove('list-item__good-store--hidden');
            this._countElement.classList.remove('list-item__count--hidden');
            this._checkboxWrapElement.classList.remove('list-item__checkbox-wrap--hidden');
            this._imgElement.classList.remove('list-item__good-img--grey');
            this._infoElement.classList.remove('list-item__good-info--grey');
            this._sizeElement.classList.remove('list-item__good-size--grey');
            this._colorElement.classList.remove('list-item__good-color--grey');
            this._priceElement.classList.remove('list-item__price--hidden');
            this._titleElement.classList.remove('list-item__good-title--grey');

            if (this._isChecked) {
                this._checkboxWrapElement.querySelector('input').checked = true
            }

            if (this._balance - this._selected <= 2) {
                this._balanceElement.classList.remove('list-item__balance--hidden');
                this._balanceElement.textContent = `Осталось ${this._balance - this._selected} шт.`;
            }

            if (this._newPrice * this._selected >= 1000000) {
                this._newPriceElement.classList.add('list-item__price-new--small')
            }

            this._placeElement.textContent = this._place;
            this._companyElement.textContent = this._company.name;
            this._companyElement.textContent = this._company.name;
            this._companyTooltipElement.querySelector('.list-item__tooltip-header').textContent = this._company.name.toUpperCase();
            this._companyTooltipElement.querySelector('.list-item__tooltip-info').textContent = this._company.ogrn;
            this._companyTooltipElement.querySelector('.list-item__tooltip-adress').textContent = this._company.adress;

            if (Math.round(100 -this._newPrice / this._oldPrice*100) - 10 <= 0) {
                this._priceTooltipElement.querySelectorAll('.list-item__tooltip-line')[1].remove()
                this._priceTooltipElement.querySelectorAll('.list-item__tooltip-dicount')[0].textContent = `Скидка ${Math.round(100 -this._newPrice / this._oldPrice*100)}%`
                this._priceTooltipElement.querySelectorAll('.list-item__tooltip-total')[0].textContent = `${this._separateNumber(this._newPrice - this._oldPrice)} сом`
            } else {
                this._priceTooltipElement.querySelectorAll('.list-item__tooltip-dicount')[0].textContent = `Скидка ${Math.round(100 -this._newPrice / this._oldPrice*100) - 10}%`
                this._priceTooltipElement.querySelectorAll('.list-item__tooltip-total')[0].textContent = `${this._separateNumber(this._newPrice - this._oldPrice - (this._newPrice - this._oldPrice)*0.1)} сом`
                this._priceTooltipElement.querySelectorAll('.list-item__tooltip-total')[1].textContent = `${this._separateNumber((this._newPrice - this._oldPrice)*10/100)} сом`
            }

        }

        this._newPriceElement.textContent = `${this._separateNumber(this._newPrice * this._selected)}`;
        this._oldPriceElement.textContent = `${this._separateNumber(this._oldPrice * this._selected)}`;
        this._newPriceElement.appendChild(this._newSpan);
        this._oldPriceElement.appendChild(this._oldSpan);

        this._item.querySelector('.list-item__numeric').value = this._selected;
        if (this._selected < 2) {
            this._minusBtn.disabled = true;
        };


        this._setEventListeners();
        return this._item;
      }
}