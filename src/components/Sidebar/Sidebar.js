export default class Sidebar {
    constructor(sidebarSelector, seperateNubmer, pluralizeGoods) {
        this._sidebar = document.querySelector(sidebarSelector);
        this._separateNumber = seperateNubmer;
        this._pluralizeGoods = pluralizeGoods;
        this._totalNewPriceElement = this._sidebar.querySelector('.sidebar__total');
        this._totalOldPriceElement = this._sidebar.querySelector('.sidebar__sum');
        this._totalDiscountElement = this._sidebar.querySelector('.sidebar__discount');
        this._totalSelectedElement = this._sidebar.querySelector('.sidebar__quantity');
        this._checkbox = this._sidebar.querySelector('.checkbox__input');
        this._btn = this._sidebar.querySelector('.sidebar__btn')
        this._additionalSpan = this._sidebar.querySelector('.sidebar__card-additional-span')
        this._totalNewPrice
    }
    
    _toogleSidebar() {
        if (this._checkbox.checked) {
            this._btn.textContent = `Оплатить ${this._separateNumber(this._totalNewPrice)} сом`
            this._additionalSpan.classList.add('sidebar__card-additional-span--hidden')
        } else {
            this._btn.textContent = `Заказать`
            this._additionalSpan.classList.remove('sidebar__card-additional-span--hidden')
        }
    }

    setEventListeners() {
        this._checkbox.addEventListener('click', () => {
            this._toogleSidebar()
        })
    }

    updateSidebarInfo({totalNewPrice, totalOldPrice, totalSelected}) {
        this._totalNewPrice = totalNewPrice
        this._newSpan = document.createElement('span');
        this._newSpan.classList.add('sidebar__total-som');
        this._newSpan.textContent = ' сом';
        this._totalNewPriceElement.textContent = `${this._separateNumber(totalNewPrice)}`
        this._totalNewPriceElement.appendChild(this._newSpan);

        this._totalOldPriceElement.textContent = `${this._separateNumber(totalOldPrice)} сом`
        this._totalDiscountElement.textContent = `${this._separateNumber(totalNewPrice - totalOldPrice)} сом`
        this._totalSelectedElement.textContent = `${totalSelected} ${this._pluralizeGoods(totalSelected)}`
        this._toogleSidebar()
    }
}
