import img1 from "@/assets/images/game2/1.svg"
import img2 from "@/assets/images/game2/2.svg"
import img3 from "@/assets/images/game2/3.svg"
import img4 from "@/assets/images/game2/4.svg"
import img5 from "@/assets/images/game2/5.svg"
import img6 from "@/assets/images/game2/6.svg"
import img7 from "@/assets/images/game2/7.svg"
import img8 from "@/assets/images/game2/8.svg"
import img9 from "@/assets/images/game2/9.svg"
import img10 from "@/assets/images/game2/10.svg"
import img11 from "@/assets/images/game2/11.svg"



export interface IGame {
    id: number,
    rotate: number,
    win: number[],
    position: number,
    img: string
}

export const game2Elements:IGame[] = [
    {
        id: 1,
        rotate: 90,
        win: [180,360],
        position:90,
        img:img1
    },
        {
        id: 2,
        rotate: 90,
        win: [360],
        position:90,
        img:img2
    },
            {
        id: 3,
        rotate: 0,
        position: 0,
        win: [0,360],
        img:img3
    },
    {
        id: 5,
        rotate: 0,
        position: 0,
        win: [0,360],
        img:img5
    },
    {
        id: 6,
        rotate: 180,
        position: 180,
        win: [ 360],
        img:img6
    },
      {
        id: 4,
        rotate:90,
        position: 90,
        win: [360],
        img:img4
    },
    {
        id: 7,
        rotate: 0,
        position: 0,
        win: [0, 360],
        img:img7
    },
        {
        id: 8,
        rotate: 270,
        position: 270,
        win: [360],
        img:img8
    },
        {
        id: 9,
        rotate: 0,
        position: 0,
        win: [0,360],
        img:img9
    },
        {
        id: 10,
        rotate: 90,
        position: 90,
        win: [360],
        img:img10
    },
                {
        id: 11,
        rotate: 90,
        position: 90,
        win: [180,360],
        img:img11
    },

]