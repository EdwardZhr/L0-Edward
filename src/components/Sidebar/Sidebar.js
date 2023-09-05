export default class Sidebar {
    constructor(sidebarSelector, seperateNubmer, pluralizeGoods) {
        this._sidebar = document.querySelector(sidebarSelector);
        this._separateNumber = seperateNubmer;
        this._pluralizeGoods = pluralizeGoods;
        this._totalNewPriceElement = this._sidebar.querySelector('.sidebar__total');
        this._totalOldPriceElement = this._sidebar.querySelector('.sidebar__sum');
        this._totalDiscountElement = this._sidebar.querySelector('.sidebar__discount');
        this._totalSelectedElement = this._sidebar.querySelector('.sidebar__quantity');
    }
      
    updateSidebarInfo({totalNewPrice, totalOldPrice, totalSelected}) {
        this._newSpan = document.createElement('span');
        this._newSpan.classList.add('sidebar__total-som');
        this._newSpan.textContent = ' сом';
        this._totalNewPriceElement.textContent = `${this._separateNumber(totalNewPrice)}`
        this._totalNewPriceElement.appendChild(this._newSpan);

        this._totalOldPriceElement.textContent = `${this._separateNumber(totalOldPrice)} сом`
        this._totalDiscountElement.textContent = `${this._separateNumber(totalNewPrice - totalOldPrice)} сом`
        this._totalSelectedElement.textContent = `${totalSelected} ${this._pluralizeGoods(totalSelected)}`
    }
}
