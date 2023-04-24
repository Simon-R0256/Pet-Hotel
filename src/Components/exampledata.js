import avatar01 from "./pic/avatar01.svg";
import animal01 from "./pic/animal01.jpg";
import avatar02 from "./pic/avatar02.svg";
import animal02 from "./pic/animal02.jpg";
import avatar03 from "./pic/avatar03.svg";
import animal03 from "./pic/animal03.jpg";
import avatar04 from "./pic/avatar04.svg";
import animal04 from "./pic/animal04.jpg";


const data = [
    {
        id: "1",
        username: "animaldude17",
        interaction: "none",
        picture: avatar01,
        content: animal01,
        info: "My dog is soo cute :) !", 
        comments: [
            {name: "tess13", text: "He really is a good boy"},
            {name: "cakefriend", text: "Can you tell me what Breed he is? I always wanted one of these"},
            {name: "mark134", text: "Great Picture"}
        ]
    },
    {
        id: "2",
        username: "kittyGirl",
        interaction: "none",
        picture: avatar02,
        content: animal02,
        info: "Minka loves playing in the garden, especially when the weather is nice",
        comments: [
            {name: "mina23", text: "How old is she?"},
        ]
    },
    {
        id: "3",
        username: "budgieEnjoyer",
        interaction: "none",
        picture: avatar03,
        content: animal03,
        info: "Cookie is not feeling well today, but im sure his favourite snack will cheer him up",
        comments: [
            {name: "Jana1997", text: "I really like the yellow touch"},
            {name: "flyingExpert3", text: "you should not let him out in public"},
        ]
    },
    {
        id: "4",
        username: "bunnyfriend",
        interaction: "none",
        picture: avatar04,
        content: animal04,
        info: "I moved his enclosure outside",
        comments: [
            {name: "evening03", text: "The dog in the background looks hungry"},
            {name: "msteatime", text: "His ears are lovely"},
        ]
    },

]

export default data;

  