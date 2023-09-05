import tShirt from '../images/t-shirt.png'
import phoneCase from '../images/phone-case.png'
import pensils from '../images/pensils.png'

const goods = [
    {
        goodUrl: "#",
        imgUrl: tShirt,
        name: "Футболка UZcotton мужская",
        brand: "",
        color: "белый",
        size: "56",      
        place: "Коледино WB",
        company: {
            name: "OOO Вайлдберриз",
            adress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
            ogrn: 5167746237148
        },
        balance: 3,
        newPrice: 522,
        oldPrice: 1051,
        selected: 1,
        isLiked: false,
        isChecked: true,
        delivery: [
            {
                date: ['05.02.2024', '06.02.2024'],
                quantity: 1
            },
            {
                date: ['21.02.2024', '22.02.2024'],
                quantity: 2
            }
        ],
        _id: 0,
    },
    {
        goodUrl: "#",
        imgUrl: phoneCase,
        name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR",
        brand: "MobiSafe",
        color: "прозрачный",
        size: "",      
        place: "Коледино WB",
        company: {
            name: "OOO Мегапрофстиль",
            adress: "129355, Москва, улица Боженко, 3, корпус 4, офис 34",
            ogrn: 9218746237237
        },
        balance: 203,
        newPrice: 10500,
        oldPrice: 11500,
        selected: 200,
        isLiked: false,
        isChecked: true,
        delivery: [
            {
                date: ['05.02.2024', '06.02.2024'],
                quantity: 184
            },
            {
                date: ['07.02.2024', '08.02.2024'],
                quantity: 16
            },
            {
                date: ['15.08.2024', '16.08.2024'],
                quantity: 3
            }
        ],
        _id: 1,
    },
    {
        goodUrl: "#",
        imgUrl: pensils,
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные',
        brand: "Faber-Castell",
        color: "",
        size: "",      
        place: "Коледино WB",
        company: {
            name: "OOO Вайлдберриз",
            adress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
            ogrn: 5167746237148
        },
        balance: 4,
        newPrice: 247,
        oldPrice: 475,
        selected: 2,
        isLiked: false,
        isChecked: true,
        delivery: [
            {
                date: ['05.02.2024', '06.02.2024'],
                quantity: 4
            },
        ],
        _id: 2,
    },
    {
        goodUrl: "#",
        imgUrl: tShirt,
        name: "Футболка UZcotton мужская",
        brand: "",
        color: "белый",
        size: "56",      
        place: "Коледино WB",
        company: {
            name: "OOO Вайлдберриз",
            adress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
            ogrn: 5167746237148
        },
        balance: 0,
        newPrice: 522,
        oldPrice: 1051,
        selected: 0,
        isLiked: false,
        isChecked: false,
        delivery: null,
        _id: 3,
    },
    {
        goodUrl: "#",
        imgUrl: phoneCase,
        name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR",
        brand: "MobiSafe",
        color: "прозрачный",
        size: "",      
        place: "Коледино WB",
        company: "OOO Мегапрофстиль",
        balance: 0,
        newPrice: 10500,
        oldPrice: 11500,
        selected: 0,
        isLiked: false,
        isChecked: false,
        delivery: null,
        _id: 4,
    },
    {
        goodUrl: "#",
        imgUrl: pensils,
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные',
        brand: "Faber-Castell",
        color: "",
        size: "",      
        place: "Коледино WB",
        company: {
            name: "OOO Вайлдберриз",
            adress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
            ogrn: 5167746237148
        },
        balance: 0,
        newPrice: 247,
        oldPrice: 475,
        selected: 0,
        isLiked: false,
        isChecked: false,
        delivery: null,
        _id: 5,
    },
];

  export {goods};