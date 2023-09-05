import './index.css';
import {goods} from './utils/goods';
import Section from './components/Section/Section';
import ListItem from './components/ListItem/ListItem';
import Sidebar from './components/Sidebar/Sidebar';
import DeliveryContainer from './components/DeliveryContainer/DeliveryContainer';

const goodsContainer = '.list__section';
const missingGoodsContainer = '.list__section--missing'
const chooseAll = document.querySelector('.list__header input')
const listHeaders = document.querySelectorAll('.list__header')

const totalData = {
    totalNewPrice: 0,
    totalOldPrice: 0,
    totalSelected: 0,
    updateTotalData: function() {
        this.totalNewPrice = goods.reduce((acc, item) => {
            if (item.balance > 0 && item.isChecked) {
                return acc + item.newPrice * item.selected
            }
            return acc
        }, 0),
        this.totalOldPrice = goods.reduce((acc, item) => {
            if (item.balance > 0 && item.isChecked) {
                return acc + item.oldPrice * item.selected
            }
            return acc
        }, 0),
        this.totalSelected = goods.reduce((acc, item) => {
            if (item.balance > 0 && item.isChecked) {
                return acc + item.selected
            }
            return acc
        }, 0)
    }
}

const separateNumber = function(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const handleUpdateGoods = function(goodId, selected) {
    goods.forEach((item, index) => {
        if (item._id === goodId) {
            goods[index].selected = selected
        }
    })
    totalData.updateTotalData()
    sidebar.updateSidebarInfo(totalData)
    deliveryContainer.updateDeliveryContainer(goods)
}

const handleDeleteGood = function(goodId) {
    goods.forEach((item, index) => {
        if (item._id === goodId) {
            goods.splice(index, 1)
        }
    })
    totalData.updateTotalData()
    sidebar.updateSidebarInfo(totalData)
    deliveryContainer.updateDeliveryContainer(goods)
}

const checkAllGoodsCheckbox = function() {
    let observer = true;
    goods.forEach(item => {
        if (item.balance > 0) {
            if (item.isChecked !== true) {
                observer = false
            }
        } 
    })
    chooseAll.checked = observer
}

checkAllGoodsCheckbox()

const handleCheckGood = function(goodId) {
    goods.forEach((item, index) => {
        if (item._id === goodId) {
            goods[index].isChecked = !goods[index].isChecked
        }
    })
    totalData.updateTotalData()
    sidebar.updateSidebarInfo(totalData)
    deliveryContainer.updateDeliveryContainer(goods)
    checkAllGoodsCheckbox()
}

const handleCheckAllGoods = function() {
    goods.forEach((item, index) => {
        goods[index].isChecked = !goods[index].isChecked
    })
    document.querySelectorAll('.list-item .checkbox__input').forEach(item => {
        item.checked = !item.checked
    })
    totalData.updateTotalData()
    sidebar.updateSidebarInfo(totalData)
    deliveryContainer.updateDeliveryContainer(goods)
}

chooseAll.addEventListener('input', () => {
    handleCheckAllGoods()
})

const pluralizeGoods = function(count) {
    if (count === 0) {
      return 'товаров';
    } else if (count === 1) {
      return 'товар';
    } else if (count >= 2 && count <= 4) {
      return 'товара';
    } else {
      return 'товаров';
    }
}

listHeaders.forEach(item => {
    item.querySelectorAll('.list__icon').forEach(icon=> {
        icon.addEventListener('click', () => {
            const header = icon.parentElement
            const list = header.parentElement

            if (header.nextElementSibling.classList.contains('list__section--hidden')) {
                header.nextElementSibling.classList.remove('list__section--hidden')
                icon.classList.remove('list__icon--rotated')

                if (icon.parentElement.querySelector('.checkbox')) {
                    icon.parentElement.querySelector('.checkbox').classList.remove('checkbox--hidden')
                    icon.parentElement.querySelector('.list__title').remove()
                    list.classList.remove('basket-form__list--rolled')
                } else {
                    header.classList.remove('list__header--rolled')
                }

            } else {
                header.nextElementSibling.classList.add('list__section--hidden')
                icon.classList.add('list__icon--rotated')

                if (header.querySelector('.checkbox')) {
                    header.querySelector('.checkbox').classList.add('checkbox--hidden')
                    const span = document.createElement("span");
                    span.classList.add('list__title')
                    span.textContent = `${totalData.totalSelected} ${pluralizeGoods(totalData.totalSelected)} · ${separateNumber(totalData.totalNewPrice)} сом`
                    header.insertBefore(span, icon);
                    list.classList.add('basket-form__list--rolled')
                } else {
                    header.classList.add('list__header--rolled')
                }

            }
        })
    })
})

const sidebar = new Sidebar('.sidebar', separateNumber, pluralizeGoods)
const deliveryContainer = new DeliveryContainer ('.delivery-container')

totalData.updateTotalData()
sidebar.updateSidebarInfo(totalData)
deliveryContainer.updateDeliveryContainer(goods)

const createListItem = function(data) {
    const item = new ListItem(data, '.list-item-template', separateNumber, handleUpdateGoods, handleDeleteGood, handleCheckGood);
    const listItem = item.generateItem();

    return listItem;
  };

const goodsList = new Section({
    renderer: (data) => {
        if (data.balance === 0) {
            return
        }
        const listItem = createListItem({
            goodUrl: data.goodUrl,
            imgUrl: data.imgUrl,
            name: data.name,
            brand: data.brand,
            color: data.color,
            size: data.size,
            place: data.place,
            company: data.company,
            balance: data.balance,
            newPrice: data.newPrice,
            oldPrice: data.oldPrice,
            selected: data.selected,
            isLiked: data.isLiked,
            isChecked: data.isChecked,
            id: data._id,
        });
        goodsList.addItem(listItem);
    },
}, goodsContainer);

goodsList.renderItems(goods);

const missingGoodsList = new Section({
    renderer: (data) => {
        if (data.balance !== 0) {
            return
        }
        const listItem = createListItem({
            goodUrl: data.goodUrl,
            imgUrl: data.imgUrl,
            name: data.name,
            brand: data.brand,
            color: data.color,
            size: data.size,
            place: data.place,
            company: data.company,
            balance: data.balance,
            newPrice: data.newPrice,
            oldPrice: data.oldPrice,
            selected: data.selected,
            isLiked: data.isLiked,
            id: data._id,
        }); 
        missingGoodsList.addItem(listItem);
    },
}, missingGoodsContainer);

missingGoodsList .renderItems(goods);