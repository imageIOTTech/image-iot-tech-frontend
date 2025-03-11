import { compose } from "@reduxjs/toolkit";
import { Component } from "react";

const DataFont: string[] = ['Audiowide-Regular',
    'DMSeriText-Italic',
    'DMSeriText-Regular',
    'PlayfairDisplay-Black',
    'PlayfairDisplay-BlackItalic',
    'PlayfairDisplay-Bold',
    'PlayfairDisplay-BoldItalic',
    'PlayfairDisplay-ExtraBold',
    'PlayfairDisplay-ExtraBoldItalic',
    'PlayfairDisplay-Italic',
    'PlayfairDisplay-Medium',
    'PlayfairDisplay-MediumItalic',
    'PlayfairDisplay-Regular',
    'PlayfairDisplay-SemiBold',
    'PlayfairDisplay-SemiBoldItalic',
    'PlaywriteAUSA-ExtraLight',
    'PlaywriteAUSA-Light',
    'PlaywriteAUSA-Regular',
    'PlaywriteAUSA-Thin',
    'PlaywriteIN-ExtraLight',
    'PlaywriteIN-Light',
    'PlaywriteIN-Regular',
    'PlaywriteIN-Thin',
    'PlaywriteVN-ExtraLight',
    'PlaywriteVN-Light',
    'PlaywriteVN-Regular',
    'PlaywriteVN-Thin',
]

const DataColor: string[] = [
    "#FF0000",
    "#FF4500",
    "#FF6347",
    "#FF7F50",
    "#FFA07A",
    "#FFD700",
    "#FFFF00",
    "#FFFFE0",
    "#00FF00",
    "#32CD32",
    "#98FB98",
    "#00FFFF",
    "#4682B4",
    "#1E90FF",
    "#87CEFA",
    "#0000FF",
    "#8A2BE2",
    "#9400D3",
    "#BA55D3",
    "#DDA0DD",
    "#FF1493",
    "#FF69B4",
    "#FFB6C1",
    "#800000",
    "#A52A2A",
    "#D2691E",
    "#F4A460",
    "#FFF5EE",
    "#708090",
    "#D3D3D3"
];

const DataImage = [
    {
        id: 1,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',
    },
    {
        id: 2,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',

    },
    {
        id: 3,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',

    },
    {
        id: 4,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',

    },
    {
        id: 5,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',

    },
    {
        id: 6,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',

    },
    {
        id: 7,
        uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',

    },
]

const DataFolder = [
    {
        id: 1,
        name: 'Word spaces',
        userId: 1234,
        parent: 0,
    },
    {
        id: 2,
        name: 'Word spaces',
        userId: 1234,
        parent: 0,
    },
    {
        id: 3,
        name: 'Word spaces',
        userId: 1234,
        parent: 0,
    },
    {
        id: 4,
        name: 'Word spaces',
        userId: 1234,
        parent: 1,
    },
]

const DataComponent = [
    {
        component: {
            value: "Text1111",
            positionX: 100,
            positionY: 100,
        },
        id: "1741180176793",
        style: {
            color: "#033333",
            fontFamily: "Aria",
            fontSize: 16,
            opacity: 1
        },
        type: "Text"
    },
    {
        id: "1741180182759",
        style: {
            color: "#000000",
            fontFamily: "Audiowide-Regular",
            fontSize: 30,
            opacity: 1
        },
        type: "Text",
        component: {
            value: "Text2222",
            positionX: 200,
            positionY: 200,
        }
    },
    {
        id: "1741180183000",
        style: {
            width: 100,
            height: 100,
        },
        type: "Image",
        component: {
            uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-villain-answer-questions-png-image_1995092.jpg',
            positionX: 100,
            positionY: 100,
        }
    },
    {
        id: "17411801867000",
        style: {

        },
        type: "Stroke",
        component: {
            path: "M308.1298828125,216.0227813720703L308.1298828125,213.8255157470703L308.1298828125,212.3167266845703L306.650390625,211.5989532470703L304.2371826171875,208.6106719970703L298.7030334472656,204.65428161621094L291.1124572753906,201.59971618652344L286.3659362792969,199.7337188720703L285.908203125,197.5364532470703L282.1604309082031,198.2688751220703L280.3605651855469,198.2688751220703L250.3564453125,199.72691345214844L244.4384765625,204.1721954345703L236.28662109375,210.0901641845703L231.08642578125,213.7962188720703L225.17578125,218.9964141845703L221.455078125,221.2229766845703L220.11444091796875,222.5842742919922L218.55303955078125,224.1182098388672L215.24708557128906,227.4412384033203L213.3251953125,230.4435272216797L210.3515625,236.60960388183594L207.51597595214844,238.1968231201172L207.392578125,240.4563751220703L205.6560516357422,242.7122344970703L204.43359375,244.34715270996094L204.43359375,245.8509979248047L202.9541015625,249.05552673339844L202.9541015625,250.4776153564453L202.9541015625,252.0359649658203L202.9541015625,256.5728302001953L202.9541015625,259.7483673095703L202.9541015625,261.9602813720703L202.9541015625,265.6663360595703L202.9541015625,268.6106719970703L202.9541015625,276.7698516845703L202.9541015625,279.3573455810547L204.43359375,282.0561981201172L205.34803771972656,285.09080505371094L206.9691925048828,285.6614532470703L208.607421875,288.35838317871094L208.8720703125,290.8616485595703L212.98826599121094,292.9042510986328L216.1468048095703,294.5384063720703L222.33660888671875,296.0988006591797L226.66259765625,298.2298126220703L227.09844970703125,297.4973907470703L228.87451171875,297.4973907470703L231.09375,297.4973907470703L232.8885955810547,297.4973907470703L236.30149841308594,297.4973907470703L247.76959228515625,297.4973907470703L257.75390625,298.9915313720703L259.98779296875,298.9915313720703L268.86474609375,298.9915313720703L277.75634765625,298.9915313720703L281.47705078125,298.9915313720703L283.68896484375,298.9915313720703L284.4287109375,298.9915313720703L292.2843017578125,298.9915313720703L297.3744201660156,298.9915313720703L300.4133605957031,298.9915313720703L301.45751953125,298.9915313720703L302.2119140625,298.9915313720703L303.8181457519531,298.9915313720703L307.2768249511719,295.4123077392578L308.86962890625,292.3411407470703L310.34912109375,293.0735626220703L312.5830078125,285.6761016845703L315.5419921875,283.4202423095703L318.5009765625,280.4612579345703L320.72021484375,276.7698516845703L321.4599609375,273.0491485595703L324.43359375,268.2321319580078L327.392578125,256.7248077392578L327.392578125,246.6722869873047L327.392578125,239.65000915527344L327.392578125,233.10215759277344L326.1693420410156,226.90635681152344L325.9130859375,222.2781524658203L323.06158447265625,219.2260284423828L322.1923828125,217.4876251220703L322.939453125,217.2283477783203L321.2700500488281,214.3699188232422L319.24530029296875,212.33592224121094L317.4703369140625,209.06394958496094L315.1112060546875,208.6106719970703L313.7325134277344,206.8191375732422L310.341796875,207.1458282470703L309.0321350097656,207.1458282470703L307.39013671875,207.1458282470703",
        }
    },

]


export { DataFont, DataColor, DataImage, DataFolder, DataComponent }