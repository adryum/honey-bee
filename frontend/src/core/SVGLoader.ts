export interface SVGBody {
    path: string
    viewBox: string
}

export interface SVGIcon extends SVGBody{
    color: string
}

export const getSVG = (svg: SVGIconRes, color: string = '#FFFFFF'): SVGIcon => {
    return {
        path: svgs[svg].path,
        viewBox: svgs[svg].viewBox,
        color: color
    }
}

export enum SVGIconRes {
    House,
    Pluss,
    MoreDots
}
const svgs: Record<SVGIconRes, SVGBody> = {
    [SVGIconRes.House]: {
        path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
        viewBox: '0 0 512 512'
    },
    [SVGIconRes.Pluss]: {
        path: "M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z",
        viewBox: "0 0 540 540",
    },
    [SVGIconRes.MoreDots]: {
        path: "M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z",
        viewBox: "0 0 640 640"
    }
}

