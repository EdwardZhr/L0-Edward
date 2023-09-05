export default class DeliveryContainer {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._lines = []
    }
    
    _transformMonth(number) {
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря"
          ];
        return months[number-1]
    }

    _createLines() {
        this._container.innerHTML = null;
        this._lines.sort((a, b) => {
            if (a.date[0].split('.')[1] !== b.date[0].split('.')[1]) {
                return parseInt(a.date[0].split('.')[1]) - parseInt(b.date[0].split('.')[1])
            }
            return parseInt(a.date[0].split('.')[0]) - parseInt(b.date[0].split('.')[0])
        })

        this._lines.forEach(line => {
            let lineElement = document.createElement('div');
            lineElement.classList.add('delivery-container__line');

            let titleElement = document.createElement('h3');
            titleElement.classList.add('delivery-container__title');

            let contentElement = document.createElement('div');
            contentElement.classList.add('delivery-container__content');

            titleElement.textContent = `${parseInt(line.date[0].split('.')[0])}—${parseInt(line.date[1].split('.')[0])} ${this._transformMonth(parseInt(line.date[0].split('.')[1]))}`

            line.positions.forEach(position => {
                let linkElement = document.createElement('a');
                linkElement.classList.add('delivery-container__img');
                linkElement.href = position.goodUrl;

                let imgElement = document.createElement('img');
                imgElement.src = position.imgUrl;
                imgElement.alt = position.name;
                imgElement.height = 56;
                imgElement.width = 40;

                let spanElement = document.createElement('a');
                spanElement.classList.add('delivery-container__notify');
                spanElement.textContent = position.quantity

                linkElement.appendChild(imgElement);
                linkElement.appendChild(spanElement);
                contentElement.appendChild(linkElement);
            })

            this._container.appendChild(lineElement);
            lineElement.appendChild(titleElement);
            lineElement.appendChild(contentElement);
        })
    }


    updateDeliveryContainer(data) {
        this._lines = []
        data.forEach(element => {
            if (element.isChecked && element.selected > 0) {
                let totalQuantity = 0
                for (let i = 0; totalQuantity < element.selected; i++) {
                    totalQuantity += element.delivery[i].quantity
                    
                    if (this._lines.length === 0) {
                        if (element.selected <= element.delivery[i].quantity) {
                            this._lines.push({ date: element.delivery[i].date, positions: [{name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity: element.selected}]})
                        } 
                        else {
                            let acc = 0
                            for (let k = 0; k < i; k++) {
                                acc += element.delivery[k].quantity
                            }
                            if (element.selected - acc <= element.delivery[i].quantity) {
                                this._lines.push({ date: element.delivery[i].date, positions: [{name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity: element.selected - acc}]})
                            } else {
                                this._lines.push({ date: element.delivery[i].date, positions: [{name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity:element.delivery[i].quantity}]})
                            }
                        }
                    } else {
                        for (let line of this._lines) {
                            if (line.date.includes(element.delivery[i].date[0])) {
                                if (element.selected <= element.delivery[i].quantity) {
                                    line.positions = [...line.positions, {name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity: element.selected}]
                                    break
                                } 
                                else {
                                    let acc = 0
                                    for (let k = 0; k < i; k++) {
                                        acc += element.delivery[k].quantity
                                    }
                                    if (element.selected - acc <= element.delivery[i].quantity) {
                                        line.positions = [...line.positions, {name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity: element.selected - acc}]
                                    } else {
                                        line.positions = [...line.positions, {name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity: element.delivery[i].quantity}]
                                    }
                                    break
                                }

                            } 
                            else {
                                let acc = 0
                                for (let k = 0; k < i; k++) {
                                    acc += element.delivery[k].quantity
                                }
                                if (element.selected - acc <= element.delivery[i].quantity) {
                                    this._lines.push({ date: element.delivery[i].date, positions: [{name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity: element.selected - acc}]})
                                    break
                                } else {
                                    this._lines.push({ date: element.delivery[i].date, positions: [{name: element.name, imgUrl: element.imgUrl, goodUrl: element.goodUrl, quantity:element.delivery[i].quantity}]})
                                    break
                                }
                            }
                        }
                    }
                }
            }
        });
        this._createLines()
    }
}
